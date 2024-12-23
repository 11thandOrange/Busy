import { Card, Checkbox } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";

const EnableGiftReceiptEmail = () => {
  return (
    <div>
      <Card>
        <CustomTextField
          type={"text"}
          label={"Gift Message Title"}
        ></CustomTextField>

        <CustomTextField
          type={"text"}
          label={"Short Description"}
          maxLength={100}
        ></CustomTextField>

        <CustomTextField type={"email"} label={"Email"}></CustomTextField>
        <Checkbox label="Send Email upon checkout" checked={true}></Checkbox>
        <Checkbox
          label="Send email when Item is Shipped "
          checked={false}
        ></Checkbox>
      </Card>
    </div>
  );
};

export default EnableGiftReceiptEmail;
