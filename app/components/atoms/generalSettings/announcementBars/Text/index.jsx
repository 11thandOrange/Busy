import React from "react";
import CustomTextField from "../../../CustomTextField";
import { Text } from "@shopify/polaris";
import "./style.css";
import DatePicker from "../../../DatePicker";
import { updateState } from "../../../../../utils/clientFunctions";
const GeneralSettings = ({
  setSettingsState,
  settingsState = { settingsState },
}) => {
  return (
    <div>
      <CustomTextField
        type="text"
        label="Message"
        onValueChange={(value) => {
          setSettingsState((prevState) =>
            updateState("generalSettings.message", value, prevState),
          );
        }}
        value={settingsState.generalSettings.message}
      ></CustomTextField>
    </div>
  );
};

export default GeneralSettings;
