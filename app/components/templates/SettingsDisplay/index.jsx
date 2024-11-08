import React from 'react'
import Selector from '../../atoms/Selector';
import "./style.css"
import CustomTextField from '../../atoms/CustomTextField';
import CustomColorPallete from '../../atoms/CustomColorPallete';
const SettingsDisplay = () => {
    const options = [
        {label: 'Classic', value: 'Classic'},
        {label: 'Hexagon Timer', value: 'Hexagon_Timer'},
        {label: 'Progress Circles', value: 'Progress_Circles'},
        {label: 'Cards', value: 'Cards'},
        {label: 'Moderns', value: 'Moderns'},
        {label: 'Progress Bar', value: 'Progress_Bar'},
        {label: 'Minimalist', value: 'Minimalist'},
    
      ];
    const timerAlignmentOptions = [
        {label: 'Left', value: 'Left'},
        {label: 'Center', value: 'Center'},
        {label: 'Right', value: 'Right'},
        
    
      ];
  return (
    <div>
        <></>
        <div className='display-child'>
        <Selector options={options} label="Theme" helpText="You can select one out of the 7 themes." onSelect={(value)=>{console.log("On select",value);}}></Selector>
        </div>
        <div className='display-child'>
        <Selector options={timerAlignmentOptions} label="Timer Alignment"  onSelect={(value)=>{console.log("On select",value);}}></Selector>
        </div>
        <div className='display-child'>
        <CustomTextField type='text' label='Title'  onValueChange={(value)=>{
              console.log("Text Field",value);
            }}></CustomTextField>
        </div>
        <div className='display-child color-pallete-container'>
            <div className='color-pallete-child-1'>

        <CustomColorPallete colorHeading={'Title Color'}></CustomColorPallete>
        <CustomColorPallete colorHeading={'Digits Color'}></CustomColorPallete>
            </div>
        <CustomColorPallete colorHeading={'Background Color'}></CustomColorPallete>
        </div>
    </div>
  )
}

export default SettingsDisplay