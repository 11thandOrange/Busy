import React from "react";
import DatePicker from "../DatePicker";
import {
  isEndDateValid,
  updateSettingsState,
} from "../../../utils/clientFunctions";
import CustomTextField from "../CustomTextField";
import Selector from "../Selector";
import { COUNTDOWN_TIMER_STATE } from "../../../constants/countdownTimerCustomization";
import { Text } from "@shopify/polaris";
const options = [
  { label: "Fix End Date", value: COUNTDOWN_TIMER_STATE.FIX_END_DATE },
  { label: "Evergreen", value: COUNTDOWN_TIMER_STATE.EVERGREEN },
];

const CountdownTimerSettings = ({ setSettingsState, settingsState }) => {
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
            console.log("On select", value);
          }}
          initialValue={settingsState.settings.status}
        ></Selector>
        <DatePicker
          onDatePicked={(date) => {
            setSettingsState((prevState) =>
              updateSettingsState("settings.countDownStartAt", date, prevState),
            );
          }}
          label={"Countdown starts At"}
        ></DatePicker>
      </div>
      <div>
        <DatePicker
          onDatePicked={(date) => {
            return setSettingsState((prevState) =>
              updateSettingsState("settings.countDownEndsAt", date, prevState),
            );
          }}
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
    </div>
  );
};

export default CountdownTimerSettings;
