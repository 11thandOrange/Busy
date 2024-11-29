import React, { useState } from "react";

import HomepageSlider from "../../components/templates/HomepageSlider";

import Homepage from "../../components/templates/homepage";
import CheckBars from "../../components/templates/CheckBars";
import CountDownTimerCustomization from "../../components/templates/CountdownTimerCustomization";
import AnnouncementCustomization from "../../components/templates/AnnouncementCustomization";
import {
  ANNOUNCEMENT_BAR_TYPES,
  ANNOUNCEMENT_BARS_TABS,
} from "../../constants/announcementCustomizationConfig";
import AnnouncementSettings from "../../components/templates/InAppSettings/AnnouncementSettings";

const route = () => {
  const [selectedType, setSelectedType] = useState(ANNOUNCEMENT_BAR_TYPES.TEXT);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: <HomepageSlider />,
    },
    {
      id: "Settings-1",
      content: "Settings",
      component: <AnnouncementSettings></AnnouncementSettings>,
    },

    {
      id: "Announcement-bars-1",
      content: "Announcement Bars",
      component: <CheckBars></CheckBars>,
    },
  ];
  return (
    <>
      <Homepage
        header="Countdown Timer"
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        selectedType={selectedType}
        setSelectedType={(type) => {
          setSelectedType(type);
        }}
        
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
