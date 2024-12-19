import { Card, Text } from "@shopify/polaris";
import React from "react";
import ToggleButtons from "../../../atoms/ToggleButtons";
import { updateState } from "../../../../utils/clientFunctions";

const EnableAppToggles = {
  Enable_Later: { name: "Enable Later", id: 0 },
  Enable_Now: { name: "Enable Now", id: 1 },
};

const EnableAppStep = ({ setSettingsState, tabId }) => {
  const toggleButtons = Object.values(EnableAppToggles);
  return (
    <div>
      <Card>
        <Text>Enable App</Text>
        <ToggleButtons
          buttons={toggleButtons}
          onToggle={(app) => {
            if (EnableAppToggles.Enable_Now.id === app.id) {
              setSettingsState((prevState) =>
                updateState("enableApp", true, prevState),
              );
            } else {
              setSettingsState((prevState) =>
                updateState("enableApp", false, prevState),
              );
            }
          }}
        />
      </Card>
    </div>
  );
};

export default EnableAppStep;
