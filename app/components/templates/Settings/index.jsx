import React from 'react'
import Selector from '../../atoms/Selector';
import "./Settings.css"
import { Card, Text } from '@shopify/polaris';
import CustomTextField from '../../atoms/CustomTextField';
import CustomColorPallete from '../../atoms/CustomColorPallete';
import ThemeStyleGrid from '../ThemeStyleGrid';
const options = [
    {label: 'Active', value: 'active'},
    {label: 'Inactive', value: 'inactive'},

  ];
const themeOptions = [
    {label: 'Top relative', value: 'Top relative'},
    {label: 'Top fixed', value: 'Top fixed'},
    {label: 'Bottom', value: 'Bottom'},

  ];
const Settings = () => {
  return (
    <div className="settings">
        <div className="settings-left-section">
            <Card>
            <Selector options={options} label="Status" helpText="Only one announcement bar will be displayed at the time"></Selector>
            </Card>
            <Card>
            <CustomTextField type='text' label='Name'  helpText='The private name of this smart bar. Only you will see this.'></CustomTextField>
            </Card>
            <Card>
            <div className='general-settings-header'>
                <Text variant="bodyMd" fontWeight="bold" as="span">General Settings</Text>
            </div>
            <CustomTextField type='text' label='Name'  ></CustomTextField>
            </Card>
            <Card>
            <div className='general-settings-header'>
                <Text variant="bodyMd" fontWeight="bold" as="span">Theme Settings</Text>
            </div>
            <Selector options={themeOptions} label="Status" helpText="The announcement bar is displayed before/above the page content. When scrolling down, the announcement bar will not be visible anymore."></Selector>
           
            <CustomColorPallete colorHeading={'Background Color'}></CustomColorPallete>
            <CustomColorPallete colorHeading={'Text Color'}></CustomColorPallete>
            
            </Card>
            <Card>
                <ThemeStyleGrid></ThemeStyleGrid>
            </Card>
          
        </div>
        <div className="settings-right-section">
            Testing
        </div>
    </div>
  
  )
}

export default Settings