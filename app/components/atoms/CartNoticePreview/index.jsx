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
      );
    }

    return () => clearInterval(interval);
  }, [
    cartNoticeCustomization.countdownTimer,
    cartNoticeCustomization.showCountdownTimer,
  ]);
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
                {cartNoticeCustomization.showCountdownTimer
                  ? cartNoticeCustomization.primaryText.replace(
                      "{{counter}}",
                      `${timeLeft.remainingMinutes} : ${timeLeft.remainingSeconds}`,
                    )
                  : cartNoticeCustomization.primaryText}
              </p>
              <p className="secondary-text">
                {cartNoticeCustomization.showCountdownTimer
                  ? cartNoticeCustomization.secondaryText.replace(
                      "{{counter}}",
                      `${timeLeft.remainingMinutes} : ${timeLeft.remainingSeconds}`,
                    )
                  : cartNoticeCustomization.secondaryText}
              </p>
            </div>
          </div>
        </div>

        <div className="product-details">
          <ImageRenderer
            src={IMAGES.shoeDiscount}
            alt={"Product"}
            styleClass="product-image"
          />
          <p>The shoe</p>
          <p>$200 </p>
        </div>
        <IncDecCounter></IncDecCounter>
        <Icon source={DeleteIcon} tone="base" />
        <button>Continue To Checkout</button>
      </div>
    </div>
  );
};

export default CartNoticePreview;
