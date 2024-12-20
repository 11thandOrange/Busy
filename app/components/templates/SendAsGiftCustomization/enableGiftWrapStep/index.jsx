import { Card, DropZone } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../../../atoms/CustomTextField";
import "./style.css"
const EnableGiftWrapStep = ({settingsState, setSettingsState}) => {
  return (
    <div>
      <Card>
        <DropZone label="Gift Wrap Image (optional; supported image types: gif, jpg and png)">
          <DropZone.FileUpload />
        </DropZone>
        <div className="priceAndTitle">
        <CustomTextField
          type={"text"}
          label={"Gift Wrap Title"}
        ></CustomTextField>
     
        <CustomTextField
          type={"number"}
          label={"price"}
          min={0}
          value={0}
          step={0.01}
          prefix="$"
        ></CustomTextField>
           </div>
        <CustomTextField
          type={"text"}
          label={"Short Description"}
          maxLength={100}
        ></CustomTextField>
      </Card>
    </div>
  );
};

export default EnableGiftWrapStep;
