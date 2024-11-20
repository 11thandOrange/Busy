import React, { useState } from 'react';
import { Card, Icon, TextContainer } from '@shopify/polaris';
import { ChartPopularIcon } from '@shopify/polaris-icons';
import ChartRenderer from '../ChartRenderer';
import './style.css'

const basicOptions = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Analytics',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Dates',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Count',
      },
    },
  },
}
function AnalyticsView({handleSelectTab, selectedTabs, tabs, chartData}) {

    return (
      <Card sectioned>
        <div className='tabsContainer'>
          {tabs.map((tab) => (
            <div
              key={tab.key}
              onClick={() => handleSelectTab(tab.key)}
              className={`tab ${selectedTabs.includes(tab.key) ? 'tabSelected' : ''}`}
              style={{
                backgroundColor: selectedTabs.includes(tab.key) ? tab.color : undefined,
              }}
            >
              <TextContainer>
                <h3 className="tabLabel">{tab.label}</h3>
                <p className='tabValue'>0</p>
                <p className='tabDescription'>No change</p>
              </TextContainer>
            </div>
          ))}
        </div>

        {chartData.labels.length ? <ChartRenderer data={chartData} basicOptions={basicOptions}/> : 
  
        <div className='footer'>
          <Icon
            source={ChartPopularIcon}
            tone="base"
          />
          <TextContainer>
            <p>Your analytics will be displayed here</p>
            <p>No data available yet.</p>
          </TextContainer>
        </div>}
      </Card>
    );
}

export default AnalyticsView;
