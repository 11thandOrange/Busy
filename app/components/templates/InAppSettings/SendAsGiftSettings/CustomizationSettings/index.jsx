import React, { useRef, useState } from "react";
import "./style.css";
import { Layout, RadioButton } from "@shopify/polaris";
import SettingSection from "../../../GlobalSettings/SettingSection";
import ToastBar from "../../../../atoms/Toast";
import ManageDataChange from "../../../ManageDataChange";
export const DISPLAY_GIFT_OPTIONS = {
  BOTH: "both",
  CART_ONLY: "cart_only",
  PRODUCT_PAGE_ONLY: "product_page_only",
};
export const GIFT_BTN_TYPE = {
  BOTH: "both",
  INLINE: "inline",
  DRAWER: "drawer",
};
const CustomizationSettings = () => {
  const initialState = {
    displayGiftOptions: DISPLAY_GIFT_OPTIONS.BOTH,
    giftBtnType: GIFT_BTN_TYPE.BOTH,
  };
  const [settingsState, setSettingsState] = useState(initialState);
  const oldSettingRef = useRef(initialState);
  const handleSaveSettingsData = () => {
    console.log("handleSaveSettingsData", settingsState);
  };
  const handleDiscardChanges = () => {
    setSettingsState(oldSettingRef.current);
  };
  const updateSettings = (key, value) => {
    setSettingsState((prevState) => ({ ...prevState, [key]: value }));
  };
  return (
    <Layout>
      <ToastBar
        onDismiss={() => {}}
        show={false}
        message="Settings saved successfully"
      />
      <ManageDataChange
        newState={settingsState}
        prevState={oldSettingRef.current}
        handleSaveChanges={handleSaveSettingsData}
        handleDiscardChanges={handleDiscardChanges}
      />
      <SettingSection
        heading={"How to display the gift button?"}
        subHeading={"Control how the gift button will appear in your store"}
      >
        <RadioButton
          label="Both"
          helpText=" "
          checked={GIFT_BTN_TYPE.BOTH === settingsState.giftBtnType}
          onChange={() => {
            updateSettings("giftBtnType", GIFT_BTN_TYPE.BOTH);
          }}
        />
        <RadioButton
          label="Inline"
          helpText=" "
          checked={GIFT_BTN_TYPE.INLINE === settingsState.giftBtnType}
          onChange={() => {
            updateSettings("giftBtnType", GIFT_BTN_TYPE.INLINE);
          }}
        />
        <RadioButton
          label="Drawer"
          helpText=" "
          checked={GIFT_BTN_TYPE.DRAWER === settingsState.giftBtnType}
          onChange={() => {
            updateSettings("giftBtnType", GIFT_BTN_TYPE.DRAWER);
          }}
        />
      </SettingSection>
      <SettingSection
        heading={"Where to display the gift options?"}
        subHeading={"Control where the gift options will appear in your store"}
      >
        <RadioButton
          label="Both"
          helpText="The gift options will appear in the cart and in product pages"
          checked={
            DISPLAY_GIFT_OPTIONS.BOTH === settingsState.displayGiftOptions
          }
          onChange={() => {
            updateSettings("displayGiftOptions", DISPLAY_GIFT_OPTIONS.BOTH);
          }}
        />
        <RadioButton
          label="Cart Only"
          helpText="The gift options will appear just in the cart page or drawer"
          checked={
            DISPLAY_GIFT_OPTIONS.CART_ONLY === settingsState.displayGiftOptions
          }
          onChange={() => {
            updateSettings(
              "displayGiftOptions",
              DISPLAY_GIFT_OPTIONS.CART_ONLY,
            );
          }}
        />
        <RadioButton
          label="Product Page Only"
          helpText="The gift options will appear just in product pages"
          checked={
            DISPLAY_GIFT_OPTIONS.PRODUCT_PAGE_ONLY ===
            settingsState.displayGiftOptions
          }
          onChange={() => {
            updateSettings(
              "displayGiftOptions",
              DISPLAY_GIFT_OPTIONS.PRODUCT_PAGE_ONLY,
            );
          }}
        />
      </SettingSection>
    </Layout>
  );
};

export default CustomizationSettings;
