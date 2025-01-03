import React, { useEffect, useRef, useState } from "react";
import SettingSection from "../../GlobalSettings/SettingSection";
import CustomTextField from "../../../atoms/CustomTextField";
import { Button, Layout, Text } from "@shopify/polaris";
import Selector from "../../../atoms/Selector";
import "./style.css";
import ToastBar from "../../../atoms/Toast";
import ManageDataChange from "../../ManageDataChange";
import { useFetcher } from "@remix-run/react";
import { ROUTES } from "../../../../utils/constants";
const REFRESH_CART_CONSTANT = {
  VISUALLY_REFRESH: "1",
  DONT_REFRESH: "2",
};
const GIFT_LOGGING_CONSTANT = {
  NOTES: "1",
  ADDITIONAL_DETAILS: "2",
};
const refreshCartOptions = [
  {
    label: "Visually Refresh the page",
    value: REFRESH_CART_CONSTANT.VISUALLY_REFRESH,
  },
  {
    label: "Don't refresh the page (update in the background only)",
    value: REFRESH_CART_CONSTANT.DONT_REFRESH,
  },
];
const giftLoggingOptions = [
  { label: "'Notes' section of the order", value: GIFT_LOGGING_CONSTANT.NOTES },
  {
    label: "'Additional Details' section of the order",
    value: GIFT_LOGGING_CONSTANT.ADDITIONAL_DETAILS,
  },
];
const SendAsGiftSettings = ({ initialData }) => {
  const initialState = {
    addEmailClient: "",
    giftWrapTagName: "",
    giftMessageTagName: "",
    giftReceiptTagName: "",
    refreshTheCart: REFRESH_CART_CONSTANT.VISUALLY_REFRESH,
    giftLogging: GIFT_LOGGING_CONSTANT.NOTES,
    showDecimalPoints: true,
  };
  const [settingsState, setSettingsState] = useState(initialState);
  const oldSettingRef = useRef(initialState);
  const fetcher = useFetcher();
  const updateSettings = (field, value) => {
    setSettingsState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSaveSettingsData = () => {
    console.log("handleSaveSettingsData", settingsState);
    fetcher.submit(
      {
        ...settingsState,
        _action: "SETTING",
      },

      {
        method: "POST",
        action: ROUTES.SEND_AS_GIFT_CUSTOMIZATION,
      },
    );
  };
  const handleDiscardChanges = () => {
    setSettingsState(oldSettingRef.current);
  };
  useEffect(() => {
    if (initialData) {
      setSettingsState(initialData);
      oldSettingRef.current = initialData;
    }
  }, [initialData]);
  return (
    <Layout>
      <ToastBar
        onDismiss={() => {}}
        show={false}
        message="Settings saved successfully"
      />
      <ManageDataChange
        newState={settingsState}
        prevState={oldSettingRef.current}
        handleSaveChanges={handleSaveSettingsData}
        handleDiscardChanges={handleDiscardChanges}
        fetcherState={fetcher.state}
      />
      <SettingSection heading={"Add Email Client"}>
        <CustomTextField
          type={"email"}
          label={"Email"}
          placeholder="Enter your email"
          value={settingsState.addEmailClient}
          onValueChange={(value) => {
            updateSettings("addEmailClient", value);
          }}
        ></CustomTextField>
      </SettingSection>
      <SettingSection
        heading={"Tag orders with gift options"}
        subHeading={
          "Automatically add tags to orders that contain one or more gift options"
        }
      >
        <Text variant="headingMd">Gift Options Tags</Text>
        <CustomTextField
          type={"text"}
          label={"Gift Wrap Tag Name"}
          placeholder="Gift Wrap Requested"
          value={settingsState.giftWrapTagName}
          onValueChange={(value) => {
            updateSettings("giftWrapTagName", value);
          }}
        ></CustomTextField>
        <CustomTextField
          type={"text"}
          label={"Gift Message Tag Name"}
          placeholder="Gift Message Requested"
          value={settingsState.giftMessageTagName}
          onValueChange={(value) => {
            updateSettings("giftMessageTagName", value);
          }}
        ></CustomTextField>
        <CustomTextField
          type={"text"}
          label={"Gift Receipt Tag Name"}
          placeholder="Gift Receipt Requested"
          value={settingsState.giftReceiptTagName}
          onValueChange={(value) => {
            updateSettings("giftReceiptTagName", value);
          }}
        ></CustomTextField>
      </SettingSection>
      <SettingSection
        heading={"Refresh the cart after Gift Options changes"}
        subHeading={
          "Control if the page will be visually refreshed when a Gift Option is being selected or deselected by a customer"
        }
      >
        <Selector
          label={"After a Gift Option is being selected / deselected…"}
          helpText={
            "Note: The page will be refreshed only if a paid Gift Option has been selected or deselected. It won't refresh for free Gift Message or Gift Receipt."
          }
          initialValue={settingsState.refreshTheCart}
          options={refreshCartOptions}
          onSelect={(value) => {
            updateSettings("refreshTheCart", value);
          }}
        ></Selector>
      </SettingSection>
      <SettingSection
        heading={"Gift Options Logging Functionality"}
        subHeading={
          "Control where the selected Gift Options will appear within the order"
        }
      >
        <Selector
          label={"Log the selected Gift Options in the..."}
          helpText={
            "The 'Notes section of the order' is useful if your 3rd party fulfillment center, warehouse or shipping company is not pulling the order's 'Additional Details' section."
          }
          options={giftLoggingOptions}
          initialValue={settingsState.giftLogging}
          onSelect={(value) => {
            updateSettings("giftLogging", value);
          }}
        ></Selector>
      </SettingSection>
      <SettingSection
        heading={"Show decimal points"}
        subHeading={`Control if the decimal point appears for round numbers. Example: If the Gift Wrap price is $3.00 - this setting controls if $3 or $3.00 will appear`}
      >
        <div className="show-decimal-container">
          <Text variant="bodyLg">
            The decimal points of round Gift Options prices are{" "}
            <b>{settingsState.showDecimalPoints ? "Visible" : "Hidden "}.</b>
          </Text>
          <Button
            variant={settingsState.showDecimalPoints ? "primary" : "secondary"}
            onClick={() =>
              updateSettings(
                "showDecimalPoints",
                !settingsState.showDecimalPoints,
              )
            }
          >
            {settingsState.showDecimalPoints
              ? "Hide Decimal Points"
              : "Show Decimal Points"}
          </Button>
        </div>
      </SettingSection>
    </Layout>
  );
};

export default SendAsGiftSettings;
