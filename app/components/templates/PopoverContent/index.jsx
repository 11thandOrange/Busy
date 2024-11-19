import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import PopoverData from "../../atoms/popoverData";
import { Link } from "@remix-run/react";

function PopoverContent({ options, heading, onSelect = () => {} }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button variant="primary" onClick={togglePopoverActive} disclosure>
      {heading}
    </Button>
  );

  return (
    <div style={{ height: "50px" }}>
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
            items={options.map((element) => {
              return {
                content: (
                  <PopoverData
                    callback={onSelect}
                    header={element.header}
                    description={element.description}
                    type={element.type}
                  ></PopoverData>
                ),
              };
            })}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}

export default PopoverContent;
