import { Card, Checkbox, DropZone } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import "./style.css";
import DropZoneWithImageFileUpload from "../../../atoms/DropZoneWithImageFileUpload";
import { updateState } from "../../../../utils/clientFunctions";
import GiftCustomization from "../GiftCustomization";
const EnableGiftWrapStep = ({ settingsState, setSettingsState }) => {
  return (
    <div className="enable-gift-wrap-container">
      <Card>
        <Checkbox
          label="Enable Gift Wrap"
          checked={settingsState.enableGiftWrap}
          onChange={(value) => {
            console.log("onchanging", value);

            setSettingsState((prevState) =>
              updateState("enableGiftWrap", value, prevState),
            );
          }}
        ></Checkbox>
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
      <Card>
        <GiftCustomization
          onColorChange={(color) => {
            setSettingsState((prevState) =>
              updateState("giftWrapCustomizationColor", color, prevState),
            );
          }}
          onTextChange={(text) => {
            setSettingsState((prevState) =>
              updateState("giftWrapCustomizationText", text, prevState),
            );
          }}
          onEmojiChange={(emojiData) => {
            setSettingsState((prevState) =>
              updateState(
                "giftWrapCustomizationEmoji",
                emojiData.emoji,
                prevState,
              ),
            );
          }}
          setSettingsState={setSettingsState}
          settingsState={{
            customizationText: settingsState.giftWrapCustomizationText,
            customizationColor: settingsState.giftWrapCustomizationColor,
            customizationEmoji: settingsState.giftWrapCustomizationEmoji,
          }}
        ></GiftCustomization>
      </Card>
    </div>
  );
};

export default EnableGiftWrapStep;
