import React from "react";
import "./style.css";
const GiftReceiptPreveiw = ({ settingsState }) => {
  return (
    <div className="content-container">
      <div className="title-price-container">
        <div className="gift-price gift-recepient-text">
          Send With Gift Receipt :{" "}
          {settingsState.sendWithGiftReceipt ? "Yes" : "No"}
        </div>
        <div className="gift-price gift-recepient-text">
          {" "}
          Send With No Invoice :{" "}
          {settingsState.sendWithNoInvoice ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};

export default GiftReceiptPreveiw;
