import { useEffect, useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import {
  ANNOUNCEMENT_BAR_TYPES,
  ANNOUNCEMENT_BARS_TABS,
} from "../../../../constants/announcementCustomizationConfig";
import CheckBars from "../../../../components/templates/CheckBars";
import Homepage from "../../../../components/templates/homepage";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { ROUTES } from "../../../../utils/constants";
import { cors } from "remix-utils/cors";
import db from "../../../../db.server";
import { json } from "@remix-run/node";
import { authenticate } from "../../../../shopify.server";

import { check_app_active } from "../../../../utils/function";
import Analytics from "../../../../components/templates/Analytics";
import sliderData from "../../../../data/sliderData.json";
import AnnouncementSettings from "../../../../components/templates/InAppSettings/AnnouncementSettings";
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  let announcement_bars,
    announcement_bar_setting,
    app_active,
    announcement_bars_customization;
  const shop = session.shop;
  const url = new URL(request.url);

  let setting = await db.setting.findFirst({
    where: {
      shop: shop,
    },
  });
  if (setting?.global_customizations) {
    setting.global_customizations = setting?.global_customizations
      ? JSON.parse(setting?.global_customizations)
      : JSON.stringify({});
  }

  if (url.searchParams.get("id")) {
    announcement_bars_customization = await db.announcement_bar.findFirst({
      where: {
        id: parseInt(url.searchParams.get("id")),
      },
    });
  } else {
    announcement_bars = await db.announcement_bar.findMany({
      where: {
        shop: shop,
      },
      select: {
        id: true,
        name: true,
        status: true,
        general_setting: true,
        type: true,
        createdAt: true,
      },
    });
    announcement_bar_setting = await db.announcement_bar_setting.findFirst({
      where: {
        shop: shop,
      },
    });
    app_active = await check_app_active(1, shop);
  }

  return cors(request, {
    announcement_bars: announcement_bars?.length ? announcement_bars : [],
    announcement_customization: announcement_bars_customization,
    announcement_bar_setting,
    app_active,
    color_theme: setting?.color_theme,
  });
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  let shop = session.shop;
  let data = await request.formData();
  let id,
    name,
    status,
    general_setting,
    theme_style,
    theme_setting,
    type,
    enable_close_button;

  data = Object.fromEntries(data);


  const _action = data._action;
  if (_action == "EDIT" || _action == "UPDATE") {
    id = parseInt(data.id);
  }
  if (_action == "SETTING_CREATE") {
    enable_close_button = JSON.parse(data.enable_close_button);
  }
  if (_action != "DELETE") {
    name = data.name;
    status = Boolean(Number(data.status));
    general_setting = data.general_setting;
    theme_style = data.theme_style;
    theme_setting = data.theme_settings;
    type = data.type;
  }
  if (status == true) {
    await db.Announcement_bar.updateMany({
      where: {
        shop: shop,
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
      return response;
      response = {
        message: "Announcement Bar Added",
        success: true,
        announcement_bar,
      };
      return json( response);
    case "SETTING_CREATE":
      await db.announcement_bar_setting.upsert({
        where: { shop: shop },
        update: {
          enable_close_button: enable_close_button,
          shop: shop,
        },
        create: {
          enable_close_button: enable_close_button,
          shop: shop,
        },
      });
      return json(request, json({ success: true }));
    case "UPDATE":
      await db.Announcement_bar.update({
        where: {
          id: id,
        },
        data: {
          name,
          status,
          general_setting,
          theme_style,
          theme_setting,
          type,
        },
      });
      response = { message: "Announcement Bar Updated", success: true };
      return json( response);
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
      response = { success: true };
      return json( response);
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
const route = () => {
  const announcementData = useLoaderData();
  // console.log(announcementData, "announcementData");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("appId");
  const announcementBarsData = announcementData.announcement_bars;
  const announcementBarsSettings = announcementData.announcement_bar_setting;
  const isAppActive = announcementData.app_active;
  const [selectedType, setSelectedType] = useState(ANNOUNCEMENT_BAR_TYPES.TEXT);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const tabs = [
    {
      id: "Overview-1",
      content: "Overview",
      component: (
        <HomepageSlider
          sliderData={sliderData}
          // showPopOver={true}
        />
      ),
    },
    {
      id: "Announcement-bars-1",
      content: "Create Announcement Bar",
      component: (
        <CheckBars
          barsData={announcementBarsData}
          pagination={true}
          onPageNext={() => {
            console.log("next");
          }}
          onPagePrevious={() => {
            console.log("previous");
          }}
        />
      ),
    },
    {
      id: "Settings-1",
      content: "Settings",
      component: (
        <AnnouncementSettings initialData={announcementBarsSettings} />
      ),
    },

    {
      id: "announcement-bars-analytics",
      content: "Analytics",
      component: <Analytics appId={id} />,
    },
  ];

  // useEffect(() => {
  //   // Set default tab to Announcement Bars tab if there are are announcement bars present
  //   if (announcementBarsData && announcementBarsData.length > 0) {
  //     setSelectedTab(ANNOUNCEMENT_BARS_TABS.ANNOUNCEMENT_BAR);
  //   }
  // }, [announcementBarsData]);

  return (
    <>
      <Homepage
        header="Announcement Bar"
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
          description: `Get Noticed! 🔔
Want to make sure your message doesn’t get missed? Announcement Bar lets you display important alerts right at the top of your store. Whether it’s a sale, promotion, or update, it’s impossible to ignore!`,
          points: [
            `🖌 Customizable – Colors, fonts, and style to match your brand.`,
            `🚨 Attention-grabbing – Keep your customers informed without disrupting their shopping.`,
            `📱 Responsive – Looks great on any device.`,
          ],
        }}
      >
        {tabs[selectedTab].component}
      </Homepage>
    </>
  );
};

export default route;
