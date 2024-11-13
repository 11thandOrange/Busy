import React, { useRef, useState } from "react";
import CustomTextField from "../CustomTextField";
import { TIMER_MARGIN_UNITS } from "../../../constants/countdownTimerCustomization";
import Selector from "../Selector";

const InputWithSelector = ({
  inputType,
  title,
  inputValue,
  unitValue,
  onValueChange,
}) => {
  const input = useRef(inputValue);
  const unit = useRef(unitValue);
  const handleChange = () => {
    onValueChange(input.current, unit.current);
  };

  const selectorOptions = [
    { label: "px", value: TIMER_MARGIN_UNITS.PX },
    { label: "rem", value: TIMER_MARGIN_UNITS.REM },
  ];

  return (
    <div>
      <CustomTextField
        type={inputType}
        label={title}
        onValueChange={(value) => {
          input.current = value;
          handleChange();
        }}
        value={inputValue}
      ></CustomTextField>
      <Selector
        options={selectorOptions}
        onSelect={(value) => {
          console.log("selected value", value);
          unit.current = value;
          handleChange();
        }}
        initialValue={unitValue}
      />
    </div>
  );
};

export default InputWithSelector;
