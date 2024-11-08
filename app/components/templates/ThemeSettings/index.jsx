
import React from 'react'
import Selector from '../../atoms/Selector';
import CustomColorPallete from '../../atoms/CustomColorPallete';
import { Text } from '@shopify/polaris';
import { THEME_SETTINGS_STATUS } from '../../../constants/announcementBarConfig';

const ThemeSettings = () => {
    const themeOptions = [
        {label: 'Top relative', value: THEME_SETTINGS_STATUS.TOP_RELATIVE},
        {label: 'Top fixed', value: THEME_SETTINGS_STATUS.TOP_FIXED},
        {label: 'Bottom', value: THEME_SETTINGS_STATUS.BOTTOM},
    
      ];
  return (
    <div>  
        <div className='general-settings-header'>
            <Text variant="bodyMd" fontWeight="bold" as="span">Theme Settings</Text>
        </div>
    <Selector  onSelect={(value)=>{console.log("On select",value);}} options={themeOptions} label="Status" helpText="The announcement bar is displayed before/above the page content. When scrolling down, the announcement bar will not be visible anymore."></Selector>
    <CustomColorPallete colorHeading={'Background Color'}></CustomColorPallete>
    <CustomColorPallete colorHeading={'Text Color'}></CustomColorPallete>
    <CustomColorPallete colorHeading={'Special Color'}></CustomColorPallete>
    </div>
  )
}

export default ThemeSettings