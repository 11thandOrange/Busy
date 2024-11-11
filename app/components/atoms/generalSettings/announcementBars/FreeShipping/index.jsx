import React from "react";
import CustomTextField from "../../../CustomTextField";
import { updateSettingsState } from "../../../../../utils/clientFunctions";

const FreeShippingSettings = ({ setSettingsState, settingsState }) => {
  return (
    <div>
      <CustomTextField
        value={settingsState.generalSettings.message}
        type="text"
        label="Initial Message"
        onValueChange={(value) => {
          setSettingsState((prevState) => {
            return updateSettingsState(
              "generalSettings.message",
              value,
              prevState,
            );
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
