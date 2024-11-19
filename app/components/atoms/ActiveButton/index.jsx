import {Button, Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import './activeButton.css';
export default function ActiveButton({beforeActiveString = 'Active', afterActivateString= 'Activate App', deactivateString = 'Deactivate App'}) {
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
    <Button onClick={onActiveClick} className="active" disclosure={isActive}>
     {isActive ? beforeActiveString : afterActivateString}
    </Button>
  );

  return (
    <div className='bb-sec-btn'>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <div  className="bb-deactive-app-btn">
        <ActionList
         
          actionRole="menuitem"
          items={[{content: deactivateString }]}
          onActionAnyItem={()=>{
            //When we click on deactivate, we set isActive to false and close the popover
            toggleIsActive()
            togglePopoverActive()
          }}
          />
          </div>
      </Popover>
    </div>
  );
}