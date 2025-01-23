import React, { useEffect, useState } from "react";
import "./style.css";
import PreviewCardBanner from "../../atoms/PreviewCardBanner";
import { APP_TYPE } from "../../../utils/constants";
import PreviewCardTimer from "../../atoms/PreviewCardTimer";
import { COLOR_THEME } from "../../../constants/announcementCustomizationConfig";
import ImageRenderer from "../../atoms/ImageRenderer";
import IMAGES from "../../../utils/Images";
import SendAsGiftPreview from "../../atoms/SendAsGiftPreview";
import { Button, Checkbox } from "@shopify/polaris";
import { GIFT_BTN_TYPE } from "../InAppSettings/SendAsGiftSettings/CustomizationSettings";
import InlineGiftButton from "../../atoms/InlineGiftButton";
import DrawerGiftButton from "../../atoms/DrawerGiftButton";

const ProductPreviewCard = ({
  settingsState,
  announcementBarType,
  setSettingsState,
  appType = APP_TYPE.ANNOUNCEMENT_BARS,
  colorTheme = COLOR_THEME.LIGHT,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  // console.log("settings state is here",settingsState);

  const handleQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value)); // Prevent going below 0
    setQuantity(value);
  };
  const onGiftBtnClick = () => {
    if (appType == APP_TYPE.SEND_AS_A_GIFT) {
      setShowGiftPopup((prevState) => {
        return !prevState;
      });
    }
  };
  const fetchButtonStyle = () => {
    switch (settingsState.giftBtnType) {
      case GIFT_BTN_TYPE.INLINE:
        return (
          <InlineGiftButton
            settingsState={settingsState}
            onGiftBtnClick={onGiftBtnClick}
          ></InlineGiftButton>
        );
      case GIFT_BTN_TYPE.DRAWER:
        return (
          <DrawerGiftButton
            settingsState={settingsState}
            onGiftBtnClick={onGiftBtnClick}
          ></DrawerGiftButton>
        );
      case GIFT_BTN_TYPE.BOTH:
        return (
          <div>
            <InlineGiftButton
              settingsState={settingsState}
              onGiftBtnClick={onGiftBtnClick}
            ></InlineGiftButton>
            <DrawerGiftButton
              settingsState={settingsState}
              onGiftBtnClick={onGiftBtnClick}
            ></DrawerGiftButton>
          </div>
        );
    }
  };
  const fetchTimerComponent = () => {
    switch (appType) {
      case APP_TYPE.ANNOUNCEMENT_BARS:
        return (
          <PreviewCardBanner
            settingsState={settingsState}
            announcementBarType={announcementBarType}
            setSettingsState={setSettingsState}
          />
        );

      case APP_TYPE.COUNTDOWN_TIMER:
        return (
          <PreviewCardTimer settingsState={settingsState}></PreviewCardTimer>
        );

      case APP_TYPE.SEND_AS_A_GIFT:

      case APP_TYPE.SEND_AS_A_GIFT_CUSTOMIZATION:
        return <div style={{ color: "black" }}>{fetchButtonStyle()}</div>;
      default:
        return null; // or handle other cases, if necessary
    }
  };
  return (
    <div className="product-preview-card-container">
      <div
        className="product-preview-card"
        style={{
          backgroundColor: colorTheme == COLOR_THEME.LIGHT ? "white" : "black",
        }}
      >
        {/* Dummy URL bar */}
        <div className="url-bar">example.com/product-page</div>
        {/* Title Text */}
        {/* <div className="title-text"> {settingsState.generalSettings.message } </div> */}
        {/* Product Image */}
        <div className="product-image-container">
          <ImageRenderer
            src={IMAGES.shoeDiscount}
            alt={"Product"}
            styleClass="product-image"
          />
        </div>

        {/* Product Title, Price, and Quantity */}
        <div className="product-info">
          <h2 className="product-title">Product title</h2>
          <p className="product-price">
            <span className="old-price">300 $USD</span>
            <span className="current-price">200 $USD</span>
          </p>

          {/* Quantity Selector */}
          <div className="quantity-container">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
              min="0"
            />
          </div>
        </div>
        {fetchTimerComponent()}
        {/* Add to Cart Button */}
        <div className="add-to-cart-container">
          <button className="add-to-cart-button">Add to cart</button>
        </div>

        {showGiftPopup && (
          <SendAsGiftPreview
            settingsState={settingsState}
            onClose={onGiftBtnClick}
          ></SendAsGiftPreview>
        )}
        {/* Product Description */}
        <div className="product-description">
          <h3>Product description</h3>
          <p>
            Here you’ll go into more depth about your product. Outline its key
            features, what sets it apart from other products in the market, its
            size and weight if applicable, and any other important details
            customers need to know.
          </p>
          <ul>
            <li>
              <strong>Material:</strong> What is the product made of?
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
