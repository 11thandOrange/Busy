import { Button, Card, Checkbox, Text } from "@shopify/polaris";
import React from "react";
import ToggleButtons from "../../../atoms/ToggleButtons";
import { updateState } from "../../../../utils/clientFunctions";
import ImageRenderer from "../../../atoms/ImageRenderer";
import IMAGES from "../../../../utils/Images";
import "./style.css";
import { APP_LINKS } from "../../../../utils/constants";
const EnableAppToggles = {
  Enable_Later: { name: "Enable Later", id: 0 },
  Enable_Now: { name: "Enable Now", id: 1 },
};

const EnableInShopifyStep = ({
  setSettingsState,
  tabId,
  settingsState,
  enableAppInStoreURL,
}) => {
  const toggleButtons = Object.values(EnableAppToggles);
  return (
    <div className="Announcement-box">
      <Card>
        <Text>Your Announcement Bar Won’t Show Up In Your Store Yet!</Text>
        <p className="desc">
          Complete Install & Your BusyBuddy Apps Will Show On Your Store. You
          will only need to complete this step once
        </p>
        <div className="button-container">
          <Button
            variant="primary"
            onClick={() => {
              console.log("appActivationInStoreLink", enableAppInStoreURL);

              window.open(enableAppInStoreURL, "_blank");
            }}
          >
            Enable In Your Theme Editor
          </Button>
        </div>

        <div className="image-container">
          <ImageRenderer src={IMAGES.AppInstall}></ImageRenderer>
        </div>
        <div className="link-foot">
          <Checkbox
            label="Enable later"
            onChange={(value) => {
              setSettingsState((prevState) =>
                updateState("enableAppInShopifyLater", value, prevState),
              );
            }}
            checked={settingsState.enableAppInShopifyLater || false}
          />
          <div className="link-container">
            <a href={APP_LINKS.HOW_TO_ENABLE_LINK} target="_blank">
              How To Enable BusyBuddy In Your Shopify Store
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnableInShopifyStep;
