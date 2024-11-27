import React, { useRef, useState } from "react";
import CustomTextField from "../CustomTextField";
import { TIMER_MARGIN_UNITS } from "../../../constants/countdownTimerCustomization";
import Selector from "../Selector";
import "./style.css"

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
    <div className="marginValue-wrapper">
      <CustomTextField
        type={inputType}
        label={title}
        onValueChange={(value) => {
          input.current = value;
          handleChange();
        }}
        value={inputValue}

      >
      </CustomTextField>
      <div className="marginValue">
        <Selector
          options={selectorOptions}
          onSelect={(value) => {
        
            unit.current = value;
            handleChange();
          }}
          initialValue={unitValue}
        />
      </div>
    </div>
  );
};

export default InputWithSelector;
