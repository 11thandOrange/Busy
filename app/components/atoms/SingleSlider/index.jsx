import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

const SingleSlider = ({
  autoplay = true,
  autoplayDelay = 1500,
  navigation = true,
  sliderData = {},
  slideRenderer = () => {},
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="bb-swiper-slider ">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={false}
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
        slidesPerView={3}
        className="swiper-single"
      >
        {sliderData.map((data, index) => (
          <SwiperSlide key={index}>{slideRenderer(data)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SingleSlider;
