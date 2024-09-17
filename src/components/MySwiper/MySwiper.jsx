/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MySwiper.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function MySwiper() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);

  // // Set the hash to 1 on page load or reload
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.hash.substring(1));
  //   const feed = urlParams.get('feed');
  //   let scene = parseInt(urlParams.get('scene'), 10);
  //   console.log(scene);
  //   if (!feed || isNaN(scene)) {
  //     scene = 1; // Default to scene 1 if NaN or invalid
  //     window.history.replaceState(null, null, '#feed=nasa&scene=1');
  //   }
  //   setActiveIndex(scene);
  // }, []);

  // Fetch the NASA API
  useEffect(() => {
    const initializeHash = () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const feed = hashParams.get('feed');
      const scene = parseInt(hashParams.get('scene'), 10);

      if (scene!==1 || !feed || isNaN(scene) || scene < 1 || scene > 5) {
        window.history.replaceState(null, null, '#feed=nasa&scene=1');
        // setActiveIndex(1);
      } else {
        if(scene!==1)
          window.reload();
      }
    };

    initializeHash();

    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=7BdaDaLN7EHQyb8Db3NDkE1dPSniiIG2oE0wvt64&hd=True&count=5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images: ' + error);
      }
    };

    fetchImages();
  }, []);

  // Change the slide from the url
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#feed=nasa&scene=(\d+)/);
      const sceneNumber = parseInt(match[1], 10);
      if (match && swiperRef.current) 
        swiperRef.current.swiper.slideToLoop(sceneNumber - 1); // If hash is 1-5 and it changes
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);
  
  // Update the url on changing slide
  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex + 1; // Add 1 since index starts from 0
    setActiveIndex(index);
    window.history.replaceState(null, null, `#feed=nasa&scene=${index}`);
  };

  // For videos this will be the configuration as grabbing is not allowed for it
  useEffect(() => {
    const handleIframeInteraction = () => {
      document.querySelectorAll('.swiper-slide iframe').forEach(iframe => {
        iframe.addEventListener('mouseenter', () => {
          iframe.style.pointerEvents = 'auto';
        });
        iframe.addEventListener('mouseleave', () => {
          iframe.style.pointerEvents = 'none';
        });
      });
    };

    handleIframeInteraction();
  }, [images]);

  return (
    <div>
      <Swiper
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={2}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          650: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, Navigation, Pagination]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        className='mySwiper'
        ref={swiperRef}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {activeIndex === index + 1 ? ( // Compare activeIndex with current index, if it is true then enable img link otherwise not
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                {image.media_type === 'video' ? (
                  <iframe src={image.url} title={image.title} allowFullScreen />
                ) : (
                  <img src={image.url} alt={image.title || "Slide Image"} />
                )}
                <p>{image.title}</p>
              </a>
            ) : (
              <>
                {image.media_type === 'video' ? (
                  <iframe src={image.url} title={image.title} allowFullScreen />
                ) : (
                  <img src={image.url} alt={image.title || "Slide Image"} />
                )}
                <p>{image.title}</p>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}