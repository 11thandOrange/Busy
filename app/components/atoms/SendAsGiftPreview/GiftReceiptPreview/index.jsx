import React from "react";
import "./style.css";
import { Checkbox } from "@shopify/polaris";
const GiftReceiptPreveiw = ({ settingsState }) => {
  return (
    <div className="content-container">
      <div className="title-price-container">
       
        {settingsState.sendWithGiftReceipt && (
          <div className="gift-price gift-recepient-text">
            <Checkbox label={"Send With Gift Receipt"} />
            {/* {settingsState.sendWithGiftReceipt ? "Yes" : "No"} */}
          </div>
        )}
        {settingsState.sendWithNoInvoice && (
          <div className="gift-price gift-recepient-text">
            <Checkbox label={"Send With No Invoice"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftReceiptPreveiw;
