import { Button, Card, Checkbox, Text } from "@shopify/polaris";
import React from "react";
import ToggleButtons from "../../../atoms/ToggleButtons";
import { updateState } from "../../../../utils/clientFunctions";

const EnableAppToggles = {
  Enable_Later: { name: "Enable Later", id: 0 },
  Enable_Now: { name: "Enable Now", id: 1 },
};

const EnableInShopifyStep = ({ setSettingsState, tabId, settingsState }) => {
  const toggleButtons = Object.values(EnableAppToggles);
  return (
    <div>
      <Card>
        <Text>
          Your Announcement Bar Wont Show Up In Your Store Yet! You must enable
          it in the Shopify Theme Editor.
        </Text>
        {/* <ToggleButtons
          buttons={toggleButtons}
          onToggle={(app) => {
            if (EnableAppToggles.Enable_Now.id === app.id) {
              setSettingsState((prevState) =>
                updateState("enableAppInShopify", true, prevState),
              );
            } else {
              setSettingsState((prevState) =>
                updateState("enableAppInShopify", false, prevState),
              );
            }
          }}
        /> */}
        <Button
          variant="primary"
          onClick={() => {
            console.log("on click view in theme editor");
          }}
        >
          View In Theme Editor
        </Button>
        <Checkbox
          label="Enable later"
          onChange={(value) => {
            setSettingsState((prevState) =>
              updateState("enableAppInShopifyLater", value, prevState),
            );
          }}
          checked={settingsState.enableAppInShopifyLater || false}
        ></Checkbox>
      </Card>
    </div>
  );
};

export default EnableInShopifyStep;
