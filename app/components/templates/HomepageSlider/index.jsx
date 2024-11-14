import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./homepageSlider.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import HomepageDetails from "../../atoms/HomepageDetails";
import sliderData from "../../../data/sliderData.json";

const sliderType = {
  IMAGE: "image",
  VIDEO: "video",
};

const sliderTypeSelector = (type, content) => {
  switch (type) {
    case sliderType.IMAGE:
      return <img src={content} />;
    case sliderType.VIDEO:
      return <video width="500px" src={content} controls></video>;
  }
};
export default function HomepageSlider({ selectedType, setSelectedType }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <HomepageDetails
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      ></HomepageDetails>
      <div>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          autoplay={{
            delay: 2000,
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
              <img src={data.content} />
              <div className="thumbnail-title">{data.title}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
