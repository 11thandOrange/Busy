import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Page, Text } from "@shopify/polaris";
import { useFetcher, useNavigate } from "@remix-run/react";

import Selector from "../../atoms/Selector";
import CustomTextField from "../../atoms/CustomTextField";
import ThemeStyleGrid from "../ThemeStyleGrid";
import ProductPreviewCard from "../ProductPreviewCard";
import ThemeSettings from "../ThemeSettings";
import GeneralSettings from "../../atoms/GeneralSettings/announcementBars/Text";
import Toast from "../../atoms/Toast";
import ManageDataChange from "../ManageDataChange";
import StepsRenderer from "../StepsRenderer";
import CustomizationStep from "./CustomizationStep";
import EnableAppStep from "./EnableAppStep";
import EnableInShopifyStep from "./EnableInShopifyStep";
import ReviewStep from "./ReviewStep";

import {
  ANNOUNCEMENT_BAR_INITIAL_STATE,
  ANNOUNCEMENT_BAR_TYPES,
  ANNOUNCEMENT_BARS_ERROR_STATE,
  ANNOUNCEMENT_BARS_TABS,
  COLOR_THEME,
  SETTINGS_INITIAL_STATE,
  STATUS,
} from "../../../constants/announcementCustomizationConfig";

import { isLoading, checkError } from "../../../utils/clientFunctions";
import { APP_TYPE, ROUTES } from "../../../utils/constants";

import "./Settings.css";
import CustomSpinner from "../../atoms/Spinner";

