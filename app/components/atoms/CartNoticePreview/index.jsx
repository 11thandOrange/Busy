import React, { useEffect, useState } from "react";
import "./style.css";
import ProductPreviewCard from "../../templates/ProductPreviewCard";
import ImageRenderer from "../ImageRenderer";
import IMAGES from "../../../utils/Images";
import { COLOR_THEME } from "../../../constants/announcementCustomizationConfig";
import { startCountdown } from "../../../utils/clientFunctions";
import IncDecCounter from "../IncDecCounter";
import { DeleteIcon } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
const CartNoticePreview = ({ cartNoticeCustomization, colorTheme }) => {
  const [timeLeft, setTimeLeft] = useState({
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    const updateCallback = (timeObject) => {
      setTimeLeft(timeObject);
    };
    const finishCallback = () => {
      setIsFinished(true);
      setTimeLeft({
        remainingMinutes: 0,
        remainingSeconds: 0,
      });
    };

    let interval = null;

    if (cartNoticeCustomization.countdownTimer) {
      setIsFinished(false);
      interval = startCountdown(
        {
          days: 0,
          hours: 0,
          minutes: cartNoticeCustomization.countdownTimer,
          seconds: 0,
        },
        updateCallback,
        finishCallback,
        "minutes",
      );
    }

    return () => clearInterval(interval);
  }, [
    cartNoticeCustomization.countdownTimer,
    cartNoticeCustomization.showCountdownTimer,
  ]);

  const replaceText = (mainTxt) => {
    let replacedTxt = cartNoticeCustomization.showCountdownTimer
      ? `${timeLeft.remainingMinutes} : ${timeLeft.remainingSeconds}`
      : "";

    return mainTxt.replace("{{counter}}", replacedTxt);
  };
  return (
    <div className="product-preview-card-container">
      <div
        className="product-preview-card"
        style={{
          backgroundColor: "white", //colorTheme == COLOR_THEME.LIGHT ? "white" : "black",
        }}
      >
        {/* Dummy URL bar */}
        <div className="url-bar">example.com/product-page</div>
        <div className="cart-titlebx">
          <h2>Your cart</h2>
        </div>
        <div className="emoji-previewout">
          <div
            className="emoji-previewbx"
            style={{
              backgroundColor: cartNoticeCustomization.backgroundColor,
              color: cartNoticeCustomization.textColor,
              marginTop:
                cartNoticeCustomization.marginTop +
                cartNoticeCustomization.marginTopUnit,
              marginBottom:
                cartNoticeCustomization.marginBottom +
                cartNoticeCustomization.marginBottomUnit,
            }}
          >
            {cartNoticeCustomization.addAnEmoji && (
              <div className="cart-emoji">
                {cartNoticeCustomization.emojiToAdd}
              </div>
            )}
            <div
              className={`${cartNoticeCustomization.primaryText || cartNoticeCustomization.secondaryText ? "show-padding" : ""} text-container`}
            >
              <p className="primary-text">
                {replaceText(cartNoticeCustomization.primaryText)}
              </p>
              <p className="secondary-text">
                {replaceText(cartNoticeCustomization.secondaryText)}
              </p>
            </div>
          </div>
        </div>

        <div className="separator">
          <p>PRODUCT</p>
          <p>TOTAL</p>
        </div>

        <div className="product-details">
          <ImageRenderer
            src={IMAGES.shoeDiscount}
            alt={"Product"}
            styleClass="product-image"
          />
        </div>
        <div className="product-info">
          <p className="name">The shoe</p>
          <p className="price">$200 </p>
        </div>
        <div className="cart-actions">
          <IncDecCounter></IncDecCounter>
          <Icon source={DeleteIcon} tone="base" />
        </div>
        <div className="cart-footer">
          <button className="checkout-btn">Continue To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartNoticePreview;
