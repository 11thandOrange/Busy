import React, { useMemo, useState } from "react";
import "./style.css";
import {
  XIcon,
  CaretDownIcon,
  CaretUpIcon,
  CartDownIcon,
  CartUpIcon,
} from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import GiftWrapPreview from "./GiftWrapPreview";
import GiftMessagePreview from "./GiftMessagePreview";
import GiftReceiptPreveiw from "./GiftReceiptPreview";
import GiftReceiptEmailPreveiw from "./GiftReceiptEmailPreview";

const SendAsGiftPreview = ({ settingsState, onClose = () => {} }) => {
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const imgURL = useMemo(() => {
    return settingsState.giftWrapImage &&
      validImageTypes.includes(settingsState.giftWrapImage.type)
      ? window.URL.createObjectURL(settingsState.giftWrapImage)
      : settingsState.giftWrapImage;
  }, [settingsState.giftWrapImage]);

  const [openPanels, setOpenPanels] = useState([]);

  const togglePanel = (panel) => {
    setOpenPanels((prev) =>
      prev.includes(panel)
        ? prev.filter((item) => item !== panel)
        : [...prev, panel],
    );
  };

  const allAccordions = [
    {
      key: "giftWrap",
      title: settingsState.giftWrapCustomizationText,
      icon: settingsState.giftWrapCustomizationEmoji,
      color: settingsState.giftWrapCustomizationColor,
      content: (
        <GiftWrapPreview
          settingsState={settingsState}
          imgURL={imgURL}
        ></GiftWrapPreview>
      ),
      enabled: settingsState.enableGiftWrap,
    },
    {
      key: "giftMessage",
      title: settingsState.giftMessageCustomizationText,
      icon: settingsState.giftMessageCustomizationEmoji,
      color: settingsState.giftMessageCustomizationColor,
      content: (
        <GiftMessagePreview settingsState={settingsState}></GiftMessagePreview>
      ),
      enabled: settingsState.enableGiftMessage,
    },
    {
      key: "giftReceipt",
      title: settingsState.giftReceiptCustomizationText,
      icon: settingsState.giftReceiptCustomizationEmoji,
      color: settingsState.giftReceiptCustomizationColor,
      content: (
        <GiftReceiptPreveiw settingsState={settingsState}></GiftReceiptPreveiw>
      ),
      enabled: settingsState.enableGiftReceipt,
    },
    {
      key: "giftReceiptEmail",
      title: settingsState.giftReceiptEmailCustomizationText,
      icon: settingsState.giftReceiptEmailCustomizationEmoji,
      color: settingsState.giftReceiptEmailCustomizationColor,
      content: (
        <GiftReceiptEmailPreveiw
          settingsState={settingsState}
        ></GiftReceiptEmailPreveiw> 
      ),
      enabled: settingsState.enableGiftRecipientEmail,
    },
  ];

  const visibleAccordions = allAccordions.filter(
    (accordion) => accordion.enabled,
  );

  return (
    <div>
      <div className="send-as-gift-preview">
        <div className="send-as-gift-close-button" onClick={onClose}>
          <Icon source={XIcon} tone="base" />
        </div>
        <div className="send-as-gift-preview-wrapper">
          {visibleAccordions.map((accordion) => (
            <div key={accordion.key}>
              <div
                className="accordion-header"
                onClick={() => togglePanel(accordion.key)}
              >
                <div className="giftCardPreview_wrapper">
                  <div className="accordion-icon">{accordion.icon}</div>
                  <div
                    className="accordion-title"
                    style={{ color: accordion.color }}
                  >
                    {accordion.title}
                  </div>
                </div>
                <div className="accordion-arrow">
                  {openPanels.includes(accordion.key) ? (
                    <Icon source={CaretUpIcon} tone="base" />
                  ) : (
                    <Icon source={CaretDownIcon} tone="base" />
                  )}
                </div>
              </div>
              {openPanels.includes(accordion.key) && (
                <div className="accordion-content">{accordion.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendAsGiftPreview;
