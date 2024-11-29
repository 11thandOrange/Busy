import { Text } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import CustomTextField from "../CustomTextField";
import "./style.css";
const InputDatePicker = ({
  heading,
  onDatePicked = () => {},
  initialValue = { days: 0, hours: 0, minutes: 0 },
  minValues = { days: 0, hours: 0, minutes: 0 },
  maxValues = { days: 24, hours: 24, minutes: 60 },
  maxLength = { days: 2, hours: 2, minutes: 2 },
}) => {
  const [date, setDate] = useState({ days: 0, hours: 0, minutes: 0 });
  useEffect(() => {
    setDate(initialValue);
  }, [initialValue]);
  const onDateChange = (key, value) => {
    if (isNaN(value)) {
      value = 0;
    } else if (value > maxValues[key]) {
      value = maxValues[key];
    }
    setDate((prevState) => {
      const updatedDate = { ...prevState, [key]: value };
      return updatedDate;
    });
    onDatePicked({ ...date, [key]: value });
  };

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
        <CustomTextField
          type="number"
          onValueChange={(value) => {
            onDateChange("days", parseInt(value));
          }}
          value={date.days}
          min={minValues.days}
          max={maxValues.days}
          maxLength={maxLength.days}
        ></CustomTextField>
        :
        <CustomTextField
          type="number"
          onValueChange={(value) => {
            onDateChange("hours", parseInt(value));
          }}
          value={date.hours}
          min={minValues.hours}
          max={maxValues.hours}
          maxLength={maxLength.hours}
        ></CustomTextField>
        :
        <CustomTextField
          type="number"
          onValueChange={(value) => {
            onDateChange("minutes", parseInt(value));
          }}
          value={date.minutes}
          min={minValues.minutes}
          max={maxValues.minutes}
          maxLength={maxLength.minutes}
        ></CustomTextField>
      </div>
    </div>
  );
};

export default InputDatePicker;
