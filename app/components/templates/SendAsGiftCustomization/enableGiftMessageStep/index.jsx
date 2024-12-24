import { Card, Checkbox, DropZone } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import "./style.css";
import { updateState } from "../../../../utils/clientFunctions";
const EnableGiftMessageStep = ({ settingsState, setSettingsState }) => {
  return (
    <div>
      <Card>
        <Checkbox
          label="Enable Gift Message"
          checked={settingsState.enableGiftMessage}
          onChange={(value) => {
            console.log("onchanging", value);

            setSettingsState((prevState) =>
              updateState("enableGiftMessage", value, prevState),
            );
          }}
        ></Checkbox>
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
    </div>
  );
};

export default EnableGiftMessageStep;
