import {Spinner} from '@shopify/polaris';
import React from 'react';
import './style.css'

export default function SpinnerExample({size = "large", label= "Spinner"}) {
  return <div className='spinner-div'><Spinner accessibilityLabel={label} size={size} /></div>;
}