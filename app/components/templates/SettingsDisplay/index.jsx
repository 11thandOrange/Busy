import React, { useCallback, useState } from "react";
import Selector from "../../atoms/Selector";
import CustomTextField from "../../atoms/CustomTextField";
import CustomColorPallete from "../../atoms/CustomColorPallete";
import { Checkbox, Text } from "@shopify/polaris";
import {
  COUNTDOWN_TIMER_DISPLAY_FORMAT,
  TIMER_ALIGNMENT_OPTIONS,
} from "../../../constants/countdownTimerCustomization";
import { updateState } from "../../../utils/clientFunctions";
import "./style.css";
import InputWithSelector from "../../atoms/InputWithSelector";

const SettingsDisplay = ({ setSettingsState, settingsState }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );

  const handleSelectChange = (key, value) => {
    setSettingsState((prevState) => updateState(key, value, prevState));
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
  const renderColorPallete = () => {
    switch (settingsState.display.theme) {
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CARDS:
        return (
          <CustomColorPallete
            colorHeading="Background Color"
            onColorChange={(color) =>
              handleSelectChange("display.backgroundColor", color)
            }
            initialColor={settingsState.display.backgroundColor}
          />
        );
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.CLASSIC:
        return <></>;
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.HEXAGON_TIMER:
        return (
          <CustomColorPallete
            colorHeading="Border Color"
            onColorChange={(color) =>
              handleSelectChange("display.borderColor", color)
            }
            initialColor={settingsState.display.borderColor}
          />
        );
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MINIMALIST:
        return (
          <CustomColorPallete
            colorHeading="Border Color"
            onColorChange={(color) =>
              handleSelectChange("display.borderColor", color)
            }
            initialColor={settingsState.display.borderColor}
          />
        );
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.MODERNS:
        return (
          <>
            <CustomColorPallete
              colorHeading="Gradient Start Color"
              onColorChange={(color) =>
                handleSelectChange("display.gradientStartColor", color)
              }
              initialColor={settingsState.display.gradientStartColor}
            />
            <CustomColorPallete
              colorHeading="Gradient End Color"
              onColorChange={(color) =>
                handleSelectChange("display.gradientEndColor", color)
              }
              initialColor={settingsState.display.gradientEndColor}
            />
          </>
        );
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_BAR:
        return (
          <CustomColorPallete
            colorHeading="Background Color"
            onColorChange={(color) =>
              handleSelectChange("display.backgroundColor", color)
            }
            initialColor={settingsState.display.backgroundColor}
          />
        );
      case COUNTDOWN_TIMER_DISPLAY_FORMAT.PROGRESS_CIRCLES:
        return (
          <CustomColorPallete
            colorHeading="Border Color"
            onColorChange={(color) =>
              handleSelectChange("display.borderColor", color)
            }
            initialColor={settingsState.display.borderColor}
          />
        );
    }
  };
  return (
    <div>
      <Text variant="bodyMd" fontWeight="bold" as="span">
        Display
      </Text>

      <Checkbox
        label="Only show the countdown timer for products that are currently discounted"
        checked={settingsState.display.timerForDiscountedProducts}
        onChange={(value) => {
          handleSelectChange("display.timerForDiscountedProducts", value);
        }}
      />

      <div className="display-child">
        <Selector
          options={options}
          label="Theme"
          helpText="You can select one out of the 7 themes."
          onSelect={(value) => {
            handleSelectChange("display.theme", value);
          }}
          initialValue={settingsState.display.theme}
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
        {renderColorPallete()}

        <div className="input-selector-container">
          <span>margin</span>
          <InputWithSelector
            inputType="number"
            title="Bottom"
            inputValue={settingsState.display.margin.bottom.value}
            unitValue={settingsState.display.margin.bottom.unit}
            onValueChange={(value, unit) => {
              handleSelectChange("display.margin.bottom.value", value);
              handleSelectChange("display.margin.bottom.unit", unit);
            }}
          ></InputWithSelector>
          <InputWithSelector
            inputType="number"
            title="Top"
            inputValue={settingsState.display.margin.top.value}
            unitValue={settingsState.display.margin.top.unit}
            onValueChange={(value, unit) => {
              handleSelectChange("display.margin.top.value", value);
              handleSelectChange("display.margin.top.unit", unit);
            }}
          ></InputWithSelector>
        </div>
      </div>

      {/* <InputWithSelector
        inputType={"text"}
        title={"Top"}
        inputValue={settingsState.display.margin.top.value}
        unitValue={settingsState.display.margin.top.unit}
        onValueChange={(value, unit) => {
          console.log("Value unit here", value, unit);
        }}
      ></InputWithSelector> */}
    </div>
  );
};

export default SettingsDisplay;
