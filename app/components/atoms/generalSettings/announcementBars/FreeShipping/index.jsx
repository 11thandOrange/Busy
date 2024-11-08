import React from 'react'
import CustomTextField from '../../../CustomTextField'


const FreeShippingSettings = () => {
  return (
    <div>
        <CustomTextField value={"Free shipping for orders over #amount#."} type='text' label='Initial Message'  ></CustomTextField>
        <CustomTextField value={"Only #amount# away from free shipping."} type='text' label='Progress Message'  ></CustomTextField>
        <CustomTextField value={"Congratulations! You've got free shipping."} type='text' label='Message'   ></CustomTextField>
    </div>
  )
}

export default FreeShippingSettings