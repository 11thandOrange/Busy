import React, { useEffect, useRef, useState } from "react";
import ProductPreviewCard from "../ProductPreviewCard";
import CountdownTimerSettings from "../../atoms/CountdownTimerSettings";

import { Card } from "@shopify/polaris";
import Selector from "../../atoms/Selector";
import SettingsDisplay from "../SettingsDisplay";
import { APP_TYPE, ROUTES } from "../../../utils/constants";
import "./style.css";
import {
  COUNTDOWN_ERROR_STATE,
  COUNTDOWN_TIMER_STATE,
  CUSTOMIZATON_INITIAL_STATE,
} from "../../../constants/countdownTimerCustomization";
import ManageDataChange from "../ManageDataChange";
import { checkError, updateState } from "../../../utils/clientFunctions";
import { useFetcher } from "@remix-run/react";
import useToast from "../../../hooks/useToast";
import ToastBar from "../../atoms/Toast";
import { COLOR_THEME } from "../../../constants/announcementCustomizationConfig";
const CountDownTimerCustomization = ({
  announcementBarType,
  colorTheme = COLOR_THEME.LIGHT,
  initialData,
}) => {
  const fetcher = useFetcher();
  const { showToast, onDismiss } = useToast(fetcher);
  const [settingsState, setSettingsState] = useState({
    ...CUSTOMIZATON_INITIAL_STATE,
  });
  const prevSettingsState = useRef({});
  useEffect(() => {
    if (initialData) {
      setSettingsState(initialData);
      prevSettingsState.current = initialData;
    }
  }, [initialData]);
  const handleOnSave = () => {
    fetcher.submit(
      {
        settings: JSON.stringify(settingsState.settings),
        display: JSON.stringify(settingsState.display),
      },
      {
        method: "POST",
        action: "/apps/countdownTimer",
      },
    );
    prevSettingsState.current = { ...settingsState };
  };

  const [error, setError] = useState({ ...COUNTDOWN_ERROR_STATE });
  useEffect(() => {
    if (settingsState?.settings?.status == COUNTDOWN_TIMER_STATE.FIX_END_DATE) {
      setError((prevState) => updateState("minMaxExp", false, prevState));
    } else if (
      settingsState?.settings?.status == COUNTDOWN_TIMER_STATE.EVERGREEN
    ) {
      setError((prevState) => updateState("endDateErr", false, prevState));
    }
  }, [settingsState?.settings?.status]);
  return (
    <>
      <ToastBar
        onDismiss={onDismiss}
        show={showToast}
        message="Customization saved successfully"
      />
      <div className="customization-container">
        <ManageDataChange
          newState={settingsState}
          prevState={prevSettingsState.current}
          handleSaveChanges={handleOnSave}
          handleDiscardChanges={() => {
            setSettingsState(prevSettingsState.current);
          }}
          fetcherState={fetcher.state}
          isError={checkError(error)}
        />
        <div className="customization-left-section">
          <Card>
            <CountdownTimerSettings
              setError={setError}
              error={error}
              setSettingsState={setSettingsState}
              settingsState={settingsState}
            ></CountdownTimerSettings>
          </Card>
          <Card>
            <SettingsDisplay
              settingsState={settingsState}
              setSettingsState={setSettingsState}
            ></SettingsDisplay>
          </Card>
        </div>
        <div className="customization-right-section">
          <ProductPreviewCard
            setSettingsState={setSettingsState}
            settingsState={settingsState}
            announcementBarType={announcementBarType}
            appType={APP_TYPE.COUNTDOWN_TIMER}
            colorTheme={colorTheme}
          ></ProductPreviewCard>
        </div>
      </div>
    </>
  );
};

export default CountDownTimerCustomization;
