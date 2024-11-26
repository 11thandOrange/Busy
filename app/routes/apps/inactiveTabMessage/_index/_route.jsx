import { useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";

import { ANNOUNCEMENT_BAR_TYPES } from "../../../../constants/announcementCustomizationConfig";
import Homepage from "../../../../components/templates/homepage";
import sliderData from "../../../../data/sliderData.json";
import AnnouncementSettings from "../../../../components/templates/InAppSettings/AnnouncementSettings";
import InActiveTabSettings from "../../../../components/templates/InAppSettings/InActiveTabSettings";

const route = () => {
  const [selectedType, setSelectedType] = useState(ANNOUNCEMENT_BAR_TYPES.TEXT);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isAppActive, setIsAppActive] = useState(false);
  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: (
        <HomepageSlider
          selectedType={selectedType}
          setSelectedType={(type) => {
            setSelectedType(type);
            console.log("Selected Type", type);

            // navigate(`${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${type}`);
          }}
          showCustomizeBtn={true}
          sliderData={sliderData}
          onCustomizeBtnClick={() => {
            console.log("On customize button click");
            setSelectedTab(1);
          }}
        />
      ),
    },
    {
      id: "Settings-1",
      content: "Settings",
      component: <InActiveTabSettings />,
    },
  ];

  return (
    <>
      <Homepage
        header="Inactive tab message"
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        isAppActive={isAppActive}
        handleAppActive={setIsAppActive}
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
