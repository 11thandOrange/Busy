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
        value={"Only #amount# away from free shipping."}
        type="text"
        label="Progress Message"
      ></CustomTextField>
      <CustomTextField
        value={"Congratulations! You've got free shipping."}
        type="text"
        label="Message"
      ></CustomTextField>
    </div>
  );
};

export default FreeShippingSettings;
