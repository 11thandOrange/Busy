import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  DatePicker,
  Select,
  TextField,
  Button,
} from '@shopify/polaris';
import './style.css'
import { formatDate } from '../../../utils/clientFunctions';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DateRangePicker = ({setDate = () => {}, togglePopup = () => {}, outerDate}) => {
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

  const handleMonthChange = useCallback(
    (newMonth, newYear) => {
      setMonth(newMonth);
      setYear(newYear);
    },
    []
  );
  
  const rangeOptions = [
    { label: 'Custom', value: 'Custom' },
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

  function formatDateRange(startDate, endDate) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    
    // Format the start and end dates
    const start = new Date(startDate).toLocaleDateString('en-US', options);
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    
    return `${start} - ${end}`;
  }

  useEffect(() => {
    setEndDateInput(formatDate(outerDate.end))
    setStartDateInput(formatDate(outerDate.start))
    setYear(outerDate.start.getFullYear())
    setMonth(outerDate.start.getMonth())
    setSelectedDates(outerDate)
  }, [])

  return (
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
            disableDatesAfter={new Date()}
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
            <Button onClick={togglePopup}>Cancel</Button>
            <Button 
              primary 
              onClick={() => {
                setDate(selectedDates);
                togglePopup()
              }} 
              disabled={!!startError || !!endError}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DateRangePicker;
