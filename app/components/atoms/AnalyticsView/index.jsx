import React, { useState } from 'react';
import { Card, Icon, TextContainer } from '@shopify/polaris';
import { ChartPopularIcon } from '@shopify/polaris-icons';
import ChartRenderer from '../ChartRenderer';

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

function AnalyticsView() {
    const [selected, setSelected] = useState({});
    const tabs = [
      { key: 'impressions', label: 'Impressions', color: '#7e57c2' },
      { key: 'clicks', label: 'Clicks', color: '#ff7043' },
    ];
  
    const handleSelect = (key) => {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [key]: !prevSelected[key],
      }));
    };
  
    return (
      <Card sectioned>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {tabs.map((tab) => (
            <div
              key={tab.key}
              onClick={() => handleSelect(tab.key)}
              style={{
                flex: '1 1 150px', // Responsive width for each item
                padding: '20px',
                backgroundColor: selected[tab.key] ? tab.color : '#f4f6f8',
                color: selected[tab.key] ? 'white' : 'inherit',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                minWidth: '150px', // Ensures each tab has a minimum width
              }}
            >
              <TextContainer>
                <h3 style={{ margin: 0 }}>{tab.label}</h3>
                <p style={{ fontSize: '24px', margin: '10px 0' }}>0</p>
                <p>No change</p>
              </TextContainer>
            </div>
          ))}
        </div>
        <ChartRenderer data={chartData}/>
  
        <div style={{ padding: '20px', textAlign: 'center', marginTop: '20px' }}>
          <Icon
            source={ChartPopularIcon}
            tone="base"
          />
          <TextContainer>
            <p>Your analytics will be displayed here</p>
            <p>No data available yet.</p>
          </TextContainer>
        </div>
      </Card>
    );
}

export default AnalyticsView;
