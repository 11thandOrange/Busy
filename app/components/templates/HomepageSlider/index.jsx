import React, { useRef, useState } from "react";
// Import Swiper React components

import "./homepageSlider.css";

// import required modules

import HomepageDetails from "../../atoms/HomepageDetails";
import Slider from "../../atoms/Slider";

export default function HomepageSlider({ selectedType, setSelectedType, showPopOver=false,showCustomizeBtn=false, sliderData = [] ,onCustomizeBtnClick=()=>{}}) {
  return (
    <>
      <HomepageDetails
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showPopOver={showPopOver}
        showCustomizeBtn={showCustomizeBtn}
        onCustomizeBtnClick= {onCustomizeBtnClick}
      ></HomepageDetails>
      <Slider autoplay={true} navigation={true} autoplayDelay={1000} sliderData={sliderData}></Slider>
    </>
  );
}
