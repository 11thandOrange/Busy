import { useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import {
  ANNOUNCEMENT_BAR_TYPES,
  ANNOUNCEMENT_BARS_TABS,
} from "../../../../constants/announcementCustomizationConfig";
import AnnouncementCustomization from "../../../../components/templates/AnnouncementCustomization";
import CheckBars from "../../../../components/templates/CheckBars";
import Homepage from "../../../../components/templates/homepage";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ROUTES } from "../../../../utils/constants";
import { cors } from "remix-utils/cors";
import db from "../../../../db.server";
import { getShopName } from "../../../../utils/function";

export async function loader({ request }) {
  const shop = await getShopName(request);
  let announcement_bars = await db.announcement_bar.findMany({
    where: {
      shop: shop,
    },
    select: {
      id: true,
      name: true,
      status: true,
      general_setting: true,
      createdAt: true,
    },
  });
  return cors(request, announcement_bars);
}

const route = () => {
  const announcementBarsData = useLoaderData();
  console.log("Announcnemnt bars data ", announcementBarsData);
  const [selectedType, setSelectedType] = useState(ANNOUNCEMENT_BAR_TYPES.TEXT);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: (
        <HomepageSlider
          selectedType={selectedType}
          setSelectedType={(type) => {
            setSelectedType(type);
            navigate(`${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${type}`);
          }}
        />
      ),
    },
    {
      id: "Settings-1",
      content: "Settings",
      component: <h1>Settings</h1>,
    },
    // {
    //   id: "Customization-1",
    //   content: "Customization",
    //   // component: <CheckBars></CheckBars>,
    //   component: (
    //     <AnnouncementCustomization
    //       announcementBarType={selectedType}
    //     ></AnnouncementCustomization>
    //   ),
    // },
    {
      id: "Announcement-bars-1",
      content: "Announcement Bars",
      component: <CheckBars barsData={announcementBarsData}></CheckBars>,
    },
    // {
    //   id: "Countdown-timer-1",
    //   content: "Countdown Timer",
    //   component: (
    //     <CountDownTimerCustomization
    //       type={selectedType}
    //     ></CountDownTimerCustomization>
    //   ),
    // },
  ];
  return (
    <>
      <Homepage
        header="Countdown Timer"
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
