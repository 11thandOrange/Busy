import React, { useMemo } from "react";
import "./style.css";
import { XIcon } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
const SendAsGiftPreview = ({ settingsState, onClose = () => {} }) => {
  const imgURL = useMemo(() => {
    return (
      settingsState.giftWrapImage &&
      // window.URL.createObjectURL(settingsState.giftWrapImage)
      window.URL.createObjectURL(settingsState.giftWrapImage)
    );
  }, [settingsState.giftWrapImage]);

  return (
    <div>
      <div className="send-as-gift-preview">
        <div onClick={onClose}>
          <Icon source={XIcon} tone="base" />
        </div>
        {settingsState.enableGiftWrap && (
          <div className="content-container">
            <div className="customization-emoji">
              {" "}
              {settingsState.giftWrapCustomizationEmoji}
            </div>
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
            <div className="customization-emoji">
              {" "}
              {settingsState.giftMessageCustomizationEmoji}
            </div>
            <div className="title-price-container">
              <div className="gift-title">{settingsState.giftMessageTitle}</div>
              <div className="gift-price">
                {settingsState.giftMessageDescription}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendAsGiftPreview;
