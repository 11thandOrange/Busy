import React, { useCallback, useEffect } from "react";
import DatePicker from "../../../DatePicker";
import CustomTextField from "../../../CustomTextField";
import {
  isEndDateValid,
  updateState,
} from "../../../../../utils/clientFunctions";
import "./style.css";

const CountdownTimerSettings = ({
  setSettingsState,
  settingsState,
  error,
  setError,
}) => {
  // debugger;
  useEffect(() => {
    setError((prevState) =>
      updateState(
        "endDateErr",
        !isEndDateValid(settingsState.generalSettings.countDownEndsAt),
        prevState,
      ),
    );
  }, [settingsState.generalSettings.countDownEndsAt]);


  return (
    <div className="countdown-group">
      <div>
        <DatePicker
          onDatePicked={(date) => {
            setSettingsState((prevState) =>
              updateState("generalSettings.countDownStartAt", date, prevState),
            );
          }}
          initialValue={settingsState.generalSettings.countDownStartAt}
          label={"Countdown starts At"}
        ></DatePicker>
      </div>
      <div>
        <DatePicker
          onDatePicked={(date) => {
            return setSettingsState((prevState) =>
              updateState("generalSettings.countDownEndsAt", date, prevState),
            );
          }}
          initialValue={settingsState.generalSettings.countDownEndsAt}
          label={"Countdown ends At"}
          minValue={settingsState?.generalSettings?.countDownStartAt}
          errorMessage={error.endDateErr ? "Not valid" : false}
        ></DatePicker>
      </div>
      <CustomTextField
        type="text"
        label="Message"
        helpText="Do not remove the #countdown_timer# tag, that's where the timer will be displayed!"
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

export default CountdownTimerSettings;
