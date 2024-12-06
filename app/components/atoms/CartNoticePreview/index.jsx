import React from "react";
import "./style.css";
const CartNoticePreview = ({ cartNoticeCustomization }) => {
  return (
    <div
      className="cart-notice-preview-container"
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
        <div>{cartNoticeCustomization.emojiToAdd}</div>
      )}
      <div className="text-container">
        <p className="primary-text">{cartNoticeCustomization.primaryText}</p>
        <p className="secondary-text">
          {cartNoticeCustomization.secondaryText}
        </p>
      </div>
    </div>
  );
};

export default CartNoticePreview;
