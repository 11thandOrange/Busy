import { useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
// import { json } from "@remix-run/node";
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

// export async function loader({ request }) {
//   const { session } = await authenticate.admin(request);
//   const url = new URL(request.url);
//   const appId = parseInt(url.searchParams.get("appId"));
//   const shop = session.shop;
//   let inactive_tab_message = await db.inactive_tab_message.findFirst({
//     where: {
//       shop: shop,
//     },
//   });

//   if (!inactive_tab_message) {
//     inactive_tab_message = { message: "" };
//   }
//   return json({
//     inactive_tab_message,
//     app_active: await check_app_active(appId, shop),
//   });
// }

// export async function action({ request }) {
//   console.log(request, "request");
//   const { session } = await authenticate.admin(request);
//   let inactive_tab_message = await request.formData();
//   inactive_tab_message = Object.fromEntries(inactive_tab_message);
//   const shop = session.shop;
//   await db.inactive_tab_message.upsert({
//     where: { shop: shop },
//     update: {
//       message: inactive_tab_message.message,
//       shop: shop,
//     },
//     create: {
//       message: inactive_tab_message.message,
//       shop: shop,
//     },
//   });

//   return json(inactive_tab_message);
// }

const route = () => {
  //   const inActiveTabData = useLoaderData();

  const [selectedType, setSelectedType] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const isAppActive = true; //inActiveTabData.app_active;

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
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
