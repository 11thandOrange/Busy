import React from "react";
import CustomTextField from "../../../CustomTextField";
import CustomColorPallete from "../../../CustomColorPallete";
import { updateState } from "../../../../../utils/clientFunctions";

const EmailCaptureSettings = ({ setSettingsState, settingsState }) => {
  return (
    <div>
      <CustomTextField
        type="text"
        label="Message"
        value={settingsState.generalSettings.message}
        onValueChange={(value) => {
          setSettingsState((prevState) =>
            updateState("generalSettings.message", value, prevState),
          );
        }}
      ></CustomTextField>
      <CustomTextField
        value={settingsState.generalSettings.buttonText}
        type="text"
        label="Button Text"
        onValueChange={(value) => {
          setSettingsState((prevState) =>
            updateState("generalSettings.buttonText", value, prevState),
          );
        }}
      ></CustomTextField>
      <CustomColorPallete
        colorHeading={"Button Color"}
        onColorChange={(color) => {
          setSettingsState((prevState) =>
            updateState("generalSettings.buttonColor", color, prevState),
          );
        }}
        initialColor={settingsState.generalSettings.buttonColor}
      ></CustomColorPallete>
      <CustomColorPallete
        colorHeading={"Button Text Color"}
        onColorChange={(color) => {
          setSettingsState((prevState) =>
            updateState("generalSettings.buttonTextColor", color, prevState),
          );
        }}
        initialColor={settingsState.generalSettings.buttonTextColor}
      ></CustomColorPallete>
      <CustomTextField
        value={"Now you can get 15% off at checkout with Coupon #coupon#"}
        type="text"
        helpText={
          "Please keep the #coupon# variable. It will be replaced with the code from the Coupon field below."
        }
        label="Coupon Text
"
      ></CustomTextField>
      <CustomTextField
        value={"FIRST15OFF"}
        type="text"
        helpText={`Make sure it's configured in your Shopify admin > Discounts.`}
        label="Coupon
"
      ></CustomTextField>
    </div>
  );
};

export default EmailCaptureSettings;
