import React, { useCallback } from "react";
import DatePicker from "../DatePicker";
import {
  isEndDateValid,
  updateSettingsState,
} from "../../../utils/clientFunctions";
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

const CountdownTimerSettings = ({ setSettingsState, settingsState }) => {
 

  const renderTimer = useCallback(() => {
    switch (settingsState.settings.status) {
      case COUNTDOWN_TIMER_STATE.FIX_END_DATE:
        return (
          <div>
            <DatePicker
              onDatePicked={(date) => {
                setSettingsState((prevState) =>
                  updateSettingsState(
                    "settings.countDownStartAt",
                    date,
                    prevState,
                  ),
                );
              }}
              initialValue={settingsState.settings.countDownStartAt}
              label={"Countdown starts At"}
            ></DatePicker>
            <DatePicker
              onDatePicked={(date) => {
                return setSettingsState((prevState) =>
                  updateSettingsState(
                    "settings.countDownEndsAt",
                    date,
                    prevState,
                  ),
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
         <EvergreenDatePicker setSettingsState={setSettingsState} settingsState={settingsState} ></EvergreenDatePicker>
        );
    }
  }, [settingsState]);
  const handleSelectChange = (key, value) => {
    setSettingsState((prevState) => updateSettingsState(key, value, prevState));
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
