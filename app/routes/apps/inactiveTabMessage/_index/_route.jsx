import { useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import AnnouncementSettings from "../../../../components/templates/AnnouncementSettings";
import { ANNOUNCEMENT_BAR_TYPES } from "../../../../constants/announcementCustomizationConfig";
import Homepage from "../../../../components/templates/homepage";

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
        />
      ),
    },
    {
      id: "Settings-1",
      content: "Settings",
      component: <AnnouncementSettings />,
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
