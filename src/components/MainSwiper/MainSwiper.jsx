import { useState, useEffect } from "react";
import MySwiper from "../MySwiper/MySwiper";
import MiniSwiper from "../MySwiper/MiniSwiper";
import styles from "../MySwiper/MySwiper.module.css";

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
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&hd=True&count=10"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images: " + error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className={`${isDarkMode ? styles.dark : ""}`}>
      {isMobile ? <MiniSwiper images={images} /> : <MySwiper images={images} />}
    </div>
  );
}
