import React, { useEffect, useRef, useState } from "react";

import { Checkbox, Layout } from "@shopify/polaris";

import { useFetcher } from "@remix-run/react";
import ManageDataChange from "../../ManageDataChange";
import { ROUTES } from "../../../../utils/constants";
import SettingSection from "../../GlobalSettings/SettingSection";
import CustomTextField from "../../../atoms/CustomTextField";

const InActiveTabSettings = ({ initialData }) => {
  const fetcher = useFetcher();
  const [settings, setSettings] = useState({
    message: "",
    // enableBotFilter: false,
  });
  const oldSettingRef = useRef({
    message: "",
  });
  useEffect(() => {
    if (initialData) {
      const data = { enableCloseButton: initialData.message };
      setSettings(data);
      oldSettingRef.current = data;
    }
  }, [initialData]);

  const handleSaveSettingsData = () => {
    fetcher.submit(
      {
        enable_close_button: settings.enableCloseButton,
        _action: "SETTING_CREATE",
      },
      { method: "POST", action: ROUTES.ANNOUNCEMENT_OVERVIEW },
    );
  };

  const handleDiscardChanges = () => {
    setSettings(oldSettingRef.current);
  };
  const updateCustomization = (field, value) => {
    setSettings((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div>
      <Layout>
        <ManageDataChange
          newState={settings}
          prevState={oldSettingRef.current}
          handleSaveChanges={handleSaveSettingsData}
          handleDiscardChanges={handleDiscardChanges}
          fetcherState={fetcher.state}
        />
        <SettingSection heading={"Settings"}>
          <CustomTextField
            helpText={
              "The message that will show in the browser tab's title when the visitor changes to another tab."
            }
            label={"Message"}
            type={"text"}
            value={"Don't forget this..."}
            onValueChange={(value) => updateCustomization("message", value)}
          ></CustomTextField>
        </SettingSection>
      </Layout>
    </div>
  );
};

export default InActiveTabSettings;
