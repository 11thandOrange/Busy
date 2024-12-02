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
  const [date, setDate] = useState(initialValue);
  // useEffect(() => {
  //   setDate(initialValue);
  // }, [initialValue]);
  const onDateChange = (key, value) => {
    const sanitizedValue = parseInt(value.replace(/^0+/, "") || "0");

    if (isNaN(sanitizedValue)) {
      value = 0;
    } else if (sanitizedValue > maxValues[key]) {
      value = maxValues[key];
    } else {
      value = sanitizedValue;
    }

    setDate((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  useEffect(() => {
    onDatePicked(date);
  }, [date]);

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
            onDateChange("days", value);
          }}
          value={date.days.toString()}
          min={minValues.days}
          max={maxValues.days}
          maxLength={maxLength.days}
        ></CustomTextField>
        :
        <CustomTextField
          type="number"
          onValueChange={(value) => {
            onDateChange("hours", value);
          }}
          value={date.hours.toString()}
          min={minValues.hours}
          max={maxValues.hours}
          maxLength={maxLength.hours}
        ></CustomTextField>
        :
        <CustomTextField
          type="number"
          onValueChange={(value) => {
            onDateChange("minutes", value);
          }}
          value={date.minutes.toString()}
          min={minValues.minutes}
          max={maxValues.minutes}
          maxLength={maxLength.minutes}
        ></CustomTextField>
      </div>
    </div>
  );
};

export default InputDatePicker;
