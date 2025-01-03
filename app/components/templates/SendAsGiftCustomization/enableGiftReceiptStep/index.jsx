import { Card, Checkbox } from "@shopify/polaris";
import React from "react";
import { updateState } from "../../../../utils/clientFunctions";
import "./style.css";
import GiftCustomization from "../GiftCustomization";

const EnableGiftReceiptStep = ({ settingsState, setSettingsState }) => {
  return (
    <div className="selectGiftProduct">
      <Card>
        <Checkbox
          label="Enable Gift Wrap"
          checked={settingsState.enableGiftReceipt}
          onChange={(value) => {
          
            setSettingsState((prevState) =>
              updateState("enableGiftReceipt", value, prevState),
            );
          }}
        ></Checkbox>
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
              updateState("giftReceiptCustomizationColor", color, prevState),
            );
          }}
          onTextChange={(text) => {
            setSettingsState((prevState) =>
              updateState("giftReceiptCustomizationText", text, prevState),
            );
          }}
          onEmojiChange={(emojiData) => {
            setSettingsState((prevState) =>
              updateState(
                "giftReceiptCustomizationEmoji",
                emojiData.emoji,
                prevState,
              ),
            );
          }}
          setSettingsState={setSettingsState}
      
          settingsState={{
            customizationText: settingsState.giftReceiptCustomizationText,
            customizationColor: settingsState.giftReceiptCustomizationColor,
            customizationEmoji: settingsState.giftReceiptCustomizationEmoji,
          }}
        ></GiftCustomization>
      </Card>
    </div>
  );
};

export default EnableGiftReceiptStep;
