import { Card, Checkbox, Layout } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import { updateState } from "../../../../utils/clientFunctions";
import GiftCustomization from "../GiftCustomization";

const EnableGiftReceiptEmail = ({ settingsState, setSettingsState }) => {
  return (
    <div className="selectGiftProduct">
      <Layout></Layout>
      <Card>
        <Checkbox
          label="Enable Gift Wrap"
          checked={settingsState.enableGiftRecipientEmail}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("enableGiftRecipientEmail", value, prevState),
            );
          }}
        ></Checkbox>
        <CustomTextField
          type={"text"}
          label={"Title"}
          value={settingsState.recipientEmailTitle}
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("recipientEmailTitle", value, prevState),
            );
          }}
        ></CustomTextField>

        <CustomTextField
          type={"text"}
          label={"Short Description"}
          maxLength={100}
          value={settingsState.recipientEmailDescription}
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("recipientEmailDescription", value, prevState),
            );
          }}
        ></CustomTextField>

        <CustomTextField
          type={"email"}
          label={"Email"}
          value={settingsState.recipientEmail}
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("recipientEmail", value, prevState),
            );
          }}
        ></CustomTextField>
        <Checkbox
          label="Send Email upon checkout"
          checked={settingsState.sendEmailUponCheckout}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("sendEmailUponCheckout", value, prevState),
            );
          }}
        ></Checkbox>
        <Checkbox
          label="Send email when Item is Shipped "
          checked={settingsState.sendEmailWhenItemIsShipped}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("sendEmailWhenItemIsShipped", value, prevState),
            );
          }}
        ></Checkbox>
      </Card>
      <Card>
        <GiftCustomization
          onColorChange={(color) => {
            setSettingsState((prevState) =>
              updateState(
                "giftReceiptEmailCustomizationColor",
                color,
                prevState,
              ),
            );
          }}
          onTextChange={(text) => {
            setSettingsState((prevState) =>
              updateState("giftReceiptEmailCustomizationText", text, prevState),
            );
          }}
          onEmojiChange={(emojiData) => {
            setSettingsState((prevState) =>
              updateState(
                "giftReceiptEmailCustomizationEmoji",
                emojiData.emoji,
                prevState,
              ),
            );
          }}
          setSettingsState={setSettingsState}
          settingsState={{
            customizationText: settingsState.giftReceiptEmailCustomizationText,
            customizationColor:
              settingsState.giftReceiptEmailCustomizationColor,
            customizationEmoji:
              settingsState.giftReceiptEmailCustomizationEmoji,
          }}
        ></GiftCustomization>
      </Card>
    </div>
  );
};

export default EnableGiftReceiptEmail;
