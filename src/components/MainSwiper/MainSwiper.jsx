import { useState, useEffect } from "react";
import MySwiper from "../MySwiper/MySwiper";
import MiniSwiper from "../MySwiper/MiniSwiper";
import styles from "../MySwiper/MySwiper.module.css";
import { fetchNasaImages } from "../../utils/utils";

export default function MainSwiper() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [images, setImages] = useState([]);  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () =>
      setIsDarkMode(window.parent.document.body.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(window.parent.document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchNasaImages(10).then(setImages);
  }, []);

  return (
    <div className={`${isDarkMode ? styles.dark : ""}`}>
      {/* Wait for images so Swiper starts in loop mode, centered on the first slide */}
      {images.length > 0 && (isMobile ? <MiniSwiper images={images} /> : <MySwiper images={images} />)}
    </div>
  );
}
