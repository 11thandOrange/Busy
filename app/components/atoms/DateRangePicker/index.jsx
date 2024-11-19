import React, { useState, useCallback } from 'react';
import {
  Card,
  DatePicker,
  Select,
  TextField,
  Button,
  Popover,
  Icon,
} from '@shopify/polaris';
import './style.css'
import { CalendarIcon } from '@shopify/polaris-icons';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DateRangePicker = () => {
  const [month, setMonth] = useState(new Date().getMonth()); // October
  const [year, setYear] = useState(2024);
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [rangeOption, setRangeOption] = useState('Custom');
  const [startDateInput, setStartDateInput] = useState(formatDate(new Date()));
  const [endDateInput, setEndDateInput] = useState(formatDate(new Date()));
  const [startError, setStartError] = useState('');
  const [endError, setEndError] = useState('');
  const [popoverActive, setPopoverActive] = useState(false);

  const handleMonthChange = useCallback(
    (newMonth, newYear) => {
      setMonth(newMonth);
      setYear(newYear);
    },
    []
  );

  const rangeOptions = [
    { label: 'Custom', value: 'Custom' },
    // { label: 'Today', value: 'Today' },
    // { label: 'Yesterday', value: 'Yesterday' },
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Last 90 days', value: 'Last 90 days' },
    { label: 'Last month', value: 'Last month' },
    { label: 'Last year', value: 'Last year' },
  ];

  const handleRangeChange = useCallback((value) => {
    setRangeOption(value);
    setStartError('');
    setEndError('');

    const today = new Date();
    let start, end;
    
    switch (value) {
      case 'Today':
        start = today;
        end = today;
        break;
      case 'Yesterday':
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        end = start;
        break;
      case 'Last 7 days':
        end = today;
        start = new Date(today);
        start.setDate(today.getDate() - 6);
        break;
      case 'Last 30 days':
        end = today;
        start = new Date(today);
        start.setDate(today.getDate() - 29);
        break;
      case 'Last 90 days':
        end = today;
        start = new Date(today);
        start.setDate(today.getDate() - 89);
        break;
      case 'Last month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'Last year':
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }
    console.log(start, end, "Start ,edm")
    setSelectedDates({ start, end });
    setStartDateInput(formatDate(start));
    setEndDateInput(formatDate(end));
    setMonth(start.getMonth());
    setYear(start.getFullYear());
  }, []);

  const handleDateChange = useCallback(
    (value) => {
      setSelectedDates(value);
      setStartDateInput(formatDate(value.start));
      setEndDateInput(formatDate(value.end));
      setMonth(value.start.getMonth());
      setYear(value.start.getFullYear());
      setRangeOption('Custom');
      validateDates(value.start, value.end);
    },
    []
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const validateDates = (start, end) => {
    if (start > end) {
      setEndError('End date cannot be before start date');
      return false;
    }
    setStartError('');
    setEndError('');
    return true;
  };

  const validateAndSetDate = (dateStr, type) => {
    const date = new Date(dateStr);
    if (isNaN(date)) {
      if (type === 'start') setStartError('Please enter a valid date');
      else setEndError('Please enter a valid date');
      return false;
    }

    if (type === 'start') {
      const isValid = validateDates(date, selectedDates.end);
      setSelectedDates((prev) => ({ ...prev, start: date }));
      setStartDateInput(dateStr);
      if (isValid) setStartError('');
    } else {
      const isValid = validateDates(selectedDates.start, date);
      setSelectedDates((prev) => ({ ...prev, end: date }));
      setEndDateInput(dateStr);
      if (isValid) setEndError('');
    }

    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setRangeOption('Custom');
    return true;
  };

  const handleStartDateChange = (value) => {
    setStartDateInput(value);
    validateAndSetDate(value, 'start');
  };

  const handleEndDateChange = (value) => {
    setEndDateInput(value);
    validateAndSetDate(value, 'end');
  };

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
        {formatDateRange(startDateInput, endDateInput)}
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
    <Card>
      <div className='datepicker-left' style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1, borderRight: '1px solid #e1e3e5', paddingRight: '10px' }}>
          {/* Header for the left and right calendars */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold', textAlign: 'center' }}>
            <div style={{ width: '50%' }}>
              {months[month]}
            </div>
            <div style={{ width: '50%' }}>
              {months[(month + 1) % 12]}
            </div>
          </div>

          <DatePicker
            month={month}
            year={year}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            allowRange
            multiMonth
          />
        </div>
        <div style={{ flex: 1 }}>
          <Select
            label="Date range"
            options={rangeOptions}
            onChange={handleRangeChange}
            value={rangeOption}
          />
          <div style={{ marginTop: '16px' }}>
            <TextField
              label="Start date"
              placeholder="YYYY-MM-DD"
              value={startDateInput}
              onChange={handleStartDateChange}
              error={startError}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <TextField
              label="End date"
              placeholder="YYYY-MM-DD"
              value={endDateInput}
              onChange={handleEndDateChange}
              error={endError}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button onClick={togglePopoverActive}>Cancel</Button>
            <Button primary onClick={() => console.log('Applied')} disabled={!!startError || !!endError}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </Popover>
    </div>
  );
};

export default DateRangePicker;
