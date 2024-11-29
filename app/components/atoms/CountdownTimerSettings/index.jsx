import React, { useCallback } from "react";
import DatePicker from "../DatePicker";
import { isEndDateValid, updateState } from "../../../utils/clientFunctions";
import CustomTextField from "../CustomTextField";
import Selector from "../Selector";
import { COUNTDOWN_TIMER_STATE } from "../../../constants/countdownTimerCustomization";
import { Text } from "@shopify/polaris";
import InputDatePicker from "../InputDatePicker";
import EvergreenDatePicker from "../EvergreenDatePicker";
const options = [
  { label: "Fix End Date", value: COUNTDOWN_TIMER_STATE.FIX_END_DATE },
  { label: "Evergreen", value: COUNTDOWN_TIMER_STATE.EVERGREEN },
];

const CountdownTimerSettings = ({
  setSettingsState,
  settingsState,
  setError,
  error,
}) => {
  const renderTimer = useCallback(() => {
    switch (settingsState.settings.status) {
      case COUNTDOWN_TIMER_STATE.FIX_END_DATE:
        return (
          <div>
            <DatePicker
              onDatePicked={(date) => {
                setSettingsState((prevState) =>
                  updateState("settings.countDownStartAt", date, prevState),
                );
              }}
              initialValue={settingsState.settings.countDownStartAt}
              label={"Countdown starts At"}
            ></DatePicker>
            <DatePicker
              onDatePicked={(date) => {
                return setSettingsState((prevState) =>
                  updateState("settings.countDownEndsAt", date, prevState),
                );
              }}
              initialValue={settingsState.settings.countDownEndsAt}
              label={"Countdown ends At"}
              settingsState={settingsState}
              minValue={settingsState.settings.countDownStartAt}
              errorMessage={
                isEndDateValid(settingsState.settings.countDownEndsAt)
                  ? false
                  : "Not valid"
              }
            ></DatePicker>
          </div>
        );
      case COUNTDOWN_TIMER_STATE.EVERGREEN:
        return (
          <EvergreenDatePicker
            setError={setError}
            setSettingsState={setSettingsState}
            settingsState={settingsState}
            error={error}
          ></EvergreenDatePicker>
        );
    }
  }, [settingsState, error]);
  const handleSelectChange = (key, value) => {
    setSettingsState((prevState) => updateState(key, value, prevState));
  };
  return (
    <div>
      <div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            Settings
          </Text>
        </div>
        <Selector
          options={options}
          label="Status"
          onSelect={(value) => {
            handleSelectChange("settings.status", value);
          }}
          initialValue={settingsState.settings.status}
        ></Selector>
      </div>
      {renderTimer()}
    </div>
  );
};

export default CountdownTimerSettings;
