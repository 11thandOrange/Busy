import { useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import { json } from "@remix-run/node";
// import { ANNOUNCEMENT_BAR_TYPES } from "../../../../constants/announcementCustomizationConfig";
import Homepage from "../../../../components/templates/homepage";
import sliderData from "../../../../data/sliderData.json";
import db from "../../../../db.server";
// import InActiveTabSettings from "../../../../components/templates/InAppSettings/InActiveTabSettings";
import { authenticate } from "../../../../shopify.server";
// import { useLoaderData, useSearchParams } from "react-router-dom";
// import { useFetcher } from "@remix-run/react";
// import { check_app_active } from "../../../../utils/function";
import CountDownTimerCustomization from "../../../../components/templates/CountdownTimerCustomization";
import CustomizationCartNotice from "../../../../components/templates/CustomizationCartNotice";
import { getShopName } from "../../../../utils/function";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  const {session} = await authenticate.admin(request)
    const shop = session.shop;
    let cartNotice = await db.Cart_notice.findFirst({
      where: {
        shop: shop,
      },
    });
  
    if (!cartNotice) {
      cartNotice = {};
    }
    return json(cartNotice);
}

export async function action({ request }) {
  let cartNotice = await request.formData();
    cartNotice = Object.fromEntries(cartNotice);
    console.log('cartNotice', cartNotice);
    const shop = await getShopName(request);
    await db.Cart_notice.upsert({
      where: { shop: shop },
      update: {
        backgroundColor: cartNotice.backgroundColor,
        textColor: cartNotice.textColor,
        primary_message: cartNotice.primary_message,
        secondary_message: cartNotice.secondary_message,
        showCountdown: Boolean(cartNotice.show_countdown),
        countdown_timer: parseInt(cartNotice.countdown_timer),
        fire_icon: Boolean(cartNotice.fire_icon),
        general_setting: cartNotice.general_setting,
        shop: shop,
      },
      create: {
        backgroundColor: cartNotice.backgroundColor,
        textColor: cartNotice.textColor,
        primary_message: cartNotice.primary_message,
        secondary_message: cartNotice.secondary_message,
        showCountdown: Boolean(cartNotice.show_countdown),
        countdown_timer: parseInt(cartNotice.countdown_timer),
        fire_icon: Boolean(cartNotice.fire_icon),
        general_setting: cartNotice.general_setting,
        shop: shop,
      },
    });
  
    return json(cartNotice);
}

const CartNotice = () => {
    const cartNoticeData = useLoaderData();

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
      component: <CustomizationCartNotice cartSettings={cartNoticeData}/>,
    },
  ];

  return (
    <>
      <Homepage
        header="Cart Notice"
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

export default CartNotice;
