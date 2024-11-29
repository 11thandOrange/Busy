import React, { useCallback, useEffect } from "react";
import CustomTextField from "../CustomTextField";
import InputDatePicker from "../InputDatePicker";
import {
  isExpirationTimeValid,
  updateState,
} from "../../../utils/clientFunctions";
import { InlineError } from "@shopify/polaris";

const EvergreenDatePicker = ({
  setSettingsState,
  settingsState,
  setError,
  error,
}) => {
  useEffect(() => {
    setError((prevState) =>
      updateState(
        "minMaxExp",
        !isExpirationTimeValid(
          settingsState.settings.minExpTime,
          settingsState.settings.maxExpTime,
        ),
        prevState,
      ),
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
            updateState("settings.minExpTime", value, prevState),
          );
        }}
        initialValue={settingsState.settings.minExpTime}
      ></InputDatePicker>
      <InputDatePicker
        heading={"Maximum expiration deadline"}
        onDatePicked={(value) => {
          setSettingsState((prevState) =>
            updateState("settings.maxExpTime", value, prevState),
          );
        }}
        initialValue={settingsState.settings.maxExpTime}
      ></InputDatePicker>
      {error.minMaxExp && (
        <InlineError
          message="The maximum expiration deadline should be later than the minimum."
          fieldID="ExpirationId"
        />
      )}
    </div>
  );
};

export default EvergreenDatePicker;
