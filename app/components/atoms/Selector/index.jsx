import { Select } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";

function Selector({ label, options, helpText, onSelect, initialValue }) {
  // console.log("Selector component", initialValue);

  const [selected, setSelected] = useState(initialValue);
  console.log(initialValue, "initialValue");
  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const handleSelectChange = useCallback((value) => {
    console.log(value, "value");
    setSelected(value);
    onSelect(value);
  }, []);
  console.log(options, "options");
  return (
    <>
      <Select
        key={selected}
        label={label}
        options={options}
        onChange={handleSelectChange}
        value={selected?.toString()}
        helpText={helpText}
      />
    </>
  );
}

export default Selector;
