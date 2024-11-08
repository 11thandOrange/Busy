import React from 'react'
import CustomTextField from '../../../CustomTextField'
import { Text } from '@shopify/polaris'
import "./style.css"
import DatePicker from '../../../DatePicker'
const GeneralSettings = () => {
  return (
    <div>
        
        <CustomTextField  type='text' label='Message'  ></CustomTextField>
    </div>
  )
}

export default GeneralSettings