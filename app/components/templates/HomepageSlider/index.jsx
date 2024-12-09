import React, { useRef, useState } from "react";
// Import Swiper React components

import "./homepageSlider.css";

// import required modules

import HomepageDetails from "../../atoms/HomepageDetails";
import Slider from "../../atoms/Slider";

export default function HomepageSlider({ sliderData = [] }) {
  return (
    <>
      <Slider
        autoplay={false}
        navigation={true}
        autoplayDelay={1000}
        sliderData={sliderData}
        openPopupOnClick={true}
      ></Slider>
    </>
  );
}
