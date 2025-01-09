import { Card, Checkbox } from "@shopify/polaris";
import React from "react";
import { updateState } from "../../../../utils/clientFunctions";
import "./style.css";
import GiftCustomization from "../GiftCustomization";
import Selector from "../../../atoms/Selector";
import { GIFT_TYPE_STATUS } from "../../../../constants/sendAsGiftCustomizationConfig";
export const options = [
  { label: "Enable Gift Receipt", value: GIFT_TYPE_STATUS.ENABLE },
  { label: "Disable Gift Receipt", value: GIFT_TYPE_STATUS.DISABLE },
];
const EnableGiftReceiptStep = ({ settingsState, setSettingsState }) => {
  return (
    <div className="selectGiftProduct">
      <Card>
        <Selector
          options={options}
          label="Status"
          helpText="Enable to add a gift Receipt to your product."
          onSelect={(value) => {
            setSettingsState((prevState) =>
              updateState("enableGiftReceipt", value, prevState),
            );
          }}
          initialValue={settingsState.enableGiftReceipt}
        ></Selector>
      </Card>
      <Card>
        {/* <Checkbox
          label="Enable Gift Receipt"
          checked={settingsState.enableGiftReceipt}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("enableGiftReceipt", value, prevState),
            );
          }}
        ></Checkbox> */}
        <Checkbox
          label="Send with gift receipt"
          checked={settingsState.sendWithGiftReceipt}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("sendWithGiftReceipt", value, prevState),
            );
          }}
        ></Checkbox>
        <Checkbox
          label="Send with NO Invoice or receipt"
          checked={settingsState.sendWithNoInvoice}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("sendWithNoInvoice", value, prevState),
            );
          }}
        ></Checkbox>
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

export default EnableGiftReceiptStep;
