import { Card, DropZone } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import "./style.css";
import DropZoneWithImageFileUpload from "../../../atoms/DropZoneWithImageFileUpload";
import { updateState } from "../../../../utils/clientFunctions";
const EnableGiftWrapStep = ({ settingsState, setSettingsState }) => {
  return (
    <div>
      <Card>
        <DropZoneWithImageFileUpload
          label="Gift Wrap Image (optional; supported image types: gif, jpg and png)"
          onImageUpload={(value) => {
            setSettingsState((prevState) =>
              updateState("giftWrapImage", value, prevState),
            );
          }}
          initalImage={settingsState.giftWrapImage}
        ></DropZoneWithImageFileUpload>
        <div className="priceAndTitle">
          <CustomTextField
            type={"text"}
            label={"Gift Wrap Title"}
            value={settingsState.giftWrapTitle}
            onValueChange={(value) => {
              setSettingsState((prevState) =>
                updateState("giftWrapTitle", value, prevState),
              );
            }}
          ></CustomTextField>

          <CustomTextField
            type={"number"}
            label={"price"}
            min={0}
            step={0.01}
            prefix="$"
            value={settingsState.giftWrapPrice}
            onValueChange={(value) => {
              setSettingsState((prevState) =>
                updateState("giftWrapPrice", value, prevState),
              );
            }}
          ></CustomTextField>
        </div>
        <CustomTextField
          type={"text"}
          label={"Short Description"}
          maxLength={100}
          value={settingsState.giftWrapDescription}
          onValueChange={(value) => {
            setSettingsState((prevState) =>
              updateState("giftWrapDescription", value, prevState),
            );
          }}
        ></CustomTextField>
      </Card>
    </div>
  );
};

export default EnableGiftWrapStep;
