import React, { useEffect } from "react";

import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";

function CustomTextField({
  type,
  label,
  helpText,
  readOnly = false,
  value,
  onValueChange = () => {},
  disabled = false,
  min,
  errorMessage = false,
}) {
  const [textFieldValue, setTextFieldValue] = useState(value);
  useEffect(() => {
    setTextFieldValue(value);
  }, [value]);
  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
    onValueChange(value);
  }, []);

  return (
    <>
      <TextField
        label={label}
        type={type}
        value={textFieldValue}
        onChange={handleTextFieldChange}
        helpText={helpText}
        placeholder={value}
        disabled={disabled}
        {...(min !== undefined ? { min } : {})} //Temp
        error={errorMessage}
      />
    </>
  );
}

export default CustomTextField;
