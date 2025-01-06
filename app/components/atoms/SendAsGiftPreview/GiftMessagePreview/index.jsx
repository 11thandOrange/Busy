import React from "react";

const GiftMessagePreview = ({ settingsState }) => {
  return (
    <div className="content-container">
      <div className="title-price-container">
        <div className="gift-title">{settingsState.giftMessageTitle}</div>
        <div className="gift-price">{settingsState.giftMessageDescription}</div>
      </div>
    </div>
  );
};

export default GiftMessagePreview;
