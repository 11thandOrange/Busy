import React from 'react'
import Homepage from './Homepage'
import HomepageSlider from './components/homepageSlider/HomepageSlider';

const route = () => {
  const tabs = [
    {
      id: "all-customers-1",
      content: "All",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
      component: <HomepageSlider></HomepageSlider>,
    },
    {
      id: "accepts-marketing-1",
      content: "Accepts marketing",
      panelID: "accepts-marketing-content-1",
      component: <h1>Hello</h1>,
    },
    {
      id: "repeat-customers-1",
      content: "Repeat customers",
      panelID: "repeat-customers-content-1",
      component: <h1>Hello</h1>,
    },
    {
      id: "prospects-1",
      content: "Prospects",
      panelID: "prospects-content-1",
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