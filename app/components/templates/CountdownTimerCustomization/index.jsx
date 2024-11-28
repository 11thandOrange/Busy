import React, { useRef, useState } from "react";
import ProductPreviewCard from "../ProductPreviewCard";
import CountdownTimerSettings from "../../atoms/CountdownTimerSettings";

import { Card } from "@shopify/polaris";
import Selector from "../../atoms/Selector";
import SettingsDisplay from "../SettingsDisplay";
import { APP_TYPE } from "../../../utils/constants";
import "./style.css";
import { CUSTOMIZATON_INITIAL_STATE } from "../../../constants/countdownTimerCustomization";
import ManageDataChange from "../ManageDataChange";
const   CountDownTimerCustomization = ({
  announcementBarType,
  colorTheme = COLOR_THEME.LIGHT,
}) => {
  const [settingsState, setSettingsState] = useState({
    ...CUSTOMIZATON_INITIAL_STATE,
  });
  const prevSettingsState = useRef({
    ...CUSTOMIZATON_INITIAL_STATE,
  });
  const handleOnSave = () => {
    prevSettingsState.current = { ...settingsState };
  };
  return (
    <div className="customization-container">
      <ManageDataChange
        newState={settingsState}
        prevState={prevSettingsState.current}
        handleSaveChanges={handleOnSave}
        handleDiscardChanges={() => {
          setSettingsState(prevSettingsState.current);
        }}
        // fetcherState={fetcher.state}
      />
      <div className="customization-left-section">
        <Card>
          <CountdownTimerSettings
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
  );
};

export default CountDownTimerCustomization;
