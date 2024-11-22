/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MySwiper.module.css";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { handleIframeInteraction } from "../../utils/utils";

export default function MySwiper({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const initializeHash = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const feed = hashParams.get("feed");
      const scene = parseInt(hashParams.get("scene"), 10);
      console.log(`Initial hash params - feed: ${feed}, scene: ${scene}`);
      window.history.replaceState(null, null, "#feed=nasa&scene=1");
      setActiveIndex(1);
    };
    initializeHash(); //Initialize the url
  }, []);

  // Update the slide from the url. Now you can change the scene in the url and it will go to that slide.
  useEffect(() => {
    const handleHashChange = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const scene = parseInt(hashParams.get("scene"), 10);
      if (!isNaN(scene) && scene > 0 && scene < 11 && swiperRef.current)
        swiperRef.current.swiper.slideToLoop(scene - 1);
      else swiperRef.current.swiper.slideToLoop(0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update the url on changing slide
  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex + 1; // Add 1 since index starts from 0
    setActiveIndex(index);
    window.history.replaceState(null, null, `#feed=nasa&scene=${index}`);
  };

  // Notes down the index of the slider
  useEffect(() => {
    console.log(`activeIndex updated: ${activeIndex}`);
  }, [activeIndex]);

  // For videos this will be the configuration as grabbing is not allowed for it
  useEffect(() => {
    handleIframeInteraction();
  }, [images]);

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={images.length > 3}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        spaceBetween={50}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        className={styles.mySwiper}
        slidesPerGroup={1}
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <a href={image.url} target="_blank" rel="noopener noreferrer">
              {image.media_type === "video" ? (
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
