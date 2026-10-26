import { useState, useEffect } from "react";
import SwiperLoop from "../SwiperLoop/SwiperLoop";
import { fetchNasaImages } from "../../utils/utils";

export default function Loop() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // api_key = 7BdaDaLN7EHQyb8Db3NDkE1dPSniiIG2oE0wvt64
    fetchNasaImages(18).then(setImages);
  }, []);

  return (
    <div>
      {/* Wait for images so Swiper starts in loop mode, centered on the first slide */}
      {images.length > 0 && <SwiperLoop images={images} />}
    </div>
  );
}
