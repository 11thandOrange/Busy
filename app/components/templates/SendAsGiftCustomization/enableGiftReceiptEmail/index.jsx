import { Card, Checkbox, Layout } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import { updateState } from "../../../../utils/clientFunctions";
import GiftCustomization from "../GiftCustomization";
import Selector from "../../../atoms/Selector";
import { GIFT_TYPE_STATUS } from "../../../../constants/sendAsGiftCustomizationConfig";
export const options = [
  { label: "Enable Gift Receipt Email", value: GIFT_TYPE_STATUS.ENABLE },
  { label: "Disable Gift Receipt Email", value: GIFT_TYPE_STATUS.DISABLE },
];
const EnableGiftReceiptEmail = ({ settingsState, setSettingsState }) => {
  return (
    <div className="selectGiftProduct">
      <Card>
        <Selector
          options={options}
          label="Status"
          helpText="Enable to add a gift receipt email to your product."
          onSelect={(value) => {
            setSettingsState((prevState) =>
              updateState("enableGiftRecipientEmail", value, prevState),
            );
          }}
          initialValue={settingsState.enableGiftRecipientEmail}
        ></Selector>
      </Card>
      <Card>
        {/* <Checkbox
          label="Enable Gift Recipient Email"
          checked={settingsState.enableGiftRecipientEmail}
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("enableGiftRecipientEmail", value, prevState),
            );
          }}
        ></Checkbox> */}
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

export default EnableGiftReceiptEmail;
