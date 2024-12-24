import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import CustomEmojiPicker from "../../../atoms/CustomEmojiPicker";
import CustomColorPallete from "../../../atoms/CustomColorPallete";
import "./style.css";
const GiftCustomization = () => {
  return (
    <div className="gift-customization-container">
      <CustomTextField
        label={"Text"}
        placeholder="Enter text here"
      ></CustomTextField>
      <div className="color-emoji-container">
        <CustomColorPallete></CustomColorPallete>
        <div>
          <p>Choose an emoji</p>
          <CustomEmojiPicker></CustomEmojiPicker>
        </div>
      </div>
    </div>
  );
};

export default GiftCustomization;
