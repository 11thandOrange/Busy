import { Button, Icon, Popover } from '@shopify/polaris'
import { CalendarIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react'
import DateRangePicker from './DateRangePicker';

const DateRangeButton = ({selectedDates, setDate = () => {}}) => {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
      );

      function formatDateRange(startDate, endDate) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        
        // Format the start and end dates
        const start = new Date(startDate).toLocaleDateString('en-US', options);
        const end = new Date(endDate).toLocaleDateString('en-US', options);
        
        return `${start} - ${end}`;
      }

      const activator = (
        <Button onClick={togglePopoverActive} disclosure>
          <div className="popover-btn">
            <Icon
              source={CalendarIcon}
              tone="base"
            />
            {formatDateRange(selectedDates.start, selectedDates.end)}
          </div>
        </Button>
      );

    return (
        <div className='datepicker-container'>
          <Popover
              active={popoverActive}
              activator={activator}
              onClose={togglePopoverActive}
              ariaHaspopup={false}
              sectioned
              fluidContent
          >
              {popoverActive ? <DateRangePicker outerDate={selectedDates} setDate={setDate} togglePopup={togglePopoverActive}/> : null}
          </Popover>
        </div>
    )
}

export default DateRangeButton