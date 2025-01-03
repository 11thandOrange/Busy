import React, { useRef, useState } from "react";
import "./style.css";
import "../../../../templates/AnnouncementCustomization/Settings.css";
import { Card, RadioButton, Text } from "@shopify/polaris";

import ToastBar from "../../../../atoms/Toast";
import ManageDataChange from "../../../ManageDataChange";
import { COLOR_THEME } from "../../../../../constants/announcementCustomizationConfig";
import { APP_TYPE } from "../../../../../utils/constants";
import ProductPreviewCard from "../../../ProductPreviewCard";
import CartPreview from "../../../CartPreview";
import GiftCustomization from "../../../SendAsGiftCustomization/GiftCustomization";
import { updateState } from "../../../../../utils/clientFunctions";
import { useFetcher } from "@remix-run/react";
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
const CustomizationSettings = ({
  announcementBarType,
  colorTheme = COLOR_THEME.LIGHT,
  initialData,
}) => {
  const fetcher = useFetcher();
  // const { showToast, onDismiss } = useToast(fetcher);
  // const [settingsState, setSettingsState] = useState({
  //   ...CUSTOMIZATON_INITIAL_STATE,
  // });
  // const prevSettingsState = useRef({});
  // useEffect(() => {
  //   if (initialData) {
  //     setSettingsState(initialData);
  //     prevSettingsState.current = initialData;
  //   }
  // }, [initialData]);
  // const handleOnSave = () => {
  //   fetcher.submit(
  //     {
  //       settings: JSON.stringify(settingsState.settings),
  //       display: JSON.stringify(settingsState.display),
  //     },
  //     {
  //       method: "POST",
  //       action: ROUTES.COUNTDOWN_TIMER,
  //     },
  //   );
  //   prevSettingsState.current = { ...settingsState };
  // };

  // const [error, setError] = useState({ ...COUNTDOWN_ERROR_STATE });
  // useEffect(() => {
  //   if (settingsState?.settings?.status == COUNTDOWN_TIMER_STATE.FIX_END_DATE) {
  //     setError((prevState) => updateState("minMaxExp", false, prevState));
  //   } else if (
  //     settingsState?.settings?.status == COUNTDOWN_TIMER_STATE.EVERGREEN
  //   ) {
  //     setError((prevState) => updateState("endDateErr", false, prevState));
  //   }
  // }, [settingsState.settings.status]);
  const initialState = {
    displayGiftOptions: DISPLAY_GIFT_OPTIONS.BOTH,
    giftBtnType: GIFT_BTN_TYPE.BOTH,
    btnText: "Add a gift",
    btnColor: "#000000",
    btnEmoji: "🔥",
  };
  const [settingsState, setSettingsState] = useState(initialState);
  const oldSettingRef = useRef(initialState);
  const handleSaveSettingsData = () => {
    console.log("handleSavedafdasdfasdSettingsData", settingsState, fetcher);
    fetcher.submit(
      {
        ...settingsState,
        _action: "SETTING",
      },

      {
        method: "POST",
        action: ROUTES.SEND_AS_GIFT_CUSTOMIZATION,
      },
    );
  };
  const handleDiscardChanges = () => {
    setSettingsState(oldSettingRef.current);
  };
  const updateSettings = (key, value) => {
    setSettingsState((prevState) => ({ ...prevState, [key]: value }));
  };
  return (
    <>
      <ToastBar
        onDismiss={() => {}}
        show={false}
        message="Settings saved successfully"
      />
      <div className="customization-container">
        <ManageDataChange
          newState={settingsState}
          prevState={oldSettingRef.current}
          handleSaveChanges={handleSaveSettingsData}
          handleDiscardChanges={handleDiscardChanges}
          fetcherState={fetcher.state}
        />
        <div className="customization-left-section">
          <Card>
            <GiftCustomization
              onColorChange={(color) => {
                updateSettings("btnColor", color);
              }}
              onTextChange={(text) => {
                updateSettings("btnText", text);
              }}
              onEmojiChange={(emojiData) => {
                updateSettings("btnEmoji", emojiData);
              }}
              setSettingsState={setSettingsState}
              showEmojiPicker={false}
              settingsState={{
                customizationText: settingsState.btnText,
                customizationColor: settingsState.btnColor,
                customizationEmoji: settingsState.btnEmoji,
              }}
            ></GiftCustomization>
          </Card>

          <Card>
            <Text variant="headingMd">How to display the gift button?</Text>
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
          </Card>

          <Card>
            <Text variant="headingMd">Where to display the gift options?</Text>
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
                DISPLAY_GIFT_OPTIONS.CART_ONLY ===
                settingsState.displayGiftOptions
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
          </Card>
        </div>
        <div className="customization-right-section">
          {settingsState.displayGiftOptions === DISPLAY_GIFT_OPTIONS.BOTH ||
          settingsState.displayGiftOptions ===
            DISPLAY_GIFT_OPTIONS.PRODUCT_PAGE_ONLY ? (
            <ProductPreviewCard
              setSettingsState={setSettingsState}
              settingsState={settingsState}
              announcementBarType={announcementBarType}
              appType={APP_TYPE.SEND_AS_A_GIFT_CUSTOMIZATION}
              colorTheme={colorTheme}
            ></ProductPreviewCard>
          ) : (
            <CartPreview
              setSettingsState={setSettingsState}
              settingsState={settingsState}
            ></CartPreview>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomizationSettings;
