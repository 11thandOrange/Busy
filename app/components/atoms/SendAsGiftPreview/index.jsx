import React, { useMemo, useState } from "react";
import "./style.css";
import { XIcon, CaretDownIcon, CaretUpIcon } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import GiftWrapPreview from "./GiftWrapPreview";
import GiftMessagePreview from "./GiftMessagePreview";
import GiftReceiptPreveiw from "./GiftReceiptPreview";
import GiftReceiptEmailPreveiw from "./GiftReceiptEmailPreview";
import { GIFT_TYPE_STATUS } from "../../../constants/sendAsGiftCustomizationConfig";

const SendAsGiftPreview = ({ settingsState, onClose = () => {} }) => {
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const imgURL = useMemo(() => {
    return settingsState.giftWrapImage &&
      validImageTypes.includes(settingsState.giftWrapImage.type)
      ? window.URL.createObjectURL(settingsState.giftWrapImage)
      : settingsState.giftWrapImage;
  }, [settingsState.giftWrapImage]);

  const [openPanels, setOpenPanels] = useState([]);

  const togglePanel = (panel) =>
    setOpenPanels((prev) =>
      prev.includes(panel)
        ? prev.filter((item) => item !== panel)
        : [...prev, panel],
    );

  const allAccordions = [
    {
      key: "giftWrap",
      title: settingsState.giftWrapCustomizationText,
      icon: settingsState.giftWrapCustomizationEmoji,
      color: settingsState.giftWrapCustomizationColor,
      content: (
        <>
          {settingsState.enableGiftWrap === GIFT_TYPE_STATUS.ENABLE && (
            <GiftWrapPreview settingsState={settingsState} imgURL={imgURL} />
          )}
          {settingsState.enableGiftMessage === GIFT_TYPE_STATUS.ENABLE && (
            <GiftMessagePreview settingsState={settingsState} />
          )}
          {settingsState.enableGiftReceipt === GIFT_TYPE_STATUS.ENABLE && (
            <GiftReceiptPreveiw settingsState={settingsState} />
          )}
          {settingsState.enableGiftRecipientEmail ===
            GIFT_TYPE_STATUS.ENABLE && (
            <GiftReceiptEmailPreveiw settingsState={settingsState} />
          )}
        </>
      ),
      enabled: [
        settingsState.enableGiftWrap,
        settingsState.enableGiftMessage,
        settingsState.enableGiftReceipt,
        settingsState.enableGiftRecipientEmail,
      ].some((status) => status === GIFT_TYPE_STATUS.ENABLE),
    },
  ];

  const visibleAccordions = allAccordions.filter(
    (accordion) => accordion.enabled,
  );

  return (
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
                <Icon
                  source={
                    openPanels.includes(accordion.key)
                      ? CaretUpIcon
                      : CaretDownIcon
                  }
                  tone="base"
                />
              </div>
            </div>
            {openPanels.includes(accordion.key) && (
              <div className="accordion-content">{accordion.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendAsGiftPreview;
