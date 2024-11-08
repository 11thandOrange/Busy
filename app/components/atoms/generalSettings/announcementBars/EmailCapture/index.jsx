import React from 'react'
import CustomTextField from '../../../CustomTextField'
import CustomColorPallete from '../../../CustomColorPallete'

const EmailCaptureSettings = () => {
  return (
    <div>
        <CustomTextField value={"Subscribe now and get 15% off."} type='text' label='Message'   ></CustomTextField>
        <CustomTextField value={"Get my coupon."} type='text' label='Button Text'   ></CustomTextField>
        <CustomColorPallete colorHeading={'Button Color'}></CustomColorPallete>
        <CustomColorPallete colorHeading={'Button Text Color'}></CustomColorPallete>
        <CustomTextField value={"Now you can get 15% off at checkout with Coupon #coupon#"} type='text' helpText={"Please keep the #coupon# variable. It will be replaced with the code from the Coupon field below."} label='Coupon Text
'   ></CustomTextField>
        <CustomTextField value={"FIRST15OFF"} type='text' helpText={`Make sure it's configured in your Shopify admin > Discounts.`} label='Coupon
'   ></CustomTextField>
    </div>
  )
}

export default EmailCaptureSettings