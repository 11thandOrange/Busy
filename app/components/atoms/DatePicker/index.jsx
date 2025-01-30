import React from "react";
import "./style.css";
import { TextField } from "@shopify/polaris";
import CustomTextField from "../CustomTextField";
const DatePicker = ({
  label,
  helpText,
  onDatePicked,
  minValue,
  errorMessage,
  initialValue = "2024-11-13T12:30",
}) => {

  return (
    <div className="date-picker-container">
      <CustomTextField
        type="datetime-local"
        label={label}
        helpText={helpText}
        onValueChange={onDatePicked}
        min={minValue}
        errorMessage={errorMessage}
        value={initialValue}
      ></CustomTextField>
    </div>
  );
};

export default DatePicker;
