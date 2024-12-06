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
import { useLoaderData } from "@remix-run/react";
import { check_app_active } from "../../../../utils/function";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get("appId"));
  let cartNotice = await db.Cart_notice.findFirst({
    where: {
      shop: shop,
    },
  });

  if (!cartNotice) {
    cartNotice = {};
  }
  return json({ cartNotice, app_active: await check_app_active(appId, shop) });
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  let cartNotice = await request.formData();
  cartNotice = Object.fromEntries(cartNotice);
  const shop = session.shop;
  await db.Cart_notice.upsert({
    where: { shop: shop },
    update: {
      backgroundColor: cartNotice.backgroundColor,
      textColor: cartNotice.textColor,
      primary_message: cartNotice.primary_message,
      secondary_message: cartNotice.secondary_message,
      showCountdown: JSON.parse(cartNotice.show_countdown),
      countdown_timer: parseInt(cartNotice.countdown_timer),
      emojiToAdd: cartNotice.emojiToAdd,
      general_setting: cartNotice.general_setting,
      shop: shop,
    },
    create: {
      backgroundColor: cartNotice.backgroundColor,
      textColor: cartNotice.textColor,
      primary_message: cartNotice.primary_message,
      secondary_message: cartNotice.secondary_message,
      showCountdown: JSON.parse(cartNotice.show_countdown),
      countdown_timer: parseInt(cartNotice.countdown_timer),
      emojiToAdd: cartNotice.emojiToAdd,
      general_setting: cartNotice.general_setting,
      shop: shop,
    },
  });

  return json(cartNotice);
}

const CartNotice = () => {
  const cartNotice = useLoaderData();
  const cartNoticeData = cartNotice.cartNotice;

  const [selectedType, setSelectedType] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const isAppActive = cartNotice.app_active;

  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: <HomepageSlider sliderData={sliderData} />,
    },
    {
      id: "Settings-1",
      content: "Customization",
      component: <CustomizationCartNotice cartSettings={cartNoticeData} />,
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
        headerContent={{
          description: `See Your Cart at a Glance! 🛒
Want to keep your shoppers in the know? Cart Notice shows a real-time update of how many items are in their cart, right when they need it! No more guessing – just a quick glance to see where they stand.
`,
          points: [
            `🤝‍🧑 Instant updates – Display the number of items in the cart. `,
            `🎨 Customizable look – Match your store's style. `,
            `🚀 Boost conversions – Clear info = faster checkout.`,
          ],
        }}
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default CartNotice;
