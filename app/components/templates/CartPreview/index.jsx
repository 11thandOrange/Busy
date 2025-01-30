import React, { useState } from "react";
import { GIFT_BTN_TYPE } from "../InAppSettings/SendAsGiftSettings/CustomizationSettings";
import { COLOR_THEME } from "../../../constants/announcementCustomizationConfig";
import { Button, Checkbox, Icon } from "@shopify/polaris";
import ImageRenderer from "../../atoms/ImageRenderer";
import IMAGES from "../../../utils/Images";
import IncDecCounter from "../../atoms/IncDecCounter";
import { DeleteIcon } from "@shopify/polaris-icons";
import "./style.css";
import InlineGiftButton from "../../atoms/InlineGiftButton";
import DrawerGiftButton from "../../atoms/DrawerGiftButton";
import SendAsGiftPreview from "../../atoms/SendAsGiftPreview";
import { APP_TYPE } from "../../../utils/constants";
const CartPreview = ({
  settingsState,
  setSettingsState,
  colorTheme = COLOR_THEME.LIGHT,
  appType = APP_TYPE.SEND_AS_A_GIFT,
}) => {
  const [showGiftPopup, setShowGiftPopup] = useState(false);

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
  return (
    <div>
      <div className="cart-preview-card-container">
        <div
          className="cart-preview-card"
          style={{
            backgroundColor: "white", //colorTheme == COLOR_THEME.LIGHT ? "white" : "black",
          }}
        >
          {/* Dummy URL bar */}
          <div className="url-bar">example.com/product-page</div>
          <div className="cart-preview-cart-titlebx">
            <h2>Your cart</h2>
          </div>
          {/* <div className="emoji-previewout">
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
          </div> */}

          <div className="cart-preview-separator">
            <p>PRODUCT</p>
            <p>TOTAL</p>
          </div>

          <div className="cart-preview-product-details">
            <ImageRenderer
              src={IMAGES.shoeDiscount}
              alt={"Product"}
              styleClass="product-image"
            />
          </div>
          <div className="cart-preview-product-info">
            <p className="name">The shoe</p>
            <p className="price">$200 </p>
          </div>

          <div className="cart-preview-cart-actions">
            <IncDecCounter></IncDecCounter>
            <Icon source={DeleteIcon} tone="base" />
          </div>
          <div className="cart-preview-Gift-btn">{fetchButtonStyle()}</div>
          {showGiftPopup && (
            <SendAsGiftPreview
              settingsState={settingsState}
              onClose={onGiftBtnClick}
            ></SendAsGiftPreview>
          )}
          <div className="cart-preview-cart-footer">
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
