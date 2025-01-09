import React from "react";
import "./style.css";
import { Checkbox } from "@shopify/polaris";
import CustomTextField from "../../CustomTextField";
const GiftReceiptEmailPreveiw = ({ settingsState }) => {
  return (
    <div className="content-container">
      <div className="title-price-container bb_container_wrapper">
        {/* <div className="gift-title">{settingsState.recipientEmailTitle}</div> */}
        {/* <div className="gift-email">
          Email : {settingsState.recipientEmail}
        </div> */}
        <div className="gift-email">
          <CustomTextField
            label={"Email"}
            placeholder="Enter your Email"
            readOnly={true}
          ></CustomTextField>
        </div>

        {settingsState.sendEmailUponCheckout && (
          <div className="gift-price gift-recepient-text">
            <Checkbox label={"Send Email Upon Checkout"} />
          </div>
        )}
        {settingsState.sendEmailWhenItemIsShipped && (
          <div className="gift-price gift-recepient-text">
            <Checkbox label={"Send When Item Is Shipped"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftReceiptEmailPreveiw;
