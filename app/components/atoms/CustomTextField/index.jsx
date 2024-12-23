import React, { useEffect } from "react";

import { TextField } from "@shopify/polaris";
import { useCallback } from "react";

function CustomTextField({
  type,
  label,
  helpText,
  readOnly = false,
  value,
  placeholder = "",
  onValueChange = () => {},
  disabled = false,
  min,
  errorMessage = false,
  max,
  maxLength = 1000,
  prefix = "",
  autoFocus = false,
}) {
  const handleTextFieldChange = useCallback((value) => {
    onValueChange(value);
  }, []);

  return (
    <>
      <TextField
        autoFocus={autoFocus}
        label={label}
        type={type}
        value={value}
        onChange={handleTextFieldChange}
        helpText={helpText}
        placeholder={placeholder}
        disabled={disabled}
        {...(min !== undefined ? { min } : {})}
        {...(max !== undefined ? { max } : {})}
        error={errorMessage}
        maxLength={maxLength}
        prefix={prefix}
      />
    </>
  );
}

export default CustomTextField;
