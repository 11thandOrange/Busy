import React, { useCallback, useEffect } from "react";
import DatePicker from "../../../DatePicker";
import CustomTextField from "../../../CustomTextField";
import {
  isEndDateValid,
  updateSettingsState,
} from "../../../../../utils/clientFunctions";

const CountdownTimerSettings = ({ setSettingsState, settingsState }) => {
  // debugger;

  return (
    <div>
      <div>
        <DatePicker
          onDatePicked={(date) => {
            setSettingsState((prevState) =>
              updateSettingsState(
                "generalSettings.countDownStartAt",
                date,
                prevState,
              ),
            );
          }}
          label={"Countdown starts At"}
        ></DatePicker>
      </div>
      <div>
        <DatePicker
          onDatePicked={(date) => {
            return setSettingsState((prevState) =>
              updateSettingsState(
                "generalSettings.countDownEndsAt",
                date,
                prevState,
              ),
            );
          }}
          label={"Countdown ends At"}
          minValue={settingsState?.generalSettings?.countDownStartAt}
          errorMessage={
            isEndDateValid(settingsState.generalSettings.countDownEndsAt)
              ? false
              : "Not valid"
          }
        ></DatePicker>
      </div>
      <CustomTextField
        type="text"
        label="Message"
        helpText="Do not remove the #countdown_timer# tag, that's where the timer will be displayed!"
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

export default CountdownTimerSettings;
