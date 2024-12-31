import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import CustomEmojiPicker from "../../../atoms/CustomEmojiPicker";
import CustomColorPallete from "../../../atoms/CustomColorPallete";
import "./style.css";
import { updateState } from "../../../../utils/clientFunctions";
const GiftCustomization = ({
  settingsState,
  setSettingsState,
  onTextChange = () => {},
  onColorChange = () => {},
  onEmojiChange = () => {},
}) => {
  return (
    <div className="gift-customization-container">
      <CustomTextField
        label={"Text"}
        placeholder="Enter text here"
        value={settingsState.customizationText}
        onValueChange={onTextChange}
      ></CustomTextField>
      <div className="color-emoji-container">
        <CustomColorPallete
          initialColor={settingsState.customizationColor}
          onColorChange={onColorChange}
        ></CustomColorPallete>
        <div>
          <p>Choose an emoji</p>
          <CustomEmojiPicker
            onEmojiClick={onEmojiChange}
            label={settingsState.customizationEmoji}
          ></CustomEmojiPicker>
        </div>
      </div>
    </div>
  );
};

export default GiftCustomization;
