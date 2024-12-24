import { Card, Checkbox } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import { updateState } from "../../../../utils/clientFunctions";

const EnableGiftReceiptEmail = ({ settingsState, setSettingsState }) => {
  return (
    <div>
      <Card>
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
    </div>
  );
};

export default EnableGiftReceiptEmail;
