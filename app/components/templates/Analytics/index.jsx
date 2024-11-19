import React, { useCallback, useState } from 'react';
import './style.css'
import DateRangePicker from '../../atoms/DateRangePicker';
import AnalyticsView from '../../atoms/AnalyticsView';
import { Select } from '@shopify/polaris';

const Analytics = ({apps}) => {
  const [selected, setSelected] = useState(null);

  const options = Object.values(apps).map(item => ({
    label: item.name,
    value: item.id
  }));

  const handleSelectChange = (value) => setSelected(Number(value))
  

    return (
      <div>
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />
        <DateRangePicker />
        <AnalyticsView/>
      </div>
    );
};

export default Analytics;
