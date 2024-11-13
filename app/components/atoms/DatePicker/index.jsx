import React from "react";
import "./style.css";
import { TextField } from "@shopify/polaris";
import CustomTextField from "../CustomTextField";
const DatePicker = ({ label, helpText, onDatePicked, minValue, errorMessage }) => {
  // console.log("settings inside date", settingsState);

  return (
    <div className="date-picker-container">
      <CustomTextField
        type="datetime-local"
        label={label}
        helpText={helpText}
        onValueChange={onDatePicked}
        min={minValue}
        errorMessage={errorMessage}
      ></CustomTextField>
    </div>
  );
};

export default DatePicker;