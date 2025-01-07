import React, { useCallback, useEffect, useState } from "react";
import IMAGES from "../../../../utils/Images";
import Homepage from "../../../../components/templates/homepage";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import Analytics from "../../../../components/templates/Analytics";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useSearchParams } from "react-router-dom";
import CheckBars, {
  emptyStateButtonType,
} from "../../../../components/templates/CheckBars";
import { ROUTES } from "../../../../utils/constants";
import { cors } from "remix-utils/cors";
import SendAsGiftSettings from "../../../../components/templates/InAppSettings/SendAsGiftSettings";
import CustomizationSettings from "../../../../components/templates/InAppSettings/SendAsGiftSettings/CustomizationSettings";
import { authenticate } from "../../../../shopify.server";
import db from "../../../../db.server";
import { json } from "@remix-run/node";
import { check_app_active } from "../../../../utils/function";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get("appId"));
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const giftListing = await db.Gift.findMany({
    where: {
      shop: shop,
    },
  });
  const app_active = await check_app_active(appId, shop);
  const giftSetting = await db.giftSetting.findFirst({
    where: {
      shop: shop,
    },
  });
  const giftCustomization = await db.giftCustomization.findFirst({
    where: {
      shop: shop,
    },
  });
  return cors(
    request,
    json({
      giftListing: giftListing,
      settingState: giftSetting,
      giftCustomization,
      app_active,
    }),
  );
};

const route = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedType, setSelectedType] = useState(1);
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();
  const gift = useLoaderData();
  const fetcher = useFetcher();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("appId");
  const isAppActive = gift.app_active;
  const sliderData = [
    {
      type: "video",
      preview: IMAGES.InactiveTabPreview,
      content: IMAGES.InactiveTabSlider,
      title: "Send As Gift",
    },
  ];

  const formatBarsData = useCallback(
    (data) => {
      return data.map((item) => {
        return {
          id: item.id,
          name: item.giftWrapTitle || "Unknown Title",
          message: item.giftWrapDescription || "No Description",
          status: item.enableGiftWrap,
          createdAt: item.createdAt,
        };
      });
    },
    [gift.giftListing],
  );

  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: <HomepageSlider sliderData={sliderData} />,
    },
    {
      id: "Gifts-1",
      content: "Gifts",
      component: (
        <CheckBars
          pagination={true}
          emptyStateBtnType={emptyStateButtonType.BUTTON}
          emptyStateBtnText="Create"
          heading="Gift"
          emptyStateHeading="Create your first gift"
          emptyStateDescription="Send with care, send with love – Send as Gift makes it easy to share joy and show you’re thinking of someone."
          emptyStateBtnCallback={() => {
            navigate(ROUTES.SEND_AS_GIFT_CUSTOMIZATION);
          }}
          onBarClick={(type, id) => {
            navigate(ROUTES.SEND_AS_GIFT_CUSTOMIZATION + `?id=${id}`);
          }}
          onDelete={(selectedResources) => {
            fetcher.submit(
              {
                _action: "DELETE_GIFT",
                giftIds: selectedResources,
              },
              { method: "DELETE", action: ROUTES.SEND_AS_GIFT_CUSTOMIZATION },
            );
          }}
          deletConfirmationMessage="This cannot be undone. Are you sure you want to delete the selected gift(s)?"
          barsData={formatBarsData(gift.giftListing)}
          toastMessage="Gift(s) deleted successfully"
          fetcher={fetcher}
        />
      ),
    },

    {
      id: "Customization-1",
      content: "Customization",
      component: <CustomizationSettings initialData={gift.giftCustomization} />,
    },

    {
      id: "Settings-1",
      content: "Settings",
      component: <SendAsGiftSettings initialData={gift.settingState} />,
    },
    {
      id: "Analytics-1",
      content: "Analytics",
      component: <Analytics appId={id} />,
    },
  ];

  return (
    <>
      <Homepage
        header="Send As Gift"
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        isAppActive={isAppActive}
        selectedType={selectedType}
        setSelectedType={(type) => {
          setSelectedType(type);
          console.log("Selected Type", type);

          navigate(`${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${type}`);
        }}
        headerContent={{
          description: `Make Gifting Easy and Personal!Make every purchase feel personal with Send as Gift! Whether it’s for a birthday, celebration, or just because, this feature lets you send your shopping cart directly to someone special with all the thoughtful extras.`,
          points: [
            `🎁 Gift Wrapping – Add a beautiful touch to your gift with premium wrapping.`,
            `🧾 Gift Receipt – Include a gift receipt or skip the invoice for a seamless experience.`,
            `💌 Personalized Message – Include a heartfelt message that makes your gift extra special.`,
            `📧 Email Notification – Send a notification to the recipient, so they know a surprise is on the way!`,
          ],
        }}
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
