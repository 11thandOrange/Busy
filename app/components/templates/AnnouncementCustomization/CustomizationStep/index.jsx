import React, { useCallback } from "react";
import {
  ANNOUNCEMENT_BAR_TYPES,
  STATUS,
} from "../../../../constants/announcementCustomizationConfig";
import { Card, Text } from "@shopify/polaris";
import Selector from "../../../atoms/Selector";
import CustomTextField from "../../../atoms/CustomTextField";
import { updateState } from "../../../../utils/clientFunctions";
import ThemeStyleGrid from "../../ThemeStyleGrid";
import ThemeSettings from "../../ThemeSettings";
import GeneralSettings from "../../../atoms/GeneralSettings/announcementBars/Text";
import FreeShippingSettings from "../../../atoms/generalSettings/announcementBars/FreeShipping";
import OrderCounterSettings from "../../../atoms/generalSettings/announcementBars/OrderCounter";
import CountdownTimerSettings from "../../../atoms/generalSettings/announcementBars/CountdownTimer";
import EmailCaptureSettings from "../../../atoms/generalSettings/announcementBars/EmailCapture";

const options = [
  { label: "Active", value: STATUS.ACTIVE },
  { label: "Inactive", value: STATUS.INACTIVE },
];
const CustomizationStep = ({
  settingsState,
  setSettingsState,
  error,
  setError,
  announcementBarType,
  tabId
}) => {
  const selectGeneralSettings = useCallback(() => {
    switch (announcementBarType) {
      case ANNOUNCEMENT_BAR_TYPES.TEXT:
        return (
          <GeneralSettings
            setSettingsState={setSettingsState}
            settingsState={settingsState}
          ></GeneralSettings>
        );
      case ANNOUNCEMENT_BAR_TYPES.FREE_SHIPPING:
        return (
          <FreeShippingSettings
            setSettingsState={setSettingsState}
            settingsState={settingsState}
          ></FreeShippingSettings>
        );
      case ANNOUNCEMENT_BAR_TYPES.ORDERS_COUNTER:
        return (
          <OrderCounterSettings
            setSettingsState={setSettingsState}
            settingsState={settingsState}
          ></OrderCounterSettings>
        );
      case ANNOUNCEMENT_BAR_TYPES.COUNTDOWN_TIMER:
        return (
          <CountdownTimerSettings
            setSettingsState={setSettingsState}
            settingsState={settingsState}
            error={error}
            setError={setError}
          ></CountdownTimerSettings>
        );
      case ANNOUNCEMENT_BAR_TYPES.EMAIL_CAPTURE:
        return (
          <EmailCaptureSettings
            setSettingsState={setSettingsState}
            settingsState={settingsState}
          ></EmailCaptureSettings>
        );

      default:
        break;
    }
  }, [settingsState, ANNOUNCEMENT_BAR_TYPES, error]);
  return (
    <>
      <Card>
        <Selector
          options={options}
          label="Status"
          helpText="Only one announcement bar will be displayed at the time"
          onSelect={(value) => {
            setSettingsState((prevState) =>
              updateState("status", value, prevState),
            );
          }}
          initialValue={settingsState.status}
        ></Selector>
      </Card>
      <Card>
        <CustomTextField
          type="text"
          label="Name"
          helpText="The private name of this smart bar. Only you will see this."
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("name", value, prevState),
            );
          }}
          value={settingsState.name}
        ></CustomTextField>
      </Card>
      <Card>
        <div className="general-settings-header">
          <Text variant="bodyMd" fontWeight="bold" as="span">
            General Settings
          </Text>
        </div>
        {selectGeneralSettings()}
      </Card>
      <Card>
        <ThemeStyleGrid
          onThemeSelected={(value, type, image) => {
            setSettingsState((prevState) =>
              updateState(
                "themeStyle",
                { id: value, type: type, image: image },
                prevState,
              ),
            );
          }}
          selectedTheme={settingsState.themeStyle.id}
        ></ThemeStyleGrid>
      </Card>
      <Card>
        <ThemeSettings
          setSettingsState={setSettingsState}
          settingsState={settingsState}
        ></ThemeSettings>
      </Card>
    </>
  );
};

export default CustomizationStep;
