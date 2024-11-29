import React from "react";
import CustomTextField from "../../../CustomTextField";
import { updateState } from "../../../../../utils/clientFunctions";

const FreeShippingSettings = ({ setSettingsState, settingsState }) => {
  return (
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
  );
};

export default FreeShippingSettings;
