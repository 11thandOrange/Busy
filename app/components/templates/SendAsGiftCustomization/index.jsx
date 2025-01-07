import { Page } from "@shopify/polaris";

import React, { useEffect, useRef, useState } from "react";
import StepsRenderer from "../StepsRenderer";
import ProductPreviewCard from "../ProductPreviewCard";
import SelectedProductStep from "./selectedProductStep";
import EnableGiftWrapStep from "./enableGiftWrapStep";
import EnableGiftMessageStep from "./enableGiftMessageStep";
import {
  GIFT_CUSTOMIZATION_ERROR_STATE,
  GIFT_CUSTOMIZATION_STATE,
  PRODUCT_SELECTION_TYPE,
} from "../../../constants/sendAsGiftCustomizationConfig";
import ManageDataChange from "../ManageDataChange";
import { checkError, isLoading } from "../../../utils/clientFunctions";
import { APP_TYPE, ROUTES } from "../../../utils/constants";
import "../AnnouncementCustomization/Settings.css";
import EnableGiftReceiptStep from "./enableGiftReceiptStep";
import EnableGiftReceiptEmail from "./enableGiftReceiptEmail";
import ReviewStep from "../AnnouncementCustomization/ReviewStep";
import { data, useFetcher, useNavigate } from "@remix-run/react";
import { ANNOUNCEMENT_BARS_TABS } from "../../../constants/announcementCustomizationConfig";
import CartPreview from "../CartPreview";
import {
  DISPLAY_GIFT_OPTIONS,
  GIFT_BTN_TYPE,
} from "../InAppSettings/SendAsGiftSettings/CustomizationSettings";
import SendAsGiftPreview from "../../atoms/SendAsGiftPreview";
import ToastBar from "../../atoms/Toast";
const SendAsGiftCustomization = ({
  productsList = [],
  productExists = [],
  initialData,
  giftCustomization,
}) => {
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
    {
      id: 0,
      title: "Select Products",
      data: {
        "Selected Products":
          settingsState.selectionType == PRODUCT_SELECTION_TYPE.ANY_PRODUCT
            ? "All Products"
            : "Specific Products",
      },
    },
    {
      id: 1,
      title: "Enable Gift Wrap",
      data: {
        Enabled: settingsState.enableGiftWrap ? "Yes" : "No",
        Title: settingsState.giftWrapTitle,
        Price: "$" + settingsState.giftWrapPrice,
        Description: settingsState.giftWrapDescription,
        Image: settingsState.giftWrapImage ? "Yes" : "No",
      },
    },
    {
      id: 2,
      title: "Enable Gift Message",
      data: {
        Enabled: settingsState.enableGiftMessage ? "Yes" : "No",
        Title: settingsState.giftMessageTitle,
        Description: settingsState.giftMessageDescription,
      },
    },
    {
      id: 3,
      title: "Enable Gift Receipt",
      data: {
        Enabled: settingsState.enableGiftReceipt ? "Yes" : "No",
        "Send with Gift Receipt": settingsState.sendWithGiftReceipt
          ? "Yes"
          : "No",
        "Send with No Invoice": settingsState.sendWithNoInvoice ? "Yes" : "No",
      },
    },
    {
      id: 4,
      title: "Enable Gift Recipient Email",
      data: {
        Enabled: settingsState.enableGiftRecipientEmail ? "Yes" : "No",
        Title: settingsState.recipientEmailTitle,
        Description: settingsState.recipientEmailDescription,

        "Recipient Email": settingsState.recipientEmail || "No Recipient Email",
        "Send Email Upon Checkout": settingsState.sendEmailUponCheckout
          ? "Yes"
          : "No",
        "Send Email When Item Is Shipped":
          settingsState.sendEmailWhenItemIsShipped ? "Yes" : "No",
      },
    },
  ];
  const [toastConfig, setToastConfig] = useState({
    isError: false,
    message: "",
  });
  useEffect(() => {
    if (initialData) {
      const selectedProductIds = initialData?.selectedProductList
        ? initialData.selectedProductList.split(",")
        : [];

      const selectedProductsList = selectedProductIds
        .map((id) => productsList.find((product) => product.id === id))
        .filter(Boolean);

      prevSettingsState.current = {
        ...settingsState,
        ...initialData,
        selectedProductsList: selectedProductsList,
      };
      setSettingsState((prevState) => ({
        ...prevState,
        ...initialData,
        selectedProductList: selectedProductsList,
      }));
    }
  }, [initialData, productsList]);

  useEffect(() => {
    if (!isLoading(fetcher.state) && fetcher.data) {
      if (fetcher.data.success) {
        setToastConfig({ isError: false, message: fetcher.data.message });
      } else {
        setToastConfig({ isError: true, message: fetcher.data.message });
      }
      navigate("/apps/sendAsGift?appId=5", {
        state: { tabToOpen: ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR },
      });
    }
  }, [fetcher]);

  const handleSaveReq = (payload) => {
    const payloadData = {
      ...payload,
      selectedProductList: payload.selectedProductList.map(
        (product) => product.id,
      ),
    };

    fetcher.submit(
      {
        ...payloadData,
        ...(initialData
          ? { id: initialData.id, _action: "UPDATE_GIFT" }
          : { _action: "CREATE_GIFT" }),
      },
      {
        method: "POST",
        action: ROUTES.SEND_AS_GIFT_CUSTOMIZATION,
      },
    );
  };
  const handleOnSave = () => {
    if (!settingsState.giftWrapImage) {
      let payload = {
        ...settingsState,
        giftWrapImage: null,
      };

      handleSaveReq(payload);

      return;
    }

    if (typeof settingsState.giftWrapImage === "string") {
      let payload = {
        ...settingsState,
        giftWrapImage: settingsState.giftWrapImage, // Send the URL directly
      };

      handleSaveReq(payload);

      return;
    }

    // If giftWrapImage is a File, convert it to Base64
    const reader = new window.FileReader();
    reader.readAsDataURL(settingsState.giftWrapImage);

    reader.onload = function () {
      const base64data = reader.result;

      let payload = {
        ...settingsState,
        giftWrapImage: base64data, // Send the Base64 string
      };

      handleSaveReq(payload);

      console.log("handleOnSave with Base64 image", payload);
    };

    reader.onerror = function (error) {
      console.error("Error reading file:", error);
    };
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
          productExists={productExists}
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
          fetcherState={fetcher.state}
          onSaveAndPublish={handleOnSave}
          settingsState={settingsState}
          setSelectedStep={setSelectedStep}
          editButtonsList={editButtonsList}
          error={checkError(error)}
          disable={isLoading(fetcher.state)}
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
      <ToastBar
        show={!isLoading(fetcher.state) && fetcher.data}
        message={toastConfig.message}
        isError={toastConfig.isError}
      />
      <StepsRenderer
        tabs={steps}
        selected={selectedStep}
        setSelected={setSelectedStep}
        disable={isLoading(fetcher.state)}
      />
      <div className="customization-container">
        <ManageDataChange
          newState={settingsState}
          prevState={prevSettingsState.current}
          handleSaveChanges={handleOnSave}
          handleDiscardChanges={() => {
            // if (Object.keys(prevSettingsState.current).length > 0) {
            //   setSettingsState(prevSettingsState.current);
            // }
            navigate("/apps/sendAsGift?appId=5", {
              state: { tabToOpen: ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR },
            });
          }}
          fetcherState={fetcher.state}
          isError={checkError(error)}
          showBarInitially={true}
          showSaveButton={selectedStep == steps.length - 1}
        />
        <div className="customization-left-section">
          {steps[selectedStep].component}
        </div>
        <div className="customization-right-section">
          {giftCustomization.displayGiftOptions === DISPLAY_GIFT_OPTIONS.BOTH ||
          giftCustomization.displayGiftOptions ===
            DISPLAY_GIFT_OPTIONS.PRODUCT_PAGE_ONLY ? (
            <ProductPreviewCard
              setSettingsState={setSettingsState}
              settingsState={{
                ...settingsState,
                ...giftCustomization,
              }}
              appType={APP_TYPE.SEND_AS_A_GIFT}
              // colorTheme={colorTheme}
            ></ProductPreviewCard>
          ) : (
            <CartPreview
              setSettingsState={setSettingsState}
              settingsState={{
                ...settingsState,
                ...giftCustomization,
              }}
            ></CartPreview>
          )}
        </div>
      </div>
    </Page>
  );
};

export default SendAsGiftCustomization;
