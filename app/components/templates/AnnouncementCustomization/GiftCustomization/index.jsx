import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import CustomEmojiPicker from "../../../atoms/CustomEmojiPicker";
import CustomColorPallete from "../../../atoms/CustomColorPallete";
import "./style.css";
import { updateState } from "../../../../utils/clientFunctions";
const GiftCustomization = ({ settingsState, setSettingsState }) => {
  return (
    <div className="gift-customization-container">
      <CustomTextField
        label={"Text"}
        placeholder="Enter text here"
        value={settingsState.customizationText}
        onValueChange={(value) => {
          setSettingsState((prevState) =>
            updateState("customizationText", value, prevState),
          );
        }}
      ></CustomTextField>
      <div className="color-emoji-container">
        <CustomColorPallete
          initialColor={settingsState.customizationColor}
          onColorChange={(color) => {
            setSettingsState((prevState) =>
              updateState("customizationColor", color, prevState),
            );
          }}
        ></CustomColorPallete>
        <div>
          <p>Choose an emoji</p>
          <CustomEmojiPicker
            onEmojiClick={(emoji) => {
              setSettingsState((prevState) =>
                updateState("customizationEmoji", emoji.emoji, prevState),
              );
            }}
            label={settingsState.customizationEmoji}
          ></CustomEmojiPicker>
        </div>
      </div>
    </div>
  );
};

export default GiftCustomization;
