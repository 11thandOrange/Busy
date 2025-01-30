import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import "./style.css";
import ImageRenderer from "../ImageRenderer";
import { SliderModal } from "../sliderModal";
import IMAGES from "../../../utils/Images";

const sliderType = {
  IMAGE: "image",
  VIDEO: "video",
};
const sliderTypeSelector = (type, content, controls = false) => {
  switch (type) {
    case sliderType.IMAGE:
      return <ImageRenderer src={content} />;
    case sliderType.VIDEO:
      return <video width="500px" src={content} controls={controls}></video>;
  }
};
const Slider = ({
  autoplay = true,
  autoplayDelay = 1500,
  navigation = true,
  sliderData = [],
  openPopupOnClick = true,
}) => {


  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    renderer: <></>,
  });

  const onSlideClick = (type, content) => {
    if (openPopupOnClick) {
      setModalState((prevState) => ({
        ...prevState,
        show: !prevState.show,
        renderer: sliderTypeSelector(type, content, true),
      }));
    }
  };
  return (
    <div>
      <div className="bb-swiper-slider">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={navigation}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
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
            <SwiperSlide
              key={index}
              onClick={() => onSlideClick(data.type, data.content)}
            >
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
            <SwiperSlide
              key={index}
              onClick={() => onSlideClick(data.type, data.content)}
            >
              <ImageRenderer src={data.preview} />
              <div className="thumbnail-title">{data.title}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <SliderModal
        active={modalState.show}
        toggleModal={() => {
          setModalState((prevState) => ({
            ...prevState,
            show: !prevState.show,
          }));
        }}
        toRender={modalState.renderer}
      ></SliderModal>
    </div>
  );
};

export default Slider;
