import React from "react";
import CustomTextField from "../../CustomTextField";
import "./style.css"
const GiftMessagePreview = ({ settingsState }) => {
  return (
    <div className="content-container">
      <div className="title-price-container bb_giftMessagePreview">
        <div className="gift-title">{settingsState.giftMessageTitle}</div>
        <div className="gift-price">{settingsState.giftMessageDescription}</div>
        <CustomTextField
          label={"Message"}
          placeholder="Enter your message"
          readOnly={true}
        ></CustomTextField>
      </div>
    </div>
  );
};

export default GiftMessagePreview;
