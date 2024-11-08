import React from 'react'
import CustomTextField from '../../../CustomTextField'

const OrderCounterSettings = () => {
  return (
    <div>
      
        <CustomTextField  value= {0} type='text' label='Your total order count' disabled={true}></CustomTextField>
        <CustomTextField value={"We shipped #orders_count# orders already since the very beginning."} type='text' label='Message' helpText="Show the real orders count value using the #orders_count# variable. Shopify doesn't allow fake information."  ></CustomTextField>
    </div>
  )
}

export default OrderCounterSettings