import React, { useRef, useState } from "react";
// Import Swiper React components

import "./homepageSlider.css";

// import required modules

import HomepageDetails from "../../atoms/HomepageDetails";
import Slider from "../Slider";

export default function HomepageSlider({ selectedType, setSelectedType }) {
  return (
    <>
      <HomepageDetails
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      ></HomepageDetails>
      <Slider autoplay={true} navigation={true} autoplayDelay={1000}></Slider>
    </>
  );
}
