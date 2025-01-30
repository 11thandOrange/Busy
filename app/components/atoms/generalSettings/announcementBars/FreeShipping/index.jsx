import React from "react";
import CustomTextField from "../../../CustomTextField";
import { updateState } from "../../../../../utils/clientFunctions";
import { APP_LINKS } from "../../../../../utils/constants";
import { Button } from "@shopify/polaris";

const FreeShippingSettings = ({ setSettingsState, settingsState }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div>
        <CustomTextField
          value={settingsState.generalSettings.message}
          type="text"
          label="Initial Message"
          onValueChange={(value) => {
            setSettingsState((prevState) => {
              return updateState("generalSettings.message", value, prevState);
            });
          }}
        ></CustomTextField>
        <CustomTextField
          value={settingsState.generalSettings.progressMessage}
          type="text"
          label="Progress Message"
          onValueChange={(value) => {
            setSettingsState((prevState) => {
              return updateState(
                "generalSettings.progressMessage",
                value,
                prevState,
              );
            });
          }}
        ></CustomTextField>
        <CustomTextField
          value={settingsState.generalSettings.finalMessage}
          type="text"
          label="Message"
          onValueChange={(value) => {
            setSettingsState((prevState) => {
              return updateState(
                "generalSettings.finalMessage",
                value,
                prevState,
              );
            });
          }}
        ></CustomTextField>
      </div>
      <a
        style={{ marginTop: "10px", textDecoration: "none" }}
        href={APP_LINKS.SHIPPING_AMOUNT_TUTORIAL}
        target="_blank"
      >
        set amount in shipping settings
      </a>
    </div>
  );
};

export default FreeShippingSettings;
