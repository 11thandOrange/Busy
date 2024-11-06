import {Button, Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import PopoverData from '../../atoms/popoverData';

function PopoverContent({options}) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button variant='primary' onClick={togglePopoverActive} disclosure>
      Create Announcement Bar
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
        preferredAlignment="center"
    
      >
        <Popover.Pane fixed>
          <Popover.Section>
            <p>Select type</p>
          </Popover.Section>
        </Popover.Pane>
        <Popover.Pane>
            
          <ActionList
            actionRole="menuitem"
            items={options.map(element => {
              return {content:  <PopoverData header={element.header} description={element.description}></PopoverData>}
            })
            }
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}


export default PopoverContent;