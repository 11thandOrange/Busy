import React, { useState } from "react";
import CustomTextField from "../CustomTextField";
import { TIMER_MARGIN_UNITS } from "../../../constants/countdownTimerCustomization";
import Selector from "../Selector";

const InputWithSelector = (
  inputType,
  title,
  inputValue,
  unitValue,
  onValueChange,
) => {
  const [input, setInput] = useState(inputValue);
  const [unit, setUnitValue] = useState(unitValue);

  const handleChange = () => {
    onValueChange(input, unit);
  };

  const selectorOptions = [
    { label: "px", value: TIMER_MARGIN_UNITS.PX },
    { label: "rem", value: TIMER_MARGIN_UNITS.REM },
  ];
  return (
    <div>
      {/* <CustomTextField
        type={inputType}
        label={title}
        onValueChange={(value) => {
          setInput(value);
          handleChange();
        }}
        value={inputValue}
      
      ></CustomTextField> */}
      <Selector
        options={selectorOptions}
        onSelect={(value) => {
          console.log("selected value", value);
          setUnitValue(value);
        }}
        initialValue={unitValue}
      />
    </div>
  );
};

export default InputWithSelector;
