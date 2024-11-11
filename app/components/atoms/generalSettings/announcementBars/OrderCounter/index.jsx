import React from "react";
import CustomTextField from "../../../CustomTextField";
import { updateSettingsState } from "../../../../../utils/clientFunctions";

const OrderCounterSettings = ({ setSettingsState, settingsState }) => {
  return (
    <div>
      <CustomTextField
        value={0}
        type="text"
        label="Your total order count"
        disabled={true}
      ></CustomTextField>
      <CustomTextField
        value={settingsState.generalSettings.message}
        onValueChange={(value) => {
          setSettingsState((prevState) =>
            updateSettingsState("generalSettings.message", value, prevState),
          );
        }}
        type="text"
        label="Message"
        helpText="Show the real orders count value using the #orders_count# variable. Shopify doesn't allow fake information."
      ></CustomTextField>
    </div>
  );
};

export default OrderCounterSettings;
