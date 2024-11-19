import { Text } from "@shopify/polaris";
import React from "react";
import CustomTextField from "../CustomTextField";
import "./style.css";
const InputDatePicker = ({ heading }) => {
  return (
    <div>
      <div>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {heading}
        </Text>
      </div>
      <div>
        <Text variant="bodyMd" fontWeight="regular" as="span">
          {"DAYS : HOURS : MINUTES"}
        </Text>
      </div>

      <div className="date-field-container">
        <CustomTextField type="number" min={0}></CustomTextField>:
        <CustomTextField type="number" min={0}></CustomTextField>:
        <CustomTextField type="number" min={0}></CustomTextField>
      </div>
    </div>
  );
};

export default InputDatePicker;
