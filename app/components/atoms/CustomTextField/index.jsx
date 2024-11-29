import React, { useEffect } from "react";

import { TextField } from "@shopify/polaris";
import { useCallback } from "react";

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
  max,
  maxLength = 1000,
}) {
  const handleTextFieldChange = useCallback((value) => {
    onValueChange(value);
  }, []);

  return (
    <>
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={handleTextFieldChange}
        helpText={helpText}
        placeholder={value}
        disabled={disabled}
        {...(min !== undefined ? { min } : {})}
        {...(max !== undefined ? { max } : {})}
        error={errorMessage}
        maxLength={maxLength}
      />
    </>
  );
}

export default CustomTextField;
