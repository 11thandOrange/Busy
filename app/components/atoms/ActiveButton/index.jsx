import {Button, Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import './activeButton.css';
export default function ActiveButton() {
  const [popoverActive, setPopoverActive] = useState(false);
  const [isActive,setIsActive] = useState(false);
 
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );
  const toggleIsActive = useCallback(
    () => setIsActive((isActive) => !isActive),
    [],
  );
  const onActiveClick = ()=>{

    if(!isActive)
    {
        toggleIsActive()
    }else{
        togglePopoverActive()
    }}
  
  const activator = (
    <Button onClick={onActiveClick} className="active" disclosure ={isActive?true:false}>
     {isActive?"Active":"Active App"}
    </Button>
  );

  return (
    <div style={{height: '10px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[{content: "Deactivate App"}]}
          onActionAnyItem={()=>{
            //When we click on deactivate, we set isActive to false and close the popover
            toggleIsActive()
            togglePopoverActive()
          }}
        />
      </Popover>
    </div>
  );
}