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
import { json } from "@remix-run/node";

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
      type:true,
      createdAt: true,
    },
  });
  return cors(request, announcement_bars);
}


export async function action({ request }) {
  let shop = await getShopName(request);
  let data = await request.formData();
  let name, status, general_setting, theme_style, theme_setting, type;
  data = Object.fromEntries(data);
  console.log(data)
  const _action = data._action;
  if (_action != "DELETE") {
    name = data.name;
    status = Boolean(data.status);
    general_setting = data.general_setting;
    theme_style = data.theme_style;
    theme_setting = data.theme_settings;
    type = data.type;
  }
  if(data.status==true)
  {
    await db.Announcement_bar.update({
      where: {
        shop: shop
      },
      data: {
        status: false,
      },
    });
  }
  let response;

  switch (_action) {
    case "CREATE":
      const announcement_bar = await db.Announcement_bar.create({
        data: {
          name,
          status,
          general_setting,
          theme_style,
          theme_setting,
          type,
          shop,
        },
      });

      response = json({ message: "Announcement Bar Added", announcement_bar });
      return cors(request, response);

    case "DELETE":
      console.log(data.announcement_bar_id, "TEst");
      await db.Announcement_bar.deleteMany({
        where: {
          id: {
            in: data.announcement_bar_id
              .split(",")
              .map((num) => parseInt(num, 10)),
          },
          shop: shop,
        },
      });
      response = json({ success: true });
      return cors(request, response);
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
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
