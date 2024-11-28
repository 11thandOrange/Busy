import React, { useEffect, useMemo } from "react";
import CustomTextField from "../CustomTextField";
import InputDatePicker from "../InputDatePicker";
import {
  isExpirationTimeValid,
  updateSettingsState,
} from "../../../utils/clientFunctions";
import { InlineError } from "@shopify/polaris";

const EvergreenDatePicker = ({ setSettingsState, settingsState }) => {
  const isValid = useMemo(() => {
    

    return isExpirationTimeValid(
      settingsState.settings.minExpTime,
      settingsState.settings.maxExpTime,
    );
  }, [settingsState.settings.minExpTime, settingsState.settings.maxExpTime]);

  return (
    <div>
      {" "}
      <CustomTextField
        type="number"
        label={"Cool off period (minutes)"}
        helpText={
          "Once the cool off period expires, the countdown timer will be shown again (individually for each customer on each product page)."
        }
        min={0}
      ></CustomTextField>
      <InputDatePicker
        heading={"Minimum expiration deadline"}
        onDatePicked={(value) => {
         
          setSettingsState((prevState) =>
            updateSettingsState("settings.minExpTime", value, prevState),
          );
        }}
        initialValue={settingsState.settings.minExpTime}
      ></InputDatePicker>
      <InputDatePicker
        heading={"Maximum expiration deadline"}
        onDatePicked={(value) => {
          setSettingsState((prevState) =>
            updateSettingsState("settings.maxExpTime", value, prevState),
          );
         
        }}
        initialValue={settingsState.settings.maxExpTime}
      ></InputDatePicker>
      {!isValid && (
        <InlineError
          message="The maximum expiration deadline should be later than the minimum."
          fieldID="ExpirationId"
        />
      )}
    </div>
  );
};

export default EvergreenDatePicker;
