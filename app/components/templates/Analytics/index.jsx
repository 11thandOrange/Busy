import React, { useCallback, useEffect, useState } from 'react';
import './style.css'
import DateRangePicker from '../../atoms/DateRangePicker/DateRangePicker';
import AnalyticsView from '../../atoms/AnalyticsView';
import { Select } from '@shopify/polaris';
import { useFetcher } from '@remix-run/react';
import { formatDate } from '../../../utils/clientFunctions';
import { TABS_ENUM } from '../../../utils/constants';
import DateRangeButton from '../../atoms/DateRangePicker/Index';

const Analytics = ({apps}) => {
  const fetcher = useFetcher();
  const [selected, setSelected] = useState(apps[0].id);
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  })
  const [selectedTabs, setSelectedTabs] = useState(Object.values(TABS_ENUM).map(item =>item));
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const tabs = [
    { key: TABS_ENUM.IMPRESSIONS, label: 'Impressions', color: '#7e57c2' },
    { key: TABS_ENUM.CLICK, label: 'Clicks', color: '#ff7043' },
  ];

  const handleSelect = (key) => {
    setSelectedTabs((prevSelected) => {
      let newState = [...prevSelected]
      if(newState.includes(key)){
        return newState.filter(item => item != key)
      }else{
        return [...newState, key]
      }
    });
  };

  const options = apps.map(item => ({
    label: item.name,
    value: item.id
  }));

  const handleSelectChange = (value) => setSelected(Number(value))
  
  const getAnalytics = () => {
    const data = fetcher.load(`/analytics?appId=${selected}&fromDate=${formatDate(selectedDates?.start)}&toDate=${formatDate(selectedDates?.end)}`);
  }

  useEffect(() => {
    getAnalytics()
  }, [selected, selectedDates])

  useEffect(() => {
    if (fetcher.data) {
      let data = fetcher.data?.analytics?.filter(item => selectedTabs.includes(item.activityId)).filter(item => item.activityData.length)
      let labels = [];
      data?.forEach(item => item?.activityData?.forEach(itemData => {
        if(!labels.includes(itemData.date)){
          labels.push(itemData.date)
        }
      }))
      setChartData({
        labels: labels,
        datasets: data.length ? data.map(item => {
          const tabData = tabs.find(tab => tab.key == item.activityId)
          return {
            label: tabData.label,
            data: item.activityData.map(data => ({x: data.date, y:data.count})),
            borderColor: tabData.color,
            backgroundColor: tabData.color,
            borderWidth: 2,
            tension: 0.4,
          }
        }) : []
      })
    }
  }, [fetcher.data, selectedTabs])

  return (
    <div>
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selected}
      />
      <DateRangeButton selectedDates={selectedDates} setDate={setSelectedDates}/>
      <AnalyticsView handleSelectTab={handleSelect} selectedTabs={selectedTabs} tabs={tabs} chartData={chartData}/>
    </div>
  );
};

export default Analytics;
