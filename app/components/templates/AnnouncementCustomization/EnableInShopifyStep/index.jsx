import { Button, Card, Checkbox, Text } from "@shopify/polaris";
import React from "react";
import ToggleButtons from "../../../atoms/ToggleButtons";
import { updateState } from "../../../../utils/clientFunctions";
import ImageRenderer from "../../../atoms/ImageRenderer";
import IMAGES from "../../../../utils/Images";
import "./style.css"
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
        <Text>
          Your Announcement Bar Wont Show Up In Your Store Yet! You must enable
          it in the Shopify Theme Editor.
        </Text>
        <div className="button-container">
        <Button
          variant="primary"
          onClick={() => {
            console.log("appActivationInStoreLink", enableAppInStoreURL);

            window.open(enableAppInStoreURL, "_blank");
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
        </div>
        <div className="text-container">
          <Text>How to Enable app :</Text>
        </div>
        <div className="image-container">
          <ImageRenderer src={IMAGES.shoeDiscount}></ImageRenderer>
        </div>
        <div className="link-container">
          <a href="#">How to Enable app in shopify store</a>
        </div>
      </Card>
    </div>
  );
};

export default EnableInShopifyStep;
