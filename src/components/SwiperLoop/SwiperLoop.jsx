/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./SwiperLoop.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { handleIframeInteraction } from "../../utils/utils";

export default function SwiperLoop({ images }) {
  const swiperRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => setIsDarkMode(window.parent.document.body.classList.contains('dark'));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(window.parent.document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const allowedOrigins = ['https://model.earth', 'https://raydendarkus.github.io', 'http://localhost:8887', 'http://localhost:5173'];
    const handlePostMessage = (event) => {
      if (allowedOrigins.includes(event.origin)) {
        const { action, scene } = event.data;
        if (action === "changeSlide" && !isNaN(scene)) {
          const swiper = swiperRef.current.swiper;
          console.log("Scene: " + scene);
          if (scene > 0 && scene <= 18 && swiperRef.current)
            swiper.slideToLoop(scene - 1);
          else 
            swiper.slideToLoop(0);
        }
      }
    }
    window.addEventListener('message', handlePostMessage);
    return () => window.removeEventListener('message', handlePostMessage);
  }, []);

  const handleSlideClick = (index) => {
    const newIndex = index + 1;
    console.log("Slide clicked, real index:", newIndex); // Debug log
    if(swiperRef.current.swiper)
      swiperRef.current.swiper.slideToLoop(index);
    window.parent.postMessage({ index: newIndex, source: 'loop' }, '*');
  };

  useEffect(() => {
    handleIframeInteraction();
  }, [images]);

  return (
    <div className={`${styles.swiperLoopContainer} ${isDarkMode ? styles.dark : ''}`}>
      <Swiper
        grabCursor={true}
        loop={images.length > 7}
        initialSlide={0}
        centeredSlides={true}
        slidesPerView={8}
        slidesPerGroup={1}
        spaceBetween={10}
        breakpoints={{
          1200: { slidesPerView: 8 },
          1024: { slidesPerView: 7 },
          800: { slidesPerView: 6 },
          650: { slidesPerView: 5 },
          550: { slidesPerView: 4 },
          425: { slidesPerView: 3 },
          320: { slidesPerView: 2 }
        }}
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className={styles.swiperLoop}
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide} onClick={() => handleSlideClick(index)}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              {image.media_type === 'video' ? (
                <iframe src={image.url} title={image.title} allowFullScreen />
              ) : (
                <img src={image.url} alt={image.title || "Slide Image"} />
              )}
              <p>{image.title}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}