import { Icon } from "@shopify/polaris";
import { GiftCardFilledIcon } from "@shopify/polaris-icons";
import React from "react";
import "./style.css"
const DrawerGiftButton = ({ settingsState, onGiftBtnClick = () => {} }) => {
  return (
    <div className="addGiftBtn">
      <button
        style={{ backgroundColor: settingsState.btnColor }}
        onClick={onGiftBtnClick}
      >
        <Icon source={GiftCardFilledIcon} tone="base" />
        {settingsState?.btnText?.length > 0
          ? settingsState.btnText
          : "Add a Gift"}
      </button>
    </div>
  );
};

export default DrawerGiftButton;
