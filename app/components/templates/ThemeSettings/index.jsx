import React, { useEffect } from "react";
import Selector from "../../atoms/Selector";
import CustomColorPallete from "../../atoms/CustomColorPallete";
import { Text } from "@shopify/polaris";
import {
  THEME_SETTINGS_STATUS,
  ThemeStyleGridType,
} from "../../../constants/announcementCustomizationConfig";
import { updateSettingsState } from "../../../utils/clientFunctions";

const ThemeSettings = ({ setSettingsState, settingsState }) => {
  const themeOptions = [
    { label: "Top relative", value: THEME_SETTINGS_STATUS.TOP_RELATIVE },
    { label: "Top fixed", value: THEME_SETTINGS_STATUS.TOP_FIXED },
    { label: "Bottom", value: THEME_SETTINGS_STATUS.BOTTOM },
  ];
  return (
    <div>
      <div className="general-settings-header">
        <Text variant="bodyMd" fontWeight="bold" as="span">
          Theme Settings
        </Text>
      </div>
      <Selector
        onSelect={(value) => {
          setSettingsState((prevState) =>
            updateSettingsState("themeSettings.status", value, prevState),
          );
        }}
        options={themeOptions}
        label="Status"
        initialValue={settingsState.themeSettings.status}
        helpText="The announcement bar is displayed before/above the page content. When scrolling down, the announcement bar will not be visible anymore."
      ></Selector>

      {settingsState.themeStyle.type == ThemeStyleGridType.COLOR && (
        <div>
          <CustomColorPallete
            colorHeading={"Background Color"}
            onColorChange={(color) => {
              setSettingsState((prevState) =>
                updateSettingsState(
                  "themeSettings.backgroundColor",
                  color,
                  prevState,
                ),
              );
            }}
            initialColor={settingsState.themeSettings.backgroundColor}
          ></CustomColorPallete>

          <CustomColorPallete
            colorHeading={"Text Color"}
            onColorChange={(color) => {
              setSettingsState((prevState) =>
                updateSettingsState(
                  "themeSettings.textColor",
                  color,
                  prevState,
                ),
              );
            }}
            initialColor={settingsState.themeSettings.textColor}
          ></CustomColorPallete>
          <CustomColorPallete
            colorHeading={"Special Color"}
            initialColor={settingsState.themeSettings.specialColor}
          ></CustomColorPallete>
        </div>
      )}
    </div>
  );
};

export default ThemeSettings;
