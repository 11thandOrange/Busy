import React from "react";
import CountDownTimerCustomization from "../../components/templates/CountdownTimerCustomization";
import { authenticate } from "../../shopify.server";
import db from '../../db.server'

export async function loader({ request }) {
  const {session} = await authenticate.admin(request);
  const shop = session.shop;
  let countdownTimer = await db.countdown_timer.findFirst({
    where: {
      shop: shop,
    },
  });

  if (!countdownTimer) {
    countdownTimer = {};
  }
  return json(countdownTimer);
}

export async function action({ request }) {
  let countdownTimer = await request.formData();
  countdownTimer = Object.fromEntries(countdownTimer);
  const shop = await getShopName(request);
  await db.countdown_timer.upsert({
    where: { shop: shop },
    update: {
      general_setting: countdownTimer.generalSetting,
      display_setting: countdownTimer.displaySetting,
      shop: shop,
    },
    create: {
      general_setting: countdownTimer.generalSetting,
      display_setting: countdownTimer.displaySetting,
      shop: shop,
    },
  });

  return json(countdownTimer);
}
const route = () => {
  return (
    <div>
      <CountDownTimerCustomization ></CountDownTimerCustomization>
    </div>
  );
};

export default route;
