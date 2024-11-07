import React from 'react'



import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CustomTextField({type,label,helpText,readOnly=false}) {
  const [textFieldValue, setTextFieldValue] = useState(
    '',
  );

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label={label}
      type={type}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      helpText={helpText}
     
    />
  );
}

export default CustomTextField;