const AnnouncementCustomization = ({
  announcementBarType,
  header = "Customization",
  backActionRoute = ROUTES.APPS,
  initialData,
  colorTheme = COLOR_THEME.LIGHT,
  appActivationState = null,
}) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  // State Management
  const generalSettings = ANNOUNCEMENT_BAR_INITIAL_STATE[announcementBarType];
  const [settingsState, setSettingsState] = useState({
    ...SETTINGS_INITIAL_STATE,
    ...generalSettings,
  });
  const prevSettingsState = useRef({});
  const [error, setError] = useState({ ...ANNOUNCEMENT_BARS_ERROR_STATE });
  const [showLoader, setShowLoader] = useState(true);
  const [selectedStep, setSelectedStep] = useState(0);
  const [toastConfig, setToastConfig] = useState({
    isError: false,
    message: "",
  });
  const editButtonsList = [
    {
      id: 0,
      title: "Customize Appearance",
      data: {
        "Announcement Bar Active": (
          settingsState.status == STATUS.ACTIVE
        ).toString(),
      },
    },
    {
      id: 1,
      title: "Activate App",
      data: {
        "Announcement Bar App":
          settingsState.enableApp == true ? "true" : "false",
      },
    },
    {
      id: 2,
      title: "Complete BusyBuddy Install",
      data: {
        "Enable Later": settingsState.enableAppInShopifyLater
          ? "true"
          : "false",
      },
    },
  ];
  const filteredButtonsList = editButtonsList.filter((btn) => {
    return !(
      (btn.id === 1 && appActivationState?.enableApp) ||
      (btn.id === 2 && appActivationState?.enableAppInStore)
    );
  });

  const handleOnSave = () => {
    const payload = {
      name: settingsState.name,
      status: Number(settingsState.status),
      general_setting: JSON.stringify(settingsState.generalSettings),
      theme_style: JSON.stringify(settingsState.themeStyle),
      theme_settings: JSON.stringify(settingsState.themeSettings),
      enable_now: settingsState.enableApp,
      type: announcementBarType,
    };

    fetcher.submit(
      {
        ...payload,
        ...(initialData
          ? { id: initialData.id, _action: "UPDATE" }
          : { _action: "CREATE" }),
      },
      {
        method: "POST",
        action: ROUTES.ANNOUNCEMENT_OVERVIEW,
      },
    );

    prevSettingsState.current = settingsState;
  };
  // Step Configuration
  const steps = [
    {
      id: 0,
      icon: (
        <span role="img" aria-label="icon">
          ✔️
        </span>
      ),
      title: "Customize Appearance",
      description: "Customize announcement bar",
      component: (
        <CustomizationStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
          announcementBarType={announcementBarType}
          error={error}
          setError={setError}
        />
      ),
    },
    {
      id: 1,
      icon: (
        <span role="img" aria-label="icon">
          🎯
        </span>
      ),
      title: "Activate",
      description: "Activate Announcement Bar App",
      component: (
        <EnableAppStep
          setSettingsState={setSettingsState}
          settingsState={settingsState}
        />
      ),
    },
    {
      id: 2,
      icon: (
        <span role="img" aria-label="icon">
          🎨
        </span>
      ),
      title: "Complete BusyBuddy Install",
      description: "Show Your BusyBuddy Apps On Your Store",
      component: (
        <EnableInShopifyStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
          enableAppInStoreURL={
            appActivationState && appActivationState.enableAppInStoreURL
          }
        />
      ),
    },
    {
      id: 3,
      icon: (
        <span role="img" aria-label="icon">
          📄
        </span>
      ),
      title: "Review",
      description: "Review your changes",
      component: (
        <ReviewStep
          settingsState={settingsState}
          enableAppInStore={
            appActivationState && appActivationState.enableAppInStore
          }
          enableApp={appActivationState && appActivationState.enableApp}
          setSelectedStep={setSelectedStep}
          editButtonsList={filteredButtonsList}
          onSaveAndPublish={handleOnSave}
          fetcherState={fetcher.state}
          error={checkError(error)}
          enableAppInStoreURL={
            appActivationState && appActivationState.enableAppInStoreURL
          }
        />
      ),
    },
  ];

  // Initialize State with Initial Data
  useEffect(() => {
    if (initialData) {
      setSettingsState(initialData);
      setShowLoader(false);
      prevSettingsState.current = initialData;
    }
  }, [initialData]);

  // Handle Save Action

  // Navigate Back on Successful Save
  useEffect(() => {
    if (!isLoading(fetcher.state) && fetcher.data) {
      setSelectedStep(0);
      if (fetcher.data.success) {
        setToastConfig({ isError: false, message: fetcher.data.message });
      } else {
        setToastConfig({ isError: true, message: fetcher.data.message });
      }
      navigate("/apps/announcementBar?appId=1", {
        state: { tabToOpen: ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR },
      });
    }
  }, [fetcher]);

  const filteredSteps = steps.filter((step) => {
    if (appActivationState == null) {
      return;
    }
    if (
      (step.id === 1 && appActivationState.enableApp) ||
      (step.id === 2 && appActivationState.enableAppInStore)
    ) {
      return false;
    }
    return true;
  });

  return (
    <Page>
      <Toast
        show={!isLoading(fetcher.state) && fetcher.data}
        message={toastConfig.message}
        isError={toastConfig.isError}
      />

      {appActivationState ? (
        <>
          {" "}
          <StepsRenderer
            tabs={filteredSteps}
            selected={selectedStep}
            setSelected={setSelectedStep}
            error={error}
          />
          <div className="customization-container">
            <ManageDataChange
              newState={settingsState}
              prevState={prevSettingsState.current}
              handleSaveChanges={handleOnSave}
              handleDiscardChanges={() => {
                if (Object.keys(prevSettingsState.current).length > 0) {
                  setSettingsState(prevSettingsState.current);
                }
                navigate("/apps/announcementBar?appId=1", {
                  state: { tabToOpen: ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR },
                });
              }}
              fetcherState={fetcher.state}
              isError={checkError(error)}
              showBarInitially={true}
              showSaveButton={selectedStep == filteredSteps.length - 1}
            />
            <div className="customization-left-section">
              {filteredSteps[selectedStep]?.component}
            </div>
            <div className="customization-right-section">
              <ProductPreviewCard
                setSettingsState={setSettingsState}
                settingsState={settingsState}
                announcementBarType={announcementBarType}
                appType={APP_TYPE.ANNOUNCEMENT_BARS}
                colorTheme={colorTheme}
              />
            </div>
          </div>
        </>
      ) : (
        <CustomSpinner></CustomSpinner>
      )}
    </Page>
  );
};

export default AnnouncementCustomization;
