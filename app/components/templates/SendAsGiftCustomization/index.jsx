import { Page } from "@shopify/polaris";

import React, { useRef, useState } from "react";
import StepsRenderer from "../StepsRenderer";
import ProductPreviewCard from "../ProductPreviewCard";
import SelectedProductStep from "./selectedProductStep";
import EnableGiftWrapStep from "./enableGiftWrapStep";
import EnableGiftMessageStep from "./enableGiftMessageStep";
import { GIFT_CUSTOMIZATION_STATE } from "../../../constants/sendAsGistCustomizationConfig";
import ManageDataChange from "../ManageDataChange";
import { checkError } from "../../../utils/clientFunctions";
import { APP_TYPE } from "../../../utils/constants";
import "../AnnouncementCustomization/Settings.css";
const SendAsGiftCustomization = () => {
  // Flags

  const [selectedStep, setSelectedStep] = useState(0);
  const [settingsState, setSettingsState] = useState({
    ...GIFT_CUSTOMIZATION_STATE,
  });
  const prevSettingsState = useRef({});
  const [error, setError] = useState({});
  const editButtonsList = [
    { id: 0, title: "Customize Appearance" },
    { id: 1, title: "Enable App" },
    { id: 2, title: "Enable App in Store" },
  ];
  const steps = [
    {
      id: 0,

      title: "Select Products",
      description: "Select Products",
      component: (
        <SelectedProductStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        ></SelectedProductStep>
      ),
    },
    {
      id: 1,

      title: "Enable Gift Wrap",
      description: "Enable Gift Wrap",
      component: (
        <EnableGiftWrapStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        ></EnableGiftWrapStep>
      ),
    },
    {
      id: 2,

      title: "Enable Gift Message",
      description: "Enable Gift Message",
      component: (
        <EnableGiftMessageStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        ></EnableGiftMessageStep>
      ),
    },
    {
      id: 3,

      title: "Enable Gift Receipt",
      description: "Enable Gift Receipt",
      component: <h1>Enable Gift Receipt</h1>,
    },
    {
      id: 4,

      title: "Enable Gift Recipient Email",
      description: "Enable Gift Recipient Email",
      component: <h1>Enable Gift Recipient Email</h1>,
    },
    {
      id: 5,

      title: "Review",
      description: "Review",
      component: <h1>Review</h1>,
    },
  ];
  // const filterSteps = () => {
  //   steps.filter((step) => {
  //     if ((step.id === 1 && enableApp) || (step.id === 2 && enableAppInStore)) {
  //       return false;
  //     }
  //     return true;
  //   });

  //   editButtonsList.filter((btn) => {
  //     if ((btn.id === 1 && enableApp) || (btn.id === 2 && enableAppInStore)) {
  //       return false;
  //     }
  //     return true;
  //   });
  // };
  const handleOnSave = () => {
    console.log("handleOnSave");
  };
  return (
    <Page>
      {/* <Toast
        show={!isLoading(fetcher.state) && fetcher.data}
        message="Settings saved"
      /> */}
      <StepsRenderer
        tabs={steps}
        selected={selectedStep}
        setSelected={setSelectedStep}
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
            navigate("/apps/sendAsGift?appId=5", {
              state: { tabToOpen: ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR },
            });
          }}
          // fetcherState={fetcher.state}
          isError={checkError(error)}
          showBarInitially={true}
          showSaveButton={selectedStep == steps.length - 1}
        />
        <div className="customization-left-section">
          {steps[selectedStep].component}
        </div>
        <div className="customization-right-section">
          <ProductPreviewCard
            setSettingsState={setSettingsState}
            settingsState={settingsState}
            // announcementBarType={announcementBarType}
            appType={APP_TYPE.SEND_AS_A_GIFT}
            // colorTheme={colorTheme}
          />
        </div>
      </div>
    </Page>
  );
};

export default SendAsGiftCustomization;
