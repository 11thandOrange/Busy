import React from "react";
import "./style.css";
const GiftReceiptEmailPreveiw = ({ settingsState }) => {
  return (
    <div className="content-container">
      <div className="title-price-container">
        <div className="gift-title">{settingsState.recipientEmailTitle}</div>
        <div className="gift-email">Email : .{settingsState.recipientEmail}</div>
        <div className="gift-price gift-recepient-text">
          Send Email Upon Checkout :{" "}
          {settingsState.sendEmailUponCheckout ? "Yes" : "No"}
        </div>
        <div className="gift-price gift-recepient-text">
          {" "}
          Send When Item Is Shipped :{" "}
          {settingsState.sendEmailWhenItemIsShipped ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};

export default GiftReceiptEmailPreveiw;
