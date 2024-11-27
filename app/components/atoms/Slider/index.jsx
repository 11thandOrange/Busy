import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "./style.css";

const sliderType = {
  IMAGE: "image",
  VIDEO: "video",
};
const sliderTypeSelector = (type, content) => {
  switch (type) {
    case sliderType.IMAGE:
      return <img src={content} />;
    case sliderType.VIDEO:
      return <video width="500px" src={content} autoPlay={true}></video>;
  }
};
const Slider = ({
  autoplay = true,
  autoplayDelay = 1500,
  navigation = true,
  sliderData = []
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="bb-swiper-slider">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={navigation}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[
          FreeMode,
          Navigation,
          Thumbs,
          ...(autoplay ? [Autoplay] : []),
        ]}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        className="mySwiper2"
      >
        {sliderData.map((data, index) => (
          <SwiperSlide key={index}>
            {sliderTypeSelector(data.type, data.content)}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {sliderData.map((data, index) => (
          <SwiperSlide key={index}>
            <img src={data.preview} />
            <div className="thumbnail-title">{data.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
