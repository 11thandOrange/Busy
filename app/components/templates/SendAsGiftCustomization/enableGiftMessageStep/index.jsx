import { Card, DropZone } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import "./style.css";
const EnableGiftMessageStep = () => {
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
      </Card>
    </div>
  );
};

export default EnableGiftMessageStep;
