import nasaFeed from "../assets/nasa/NasaFeed.json";

export const handleIframeInteraction = () => {
  document.querySelectorAll(".swiperSlide iframe").forEach((iframe) => {
    iframe.addEventListener("mouseenter", () => {
      iframe.style.pointerEvents = "auto";
    });
    iframe.addEventListener("mouseleave", () => {
      iframe.style.pointerEvents = "none";
    });
  });
};

export const allowedOrigins = [
  "https://model.earth",
  "https://raydendarkus.github.io",
  "http://localhost:8887",
  "http://localhost:5173",
];

// APOD moved to science.nasa.gov. api.nasa.gov/planetary/apod now returns NASA logo placeholders.
const APOD_API = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";
// APOD starts in 1995, but about half the days before 2000 have no image in the new archive,
// and images before 2007 are mostly under 1000px wide.
const APOD_FIRST_DAY = Date.UTC(2007, 0, 1);
const APOD_FIELDS = "date,title,media_type,hdurl,explanation,copyright,permalink";
// Used as hdurl when an entry has no image (videos and a few image days)
const APOD_NO_IMAGE = "news-thumbnail";

const htmlToText = (html) =>
  new DOMParser().parseFromString(html || "", "text/html").body.textContent.trim();

const randomApodDates = (count) => {
  const days = Math.floor((Date.now() - APOD_FIRST_DAY) / 86400000);
  const dates = new Set();
  while (dates.size < Math.min(count, days)) {
    const date = new Date(APOD_FIRST_DAY + Math.floor(Math.random() * days) * 86400000);
    dates.add(date.toISOString().slice(2, 10).replace(/-/g, "")); // YYMMDD
  }
  return [...dates];
};

const fetchApodDay = async (yymmdd) => {
  const response = await fetch(`${APOD_API}/${yymmdd}?_fields=${APOD_FIELDS}`);
  if (response.status === 404) return null; // Skip any day without an APOD
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const apod = await response.json();
  // Same fields as the old api.nasa.gov feed: url is the image (or video embed), not the article.
  const image = {
    date: apod.date,
    title: htmlToText(apod.title),
    media_type: apod.media_type,
    explanation: htmlToText(apod.explanation)
      .replace(/^Explanation:\s*/, "")
      .replace(/\s*Tomorrow's picture:.*$/s, "")
      .replace(/\s+([,.;:)!?])/g, "$1")
      .replace(/\(\s+/g, "("),
    copyright: htmlToText(apod.copyright)
      .replace(/^(Image|Video|Illustration)?\s*Credits?[^:]{0,30}:\s*/i, "")
      .replace(/\s+([,.;:)])/g, "$1")
      .replace(/\(\s+/g, "("),
    url: apod.hdurl,
    hdurl: apod.hdurl?.split("?")[0],
    permalink: apod.permalink,
  };
  if (apod.media_type === "video") {
    // The video embed is only in the page html
    const html = await fetch(`${APOD_API}/${yymmdd}?_fields=basic_html`).then((r) => r.json());
    const src = html.basic_html?.match(/<iframe[^>]*src="([^"]+)"/i)?.[1];
    if (!src) return null;
    image.url = src.startsWith("//") ? "https:" + src : src;
  } else if (!apod.hdurl || apod.hdurl.includes(APOD_NO_IMAGE)) {
    return null;
  }
  return image;
};

// Random APOD days, like api.nasa.gov's count param. Extra days cover days without an image.
// Falls back to the static feed.
export const fetchNasaImages = async (count) => {
  const results = await Promise.allSettled(randomApodDates(Math.ceil(count * 1.2) + 2).map(fetchApodDay));
  results
    .filter((result) => result.status === "rejected")
    .forEach((result) => console.error("Failed to fetch images: " + result.reason));
  let images = results.map((result) => result.value).filter(Boolean).slice(0, count);
  if (images.length < count) {
    images = images.concat(nasaFeed.slice(0, count - images.length));
  }
  return images;
};

// Sends the centered slide's APOD day to the parent page, which shows it under the gallery.
export const postSlideInfo = (image) => {
  if (!image || window.parent === window) return;
  const { date, title, explanation, copyright, permalink, media_type, url } = image;
  window.parent.postMessage(
    { source: "nasa-swiper", date, title, explanation, copyright, permalink, media_type, url },
    window.location.origin
  );
};

// When the parent page asks for it with ?select=parent in the swiper's URL, clicking a slide sends it to the parent
// (action: "select") instead of opening the image in a new tab. /home/ shows it beside its "Ask an SI" prompt.
// Ctrl, Cmd, Shift and middle clicks still open the image. A side slide also slides to the center.
const selectInParent =
  window.parent !== window && new URLSearchParams(window.location.search).get("select") === "parent";
export const handleSlideClick = (event, image, index, swiper) => {
  if (!selectInParent || !image) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (swiper && swiper.realIndex !== index) swiper.slideToLoop(index);
  const { date, title, explanation, copyright, permalink, media_type, url } = image;
  window.parent.postMessage(
    { source: "nasa-swiper", action: "select", date, title, explanation, copyright, permalink, media_type, url },
    window.location.origin
  );
};

// Steps the swiper from the parent's lightbox arrows ({ action: "stepSlide", step: 1 or -1 }).
// Sends the new slide in the same message as a slide click, so the lightbox shows it.
export const stepSlide = (swiper, images, step, source) => {
  if (!swiper || !images.length) return;
  const index = (swiper.realIndex + step + images.length) % images.length;
  const image = images[index];
  swiper.slideToLoop(index);
  window.parent.postMessage(
    {
      index: index + 1,
      url: image.url,
      title: image.title,
      explanation: image.explanation,
      mediaType: image.media_type,
      source,
    },
    "*"
  );
};
