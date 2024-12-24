import { Card, RadioButton, Text } from "@shopify/polaris";
import React from "react";
import { updateState } from "../../../../utils/clientFunctions";
import "./style.css";

const EnableAppStep = ({ setSettingsState, settingsState }) => {
  return (
    <div className="enable-app-step">
      
      <Card>
        <div className="step-title">Enable App</div>

        <>
          <RadioButton
            label="Enable Now"
            checked={settingsState.enableApp}
            id="Enable_Now"
            name="enableApp"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState("enableApp", value, prevState),
              );
            }}
          />
          <RadioButton
            label="Enable Later"
            checked={!settingsState.enableApp}
            id="Enable_Later"
            name="enableApp"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState("enableApp", !value, prevState),
              );
            }}
          />
        </>
      </Card>
    </div>
  );
};

export default EnableAppStep;
