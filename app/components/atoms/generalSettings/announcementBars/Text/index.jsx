import React from "react";
import CustomTextField from "../../../CustomTextField";
import { Text } from "@shopify/polaris";
import "./style.css";
import DatePicker from "../../../DatePicker";
import { updateSettingsState } from "../../../../../utils/clientFunctions";
const GeneralSettings = ({ setSettingsState,settingsState={settingsState}  }) => {
  return (
    <div>
      <CustomTextField
        type="text"
        label="Message"
        onValueChange={(value) => {
          setSettingsState((prevState) =>
            updateSettingsState("generalSettings.message", value, prevState),
          );
        }}
        value={settingsState.generalSettings.message}
      ></CustomTextField>
    </div>
  );
};

export default GeneralSettings;
