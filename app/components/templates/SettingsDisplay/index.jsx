import React, { useCallback, useState } from "react";
import Selector from "../../atoms/Selector";
import CustomTextField from "../../atoms/CustomTextField";
import CustomColorPallete from "../../atoms/CustomColorPallete";
import { Checkbox, Text } from "@shopify/polaris";
import {
  COUNTDOWN_TIMER_DISPLAY_FORMAT,
  TIMER_ALIGNMENT_OPTIONS,
} from "../../../constants/countdownTimerCustomization";
import { updateSettingsState } from "../../../utils/clientFunctions";
import "./style.css";

const SettingsDisplay = ({ setSettingsState, settingsState }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );

  const handleSelectChange = (key, value) => {
    setSettingsState((prevState) => updateSettingsState(key, value, prevState));
  };

  const options = [
    { label: "Classic", value: COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC },
    {
      label: "Hexagon Timer",
      value: COUNTDOWN_TIMER_DISPLAY_FORMAT.HEXAGON_TIMER,
    },
    {
      label: "Progress Circles",
      value: COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_CIRCLES,
    },
    { label: "Cards", value: COUNTDOWN_TIMER_DISPLAY_FORMAT.CARDS },
    { label: "Moderns", value: COUNTDOWN_TIMER_DISPLAY_FORMAT.MODERNS },
    {
      label: "Progress Bar",
      value: COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_BAR,
    },
    { label: "Minimalist", value: COUNTDOWN_TIMER_DISPLAY_FORMAT.MINIMALIST },
  ];

  const timerAlignmentOptions = [
    { label: "Left", value: TIMER_ALIGNMENT_OPTIONS.LEFT },
    { label: "Center", value: TIMER_ALIGNMENT_OPTIONS.CENTER },
    { label: "Right", value: TIMER_ALIGNMENT_OPTIONS.RIGHT },
  ];

  return (
    <div>
      <Text variant="bodyMd" fontWeight="bold" as="span">
        Display
      </Text>

      <Checkbox
        label="Only show the countdown timer for products that are currently discounted"
        checked={checked}
        onChange={handleCheckboxChange}
      />

      <div className="display-child">
        <Selector
          options={options}
          label="Theme"
          helpText="You can select one out of the 7 themes."
          onSelect={(value) => {
            handleSelectChange("display.theme", value);
          }}
        />
      </div>

      <div className="display-child">
        <Selector
          options={timerAlignmentOptions}
          label="Timer Alignment"
          onSelect={(value) =>
            handleSelectChange("display.timerAlignment", value)
          }
          initialValue={settingsState.display.timerAlignment}
        />
      </div>

      <div className="display-child">
        <CustomTextField
          type="text"
          label="Title"
          onValueChange={(value) => handleSelectChange("display.title", value)}
          value={settingsState.display.title}
        />
      </div>

      <div className="display-child color-pallete-container">
        <div className="color-pallete-child-1">
          <CustomColorPallete
            colorHeading="Title Color"
            onColorChange={(color) =>
              handleSelectChange("display.titleColor", color)
            }
            initialColor={settingsState.display.titleColor}
          />
          <CustomColorPallete
            colorHeading="Digits Color"
            onColorChange={(color) =>
              handleSelectChange("display.digitsColor", color)
            }
            initialColor={settingsState.display.digitsColor}
          />
        </div>
        <CustomColorPallete
          colorHeading="Background Color"
          onColorChange={(color) =>
            handleSelectChange("display.backgroundColor", color)
          }
          initialColor={settingsState.display.backgroundColor}
        />
      </div>
    </div>
  );
};

export default SettingsDisplay;
