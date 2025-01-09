import { Card, Checkbox, DropZone } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import "./style.css";
import { updateState } from "../../../../utils/clientFunctions";
import GiftCustomization from "../GiftCustomization";
import Selector from "../../../atoms/Selector";
import { GIFT_TYPE_STATUS } from "../../../../constants/sendAsGiftCustomizationConfig";
export const options = [
  { label: "Enable Gift Message", value: GIFT_TYPE_STATUS.ENABLE },
  { label: "Disable Gift Message", value: GIFT_TYPE_STATUS.DISABLE },
];
const EnableGiftMessageStep = ({ settingsState, setSettingsState }) => {
  return (
    <div className="enable-gift-message-container">
      <Card>
        <Selector
          options={options}
          label="Status"
          helpText="Enable to add a gift message to your product."
          onSelect={(value) => {
            setSettingsState((prevState) =>
              updateState("enableGiftMessage", value, prevState),
            );
          }}
          initialValue={settingsState.enableGiftMessage}
        ></Selector>
      </Card>
      <Card>
        <CustomTextField
          type={"text"}
          label={"Gift Message Title"}
          value={settingsState.giftMessageTitle}
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("giftMessageTitle", value, prevState),
            );
          }}
        ></CustomTextField>

        <CustomTextField
          type={"text"}
          label={"Short Description"}
          maxLength={100}
          value={settingsState.giftMessageDescription}
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("giftMessageDescription", value, prevState),
            );
          }}
        ></CustomTextField>
      </Card>
      <Card>
      <GiftCustomization
          onColorChange={(color) => {
            setSettingsState((prevState) =>
              updateState("giftWrapCustomizationColor", color, prevState),
            );
          }}
          onTextChange={(text) => {
            setSettingsState((prevState) =>
              updateState("giftWrapCustomizationText", text, prevState),
            );
          }}
          onEmojiChange={(emojiData) => {
            setSettingsState((prevState) =>
              updateState(
                "giftWrapCustomizationEmoji",
                emojiData.emoji,
                prevState,
              ),
            );
          }}
          setSettingsState={setSettingsState}
          settingsState={{
            customizationText: settingsState.giftWrapCustomizationText,
            customizationColor: settingsState.giftWrapCustomizationColor,
            customizationEmoji: settingsState.giftWrapCustomizationEmoji,
          }}
        ></GiftCustomization>
      </Card>
    </div>
  );
};

export default EnableGiftMessageStep;
