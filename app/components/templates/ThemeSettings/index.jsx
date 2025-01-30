import React, { useEffect } from "react";
import Selector from "../../atoms/Selector";
import CustomColorPallete from "../../atoms/CustomColorPallete";
import { Text } from "@shopify/polaris";
import {
  THEME_SETTINGS_STATUS,
  ThemeStyleGridType,
} from "../../../constants/announcementCustomizationConfig";
import { updateState } from "../../../utils/clientFunctions";

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
            updateState("themeSettings.status", value, prevState),
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
                updateState("themeSettings.backgroundColor", color, prevState),
              );
            }}
            initialColor={settingsState.themeSettings.backgroundColor}
          ></CustomColorPallete>

          <CustomColorPallete
            colorHeading={"Text Color"}
            onColorChange={(color) => {
              setSettingsState((prevState) =>
                updateState("themeSettings.textColor", color, prevState),
              );
            }}
            initialColor={settingsState.themeSettings.textColor}
          ></CustomColorPallete>
        </div>
      )}
    </div>
  );
};

export default ThemeSettings;
