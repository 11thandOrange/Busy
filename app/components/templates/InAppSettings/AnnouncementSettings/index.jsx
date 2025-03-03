import React, { useEffect, useRef, useState } from "react";

import { Checkbox, Layout } from "@shopify/polaris";

import { useFetcher } from "@remix-run/react";
import ManageDataChange from "../../ManageDataChange";
import { FETCHER_STATE, ROUTES } from "../../../../utils/constants";
import SettingSection from "../../GlobalSettings/SettingSection";
import ToastBar from "../../../atoms/Toast";
import { isLoading } from "../../../../utils/clientFunctions";
import useToast from "../../../../hooks/useToast";
import "./style.css"
const AnnouncementSettings = ({ initialData }) => {
  const fetcher = useFetcher();
  const { showToast, onDismiss } = useToast(fetcher);

  const [settings, setSettings] = useState({
    enableCloseButton: false,
    // enableBotFilter: false,
  });
  const oldSettingRef = useRef({
    enableCloseButton: false,
  });
  useEffect(() => {
    if (initialData) {
      const data = { enableCloseButton: initialData.enable_close_button };
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
        <ToastBar
          onDismiss={onDismiss}
          show={showToast}
          message="Settings saved"
        />
        <ManageDataChange
          newState={settings}
          prevState={oldSettingRef.current}
          handleSaveChanges={handleSaveSettingsData}
          handleDiscardChanges={handleDiscardChanges}
          fetcherState={fetcher.state}
        />
        <SettingSection heading={"Global Settings"}>
          <Checkbox
            label="Enable close button"
            helpText="Enable this setting if you want to allow your customers to be able to close the bar while navigating the store."
            checked={settings.enableCloseButton}
            onChange={(value) =>
              updateCustomization("enableCloseButton", value)
            }
          />
          {/* <Checkbox
            label="Enable bot filter (CAPTCHA)"
            helpText="If enabled, user behavior will be validated with a CAPTCHA solution to ensure lead validity."
            checked={settings.enableBotFilter}
            onChange={(value) => updateCustomization("enableBotFilter", value)}
          /> */}
        </SettingSection>
      </Layout>
    </div>
  );
};

export default AnnouncementSettings;
