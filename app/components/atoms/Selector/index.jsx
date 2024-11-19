import { Select } from "@shopify/polaris";
import { useState, useCallback } from "react";

function Selector({
  label,
  options,
  helpText,
  onSelect,
  initialValue = "today",
}) {
  const [selected, setSelected] = useState(initialValue);

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    onSelect(value);
  }, []);

  return (
    <>
      <Select
        label={label}
        options={options}
        onChange={handleSelectChange}
        value={selected}
        helpText={helpText}
      />
    </>
  );
}

export default Selector;
