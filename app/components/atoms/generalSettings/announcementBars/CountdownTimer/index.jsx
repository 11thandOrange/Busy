import React from 'react'
import DatePicker from '../../../DatePicker';
import CustomTextField from '../../../CustomTextField';

const CountdownTimerSettings = () => {
  return (
    <div>
     
     
        
        <div>
        <DatePicker onDatePicked={(date)=>{
            console.log("On Date picked", date);
            
        }} label={"Countdown starts At"}></DatePicker>
        </div>
        <div>
        <DatePicker onDatePicked={(date)=>{
            console.log("On Date picked", date);
            
        }} label={"Countdown ends At"}></DatePicker>
        </div>
        <CustomTextField value={"Offer ends in #countdown_timer#."} type='text' label='Message' helpText="Do not remove the #countdown_timer# tag, that's where the timer will be displayed!"  ></CustomTextField>
    </div>
  )
}

export default CountdownTimerSettings