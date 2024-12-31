import React, { useMemo } from "react";
import "./style.css";

const SendAsGiftPreview = ({ settingsState }) => {
  const imgURL = useMemo(() => {
    return (
      settingsState.giftWrapImage &&
      window.URL.createObjectURL(settingsState.giftWrapImage)
    );
  }, [settingsState.giftWrapImage]);

  return (
    <div className="send-as-gift-preview">
      {settingsState.enableGiftWrap && (
        <div className="content-container">
          <div className="title-price-container">
            <div className="gift-title">{settingsState.giftWrapTitle}</div>
            <div className="gift-price">${settingsState.giftWrapPrice}</div>
          </div>
          <img
            className="gift-image"
            src={imgURL || ""}
            alt={settingsState.giftWrapTitle || "Gift Wrap"}
          />
        </div>
      )}
      {settingsState.enableGiftMessage && (
        <div className="content-container">
          <div className="title-price-container">
            <div className="gift-title">{settingsState.giftMessageTitle}</div>
            <div className="gift-price">
              {settingsState.giftMessageDescription}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendAsGiftPreview;
