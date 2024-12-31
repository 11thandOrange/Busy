import React, { useState } from "react";
import IMAGES from "../../../../utils/Images";
import Homepage from "../../../../components/templates/homepage";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import Analytics from "../../../../components/templates/Analytics";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useSearchParams } from "react-router-dom";
import CheckBars, {
  emptyStateButtonType,
} from "../../../../components/templates/CheckBars";
import { ROUTES } from "../../../../utils/constants";
import { cors } from "remix-utils/cors";
import SendAsGiftSettings from "../../../../components/templates/InAppSettings/SendAsGiftSettings";
import CustomizationSettings from "../../../../components/templates/InAppSettings/SendAsGiftSettings/CustomizationSettings";
import { authenticate } from "../../../../shopify.server";
import db from '../../../../db.server'
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const {session} = await authenticate.admin(request)
  const giftListing = await db.Gift.findMany({
    where: {
      shop: session.shop,
    }
  });
  return cors(request, json({giftListing: giftListing}));
}
const route = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedType, setSelectedType] = useState(1);
  const navigate = useNavigate();
  const gift = useLoaderData();
  console.log("Gift", gift);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("appId");
  const isAppActive = true;
  const sliderData = [
    {
      type: "video",
      preview: IMAGES.InactiveTabPreview,
      content: IMAGES.InactiveTabSlider,
      title: "Inactive Tab",
    },
  ];

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
          deletConfirmationMessage="This cannot be undone. Are you sure you want to delete the selected gift(s)?"
          // barsData={[
          //   {
          //     id: 16,
          //     name: "Text Bar ",
          //     status: false,
          //     general_setting: '{"message":"Type Text Here"}',
          //     type: "1",
          //     createdAt: "2024-12-03T09:53:36.161Z",
          //   },
          //   {
          //     id: 18,
          //     name: "Text Bar ",
          //     status: false,
          //     general_setting:
          //       '{"countDownStartAt":"2024-12-03T15:40","countDownEndsAt":"2024-12-04T15:40","message":"Offer ends in #countdown_timer#."}',
          //     type: "2",
          //     createdAt: "2024-12-03T10:17:10.388Z",
          //   },
          //   {
          //     id: 19,
          //     name: "Text Bar",
          //     status: false,
          //     general_setting:
          //       '{"countDownStartAt":"2024-12-03T15:40","countDownEndsAt":"2024-12-04T15:40","message":"Offer ends in #countdown_timer#."}',
          //     type: "2",
          //     createdAt: "2024-12-03T10:19:09.560Z",
          //   },
          //   {
          //     id: 20,
          //     name: "Text Bar",
          //     status: false,
          //     general_setting:
          //       '{"message":"Free shipping for orders over #amount#.","progressMessage":"Only #amount# away from free shipping.","finalMessage":"Congratulations! You\'ve got free shipping."}',
          //     type: "3",
          //     createdAt: "2024-12-03T11:58:04.532Z",
          //   },
          //   {
          //     id: 21,
          //     name: "Text Bar",
          //     status: false,
          //     general_setting: '{"message":"Type Text Here"}',
          //     type: "1",
          //     createdAt: "2024-12-03T11:58:16.052Z",
          //   },
          //   {
          //     id: 22,
          //     name: "Text Bar",
          //     status: false,
          //     general_setting:
          //       '{"countDownStartAt":"2024-12-19T16:04","countDownEndsAt":"2024-12-21T16:04","message":"Offer ends in #countdown_timer#."}',
          //     type: "2",
          //     createdAt: "2024-12-19T10:35:32.016Z",
          //   },
          // ]}
          barsData={[]}
          toastMessage="Gift(s) deleted successfully"
        />
      ),
    },

    {
      id: "Customization-1",
      content: "Customization",
      component: <CustomizationSettings />,
    },

    {
      id: "Settings-1",
      content: "Settings",
      component: <SendAsGiftSettings />,
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
