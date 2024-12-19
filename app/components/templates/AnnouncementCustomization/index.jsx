import React, { useCallback, useEffect, useRef, useState } from "react";
import Selector from "../../atoms/Selector";
import "./Settings.css";
import { Card, Page, Text } from "@shopify/polaris";
import CustomTextField from "../../atoms/CustomTextField";

import ThemeStyleGrid from "../ThemeStyleGrid";
import ProductPreviewCard from "../ProductPreviewCard";

import ThemeSettings from "../ThemeSettings";
import GeneralSettings from "../../atoms/GeneralSettings/announcementBars/Text";
import {
  ANNOUNCEMENT_BAR_INITIAL_STATE,
  ANNOUNCEMENT_BAR_TYPES,
  ANNOUNCEMENT_BARS_ERROR_STATE,
  ANNOUNCEMENT_BARS_TABS,
  COLOR_THEME,
  SETTINGS_INITIAL_STATE,
  STATUS,
} from "../../../constants/announcementCustomizationConfig";
import FreeShippingSettings from "../../atoms/generalSettings/announcementBars/FreeShipping";
import OrderCounterSettings from "../../atoms/generalSettings/announcementBars/OrderCounter";
import CountdownTimerSettings from "../../atoms/generalSettings/announcementBars/CountdownTimer";
import EmailCaptureSettings from "../../atoms/generalSettings/announcementBars/EmailCapture";
import {
  hasChanges,
  updateState,
  isLoading,
  checkError,
} from "../../../utils/clientFunctions";
import { APP_TYPE, ROUTES } from "../../../utils/constants";
import UnsavedChangesBar from "../../atoms/UnsavedChangesBar";
import DiscardChangesConfirmationPopup from "../../atoms/DiscardChangesConfirmationPopup";
import { useSettingsChanged } from "../../../hooks/useSettingsChanged";
import ManageDataChange from "../ManageDataChange";
import { useFetcher } from "@remix-run/react";
import Toast from "../../atoms/Toast";
import { useNavigate } from "@remix-run/react";
import StepsRenderer from "../StepsRenderer";
import CustomizationStep from "./CustomizationStep";
import EnableAppStep from "./EnableAppStep";
import EnableInShopifyStep from "./EnableInShopifyStep";
import ReviewStep from "./ReviewStep";

const AnnouncementCustomization = ({
  announcementBarType,
  header = "Customization",
  backActionRoute = ROUTES.APPS,
  initialData,
  colorTheme = COLOR_THEME.LIGHT,
}) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const generalSettings = ANNOUNCEMENT_BAR_INITIAL_STATE[announcementBarType];
  const [settingsState, setSettingsState] = useState({
    ...SETTINGS_INITIAL_STATE,
    ...generalSettings,
  });
  const prevSettingsState = useRef({});
  const [error, setError] = useState({ ...ANNOUNCEMENT_BARS_ERROR_STATE });

  const [showLoader, setShowLoader] = useState(true);
  const [selectedStep, setSelectedStep] = useState(0);
  let enableApp = false;
  let enableAppInStore = false;
  const steps = [
    {
      id: 0,
      icon: (
        <span role="img" aria-label="icon">
          ✔️
        </span>
      ),
      title: "Customize Appearance",
      description: "Products in the offer",
      component: (
        <CustomizationStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
          announcementBarType={announcementBarType}
          error={error}
          setError={setError}
        ></CustomizationStep>
      ),
    },
    {
      id: 1,
      icon: (
        <span role="img" aria-label="icon">
          🎯
        </span>
      ),
      title: "Enable App",
      description: "Discount type & amount",
      component: (
        <EnableAppStep setSettingsState={setSettingsState}></EnableAppStep>
      ),
    },
    {
      id: 2,
      icon: (
        <span role="img" aria-label="icon">
          🎨
        </span>
      ),
      title: "Enable In Shopify Store",
      description: "Where & how to display",
      component: (
        <EnableInShopifyStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        ></EnableInShopifyStep>
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
      description: "Offer summary & publish",
      component: (
        <ReviewStep
          settingsState={settingsState}
          enableAppInStore={enableAppInStore}
        ></ReviewStep>
      ),
    },
  ];

  useEffect(() => {
    if (initialData) {
      setSettingsState(initialData);
      setShowLoader(false);
      prevSettingsState.current = initialData;
    }
  }, [initialData]);

  const handleOnSave = () => {
    if (initialData) {
      fetcher.submit(
        {
          id: initialData.id,
          name: settingsState.name,
          status: Number(settingsState.status),
          general_setting: JSON.stringify(settingsState.generalSettings),
          theme_style: JSON.stringify(settingsState.themeStyle),
          theme_settings: JSON.stringify(settingsState.themeSettings),
          type: announcementBarType,
          _action: "UPDATE",
        },
        {
          method: "POST",
          action: ROUTES.ANNOUNCEMENT_OVERVIEW,
        },
      );
    } else {
      fetcher.submit(
        {
          name: settingsState.name,
          status: Number(settingsState.status),
          general_setting: JSON.stringify(settingsState.generalSettings),
          theme_style: JSON.stringify(settingsState.themeStyle),
          theme_settings: JSON.stringify(settingsState.themeSettings),
          type: announcementBarType,
          _action: "CREATE",
        },
        {
          method: "POST",
          action: ROUTES.ANNOUNCEMENT_OVERVIEW,
        },
      );
      prevSettingsState.current = settingsState;
    }
  };
  useEffect(() => {
    if (!isLoading(fetcher.state) && fetcher.data) {
      goback();
    }
  }, [fetcher]);

  const goback = () => {
    navigate("/apps/announcementBar?appId=1", {
      state: { tabToOpen: ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR },
    });
  };

  const filteredSteps = steps.filter((step) => {
    if (step.id === 1 && enableApp) {
      return false;
    }
    if (step.id === 2 && enableAppInStore) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <Page
      // backAction={{ content: "Settings", url: backActionRoute }}
      // title={header}
      // primaryAction={<ActiveButton></ActiveButton>}
      >
        <Toast
          show={!isLoading(fetcher.state) && fetcher.data}
          message="Settings saved"
        />
        <StepsRenderer
          tabs={filteredSteps}
          selected={selectedStep}
          setSelected={setSelectedStep}
          error={error}
        ></StepsRenderer>
        <div className="customization-container">
          <ManageDataChange
            newState={settingsState}
            prevState={prevSettingsState.current}
            handleSaveChanges={() => {
              handleOnSave();
            }}
            handleDiscardChanges={() => {
              if (Object.keys(prevSettingsState.current).length > 0) {
                setSettingsState(prevSettingsState.current);
              }
              goback();
            }}
            fetcherState={fetcher.state}
            isError={checkError(error)}
            showBarInitially={true}
          />

          <div className="customization-left-section">
            {filteredSteps[selectedStep].component}
          </div>
          <div className="customization-right-section">
            <ProductPreviewCard
              setSettingsState={setSettingsState}
              settingsState={settingsState}
              announcementBarType={announcementBarType}
              appType={APP_TYPE.ANNOUNCEMENT_BARS}
              colorTheme={colorTheme}
            ></ProductPreviewCard>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default AnnouncementCustomization;
