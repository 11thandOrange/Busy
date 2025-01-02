import { Page } from "@shopify/polaris";

import React, { useRef, useState } from "react";
import StepsRenderer from "../StepsRenderer";
import ProductPreviewCard from "../ProductPreviewCard";
import SelectedProductStep from "./selectedProductStep";
import EnableGiftWrapStep from "./enableGiftWrapStep";
import EnableGiftMessageStep from "./enableGiftMessageStep";
import {
  GIFT_CUSTOMIZATION_ERROR_STATE,
  GIFT_CUSTOMIZATION_STATE,
} from "../../../constants/sendAsGiftCustomizationConfig";
import ManageDataChange from "../ManageDataChange";
import { checkError } from "../../../utils/clientFunctions";
import { APP_TYPE, ROUTES } from "../../../utils/constants";
import "../AnnouncementCustomization/Settings.css";
import EnableGiftReceiptStep from "./enableGiftReceiptStep";
import EnableGiftReceiptEmail from "./enableGiftReceiptEmail";
import ReviewStep from "../AnnouncementCustomization/ReviewStep";
import { useFetcher, useNavigate } from "@remix-run/react";
import { ANNOUNCEMENT_BARS_TABS } from "../../../constants/announcementCustomizationConfig";
import CartPreview from "../CartPreview";
import { DISPLAY_GIFT_OPTIONS } from "../InAppSettings/SendAsGiftSettings/CustomizationSettings";
import SendAsGiftPreview from "../../atoms/SendAsGiftPreview";
const SendAsGiftCustomization = ({ productsList = [] }) => {
  // Flags

  const [selectedStep, setSelectedStep] = useState(0);
  const [settingsState, setSettingsState] = useState({
    ...GIFT_CUSTOMIZATION_STATE,
  });
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const prevSettingsState = useRef({});
  const [error, setError] = useState({ ...GIFT_CUSTOMIZATION_ERROR_STATE });
  const editButtonsList = [
    { id: 0, title: "Select Products" },
    { id: 1, title: "Enable Gift Wrap" },
    { id: 2, title: "Enable Gift Message" },
    { id: 3, title: "Enable Gift Receipt" },
    { id: 4, title: "Enable Gift Recipient Email" },
  ];

  const handleOnSave = () => {
    fetcher.submit(
      {
        ...settingsState,
        _action: "CREATE_GIFT",
      },
      {
        method: "POST",
        action: ROUTES.SEND_AS_GIFT_CUSTOMIZATION,
      },
    );
    console.log("handleOnSave", settingsState);
  };

  const steps = [
    {
      id: 0,

      title: "Select Products",
      description: "Select Products",
      component: (
        <SelectedProductStep
          productsList={productsList}
          settingsState={settingsState}
          setSettingsState={setSettingsState}
          setError={setError}
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
      component: (
        <EnableGiftReceiptStep
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        ></EnableGiftReceiptStep>
      ),
    },
    {
      id: 4,

      title: "Enable Gift Recipient Email",
      description: "Enable Gift Recipient Email",
      component: (
        <EnableGiftReceiptEmail
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        ></EnableGiftReceiptEmail>
      ),
    },
    {
      id: 5,

      title: "Review",
      description: "Review",
      component: (
        <ReviewStep
          settingsState={settingsState}
          setSelectedStep={setSelectedStep}
          editButtonsList={editButtonsList}
          error={checkError(error)}
        />
      ),
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
  const onGiftBtnClick = () => {
    setShowGiftPopup((prevState) => {
      return !prevState;
    });
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
          {DISPLAY_GIFT_OPTIONS.CART_ONLY === DISPLAY_GIFT_OPTIONS.BOTH ||
          DISPLAY_GIFT_OPTIONS.BOTH ===
            DISPLAY_GIFT_OPTIONS.PRODUCT_PAGE_ONLY ? (
            <ProductPreviewCard
              setSettingsState={setSettingsState}
              settingsState={settingsState}
              appType={APP_TYPE.SEND_AS_A_GIFT_CUSTOMIZATION}
              // colorTheme={colorTheme}
            ></ProductPreviewCard>
          ) : (
            <CartPreview
              setSettingsState={setSettingsState}
              settingsState={settingsState}
            ></CartPreview>
          )}
        </div>
      </div>
    </Page>
  );
};

export default SendAsGiftCustomization;
