import React, { useState } from "react";
import ProductPreviewCard from "../ProductPreviewCard";
import CountdownTimerSettings from "../../atoms/CountdownTimerSettings";

import { Card } from "@shopify/polaris";
import Selector from "../../atoms/Selector";
import SettingsDisplay from "../SettingsDisplay";
import { APP_TYPE } from "../../../utils/constants";
import "./style.css";
import { CUSTOMIZATON_INITIAL_STATE } from "../../../constants/countdownTimerCustomization";
const CountDownTimerCustomization = ({ announcementBarType }) => {
  const [settingsState, setSettingsState] = useState({
    ...CUSTOMIZATON_INITIAL_STATE,
  });

  return (
    <div className="customization-container">
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
        ></ProductPreviewCard>
      </div>
    </div>
  );
};

export default CountDownTimerCustomization;
