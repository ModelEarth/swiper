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
