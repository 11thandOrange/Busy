import { Card, RadioButton, Text } from "@shopify/polaris";
import React from "react";
import { updateState } from "../../../../utils/clientFunctions";
import "./style.css";
import IMAGES from "../../../../utils/Images";

const EnableAppStep = ({ setSettingsState, settingsState }) => {
  return (
    <div className="enable-app-step">
      
      <Card>
        <div className="step-title">The Announcement Bar app is currently inactive</div>

        <div className="step-content">
          <RadioButton
            label="Activate Now"
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
            label="Activate Later"
            checked={!settingsState.enableApp}
            id="Enable_Later"
            name="enableApp"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState("enableApp", !value, prevState),
              );
            }}
          />
          <video src={IMAGES.ActivateApp} height={200} width={400} autoPlay={true} controls={false}/>
        </div>
      </Card>
    </div>
  );
};

export default EnableAppStep;
