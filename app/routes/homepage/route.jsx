import React from 'react'

import HomepageSlider from '../../components/templates/HomepageSlider';



import Homepage from '../../components/templates/homepage';
import CheckBars from '../../components/templates/CheckBars';

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
    {
      id: "Announcement-bars-1",
      content: "Announcement Bars",
      component: <CheckBars></CheckBars>
    },
   
  ];
  return (
    <>
    <Homepage header="Countdown Timer" tabs={tabs}></Homepage>
    </>
  )
}

export default route