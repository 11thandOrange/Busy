import { Page } from "@shopify/polaris";

import React, { useState } from "react";
import StepsRenderer from "../StepsRenderer";
import ProductPreviewCard from "../ProductPreviewCard";
import SelectedProductStep from "./selectedProductStep";
import EnableGiftWrapStep from "./enableGiftWrapStep";
import EnableGiftMessageStep from "./enableGiftMessageStep";
import { GIFT_CUSTOMIZATION_STATE } from "../../../constants/sendAsGistCustomizationConfig";

const SendAsGiftCustomization = () => {
  // Flags

  const [selectedStep, setSelectedStep] = useState(0);
  const [settingsState, setSettingsState] = useState({
    ...GIFT_CUSTOMIZATION_STATE,
  });
  const steps = [
    {
      id: 0,

      title: "Select Products",
      description: "Select Products",
      component: <SelectedProductStep settingsState={settingsState} setSettingsState={setSettingsState}></SelectedProductStep>,
    },
    {
      id: 1,

      title: "Enable Gift Wrap",
      description: "Enable Gift Wrap",
      component: <EnableGiftWrapStep settingsState={settingsState} setSettingsState={setSettingsState}></EnableGiftWrapStep>,
    },
    {
      id: 2,

      title: "Enable Gift Message",
      description: "Enable Gift Message",
      component: <EnableGiftMessageStep settingsState={settingsState} setSettingsState={setSettingsState}></EnableGiftMessageStep>,
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
        {/* <ManageDataChange
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
        /> */}
        <div className="customization-left-section">
          {steps[selectedStep].component}
        </div>
        <div className="customization-right-section">
          {/* <ProductPreviewCard
            setSettingsState={setSettingsState}
            settingsState={settingsState}
            announcementBarType={announcementBarType}
            appType={APP_TYPE.ANNOUNCEMENT_BARS}
            colorTheme={colorTheme}
          /> */}
        </div>
      </div>
    </Page>
  );
};

export default SendAsGiftCustomization;
