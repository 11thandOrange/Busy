import React from 'react'

import HomepageSlider from '../../components/templates/HomepageSlider';
import Homepage from '../../components/templates/homepage';

const route = () => {
  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: <HomepageSlider></HomepageSlider>,
    },
    {
      id: "Settings-1",
      content: "Settings",
      component: <h1>Hello</h1>,
    },
   
  ];
  return (
    <>
    <Homepage header="Countdown Timer" tabs={tabs}></Homepage>
    </>
  )
}

export default route