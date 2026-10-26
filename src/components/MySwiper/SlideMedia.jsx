/* eslint-disable react/prop-types */

// YouTube embeds show their thumbnail instead of loading the player in every slide.
// The player sends tracking requests on load, which ad blockers log as console errors.
const youtubeId = (url) => url?.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/)?.[1];

const playBadge = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "64px",
  height: "44px",
  borderRadius: "12px",
  background: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  fontSize: "22px",
  lineHeight: "44px",
  textAlign: "center",
  pointerEvents: "none",
};

export default function SlideMedia({ image }) {
  if (image.media_type !== "video") {
    return <img src={image.url} alt={image.title || "Slide Image"} />;
  }
  const id = youtubeId(image.url);
  if (!id) {
    return <iframe src={image.url} title={image.title} allowFullScreen />;
  }
  return (
    <span style={{ position: "relative", display: "block", width: "100%", height: "100%" }}>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={image.title || "Video"} style={{ objectFit: "cover" }} />
      <span style={playBadge} aria-hidden="true">▶</span>
    </span>
  );
}
