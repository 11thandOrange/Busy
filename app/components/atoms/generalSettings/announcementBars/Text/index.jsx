import React from 'react'
import CustomTextField from '../../../CustomTextField'
import { Text } from '@shopify/polaris'
import "./style.css"
import DatePicker from '../../../DatePicker'
const GeneralSettings = ({onTextChange}) => {
  return (
    <div>
        
        <CustomTextField  type='text' label='Message' onValueChange={onTextChange} ></CustomTextField>
    </div>
  )
}

export default GeneralSettings