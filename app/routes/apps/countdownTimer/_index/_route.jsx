import { useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import { authenticate } from "../../../../shopify.server";
import db from '../../../../db.server'
import { json } from "@remix-run/node";
// import { ANNOUNCEMENT_BAR_TYPES } from "../../../../constants/announcementCustomizationConfig";
import Homepage from "../../../../components/templates/homepage";
import sliderData from "../../../../data/sliderData.json";
// import db from "../../../../db.server";
// import InActiveTabSettings from "../../../../components/templates/InAppSettings/InActiveTabSettings";
// import { authenticate } from "../../../../shopify.server";
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import { useFetcher } from "@remix-run/react";
// import { check_app_active } from "../../../../utils/function";
import CountDownTimerCustomization from "../../../../components/templates/CountdownTimerCustomization";
import { COLOR_THEME } from "../../../../constants/announcementCustomizationConfig";
import { check_app_active } from "../../../../utils/function";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  const {session} = await authenticate.admin(request);
  const shop = session.shop;
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get("appId"));
  let countdownTimer = await db.countdown_timer.findFirst({
    where: {
      shop: shop,
    },
  });

  if (!countdownTimer) {
    countdownTimer = {};
  }
  let setting = await db.setting.findFirst({
    where: {
      shop: shop,
    },
  });
  return json({countdownTimer, color_theme: setting?.color_theme, app_active: await check_app_active(appId, shop)});
}

export async function action({ request }) {
  const {session} = await authenticate.admin(request);
  let countdownTimer = await request.formData();
  countdownTimer = Object.fromEntries(countdownTimer);
  const shop = session.shop;
  await db.countdown_timer.upsert({
    where: { shop: shop },
    update: {
      general_setting: countdownTimer.settings,
      display_setting: countdownTimer.display
    },
    create: {
      general_setting: countdownTimer.settings,
      display_setting: countdownTimer.display,
      shop: shop,
    },
  });

  return json(countdownTimer);
}

const route = () => {
    const countdownTimer = useLoaderData();

  const [selectedType, setSelectedType] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const isAppActive = countdownTimer.app_active; //inActiveTabData.app_active;

  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: <HomepageSlider sliderData={sliderData} />,
    },
    {
      id: "Settings-1",
      content: "Customization",
      component: (
        <CountDownTimerCustomization
          colorTheme={COLOR_THEME.LIGHT}
        ></CountDownTimerCustomization>
      ),
    },
  ];

  return (
    <>
      <Homepage
        header="Countdown Timer"
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        isAppActive={isAppActive}
        selectedType={selectedType}
        setSelectedType={(type) => {
          setSelectedType(type);
          console.log("Selected Type", type);

          // navigate(`${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${type}`);
        }}
        onCustomizeBtnClick={() => {
          console.log("On customize button click");
          setSelectedTab(1);
        }}
        headerContent={{
          description: `Make every second count with Countdown Timer! Add a customizable countdown alert to your site and create urgency around your sales. Let customers know exactly how much time’s left to grab that deal!`,
          points: [
            `⏰ Create urgency – Countdown to sales, flash deals, and more.`,
            `🎨 Fully customizable – Colors, fonts, and styles that match your brand.`,
            `📱 Mobile-friendly – Works perfectly on all devices. `,
          ],
        }}
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
