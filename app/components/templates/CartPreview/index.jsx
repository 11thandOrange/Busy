import React, { useState } from "react";
import { GIFT_BTN_TYPE } from "../InAppSettings/SendAsGiftSettings/CustomizationSettings";
import { COLOR_THEME } from "../../../constants/announcementCustomizationConfig";
import { Button, Checkbox } from "@shopify/polaris";

const CartPreview = ({
  settingsState,
  setSettingsState,
  colorTheme = COLOR_THEME.LIGHT,
}) => {
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const onGiftBtnClick = () => {
    setShowGiftPopup((prevState) => {
      return !prevState;
    });
  };
  const fetchButtonStyle = () => {
    switch (settingsState.giftBtnType) {
      case GIFT_BTN_TYPE.INLINE:
        return (
          <Checkbox label="Add as a Gift" onChange={onGiftBtnClick}></Checkbox>
        );
      case GIFT_BTN_TYPE.DRAWER:
        return <Button onClick={onGiftBtnClick}>Add as a Gift</Button>;
      case GIFT_BTN_TYPE.BOTH:
        return (
          <div>
            <Checkbox label="Add as a Gift"></Checkbox>
            <Button>Add as a Gift</Button>
          </div>
        );
    }
  };
  return <div>{fetchButtonStyle()}</div>;
};

export default CartPreview;
