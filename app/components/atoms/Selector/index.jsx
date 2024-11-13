import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function Selector({label,options,helpText,onSelect=()=>{}}) {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback(
    (value) => {setSelected(value); onSelect(value)},
    [],
  );

 

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