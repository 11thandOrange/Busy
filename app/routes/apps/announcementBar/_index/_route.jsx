import { useEffect, useState } from "react";
import HomepageSlider from "../../../../components/templates/HomepageSlider";
import {
  ANNOUNCEMENT_BAR_TYPES,
  ANNOUNCEMENT_BARS_TABS,
} from "../../../../constants/announcementCustomizationConfig";
import CheckBars from "../../../../components/templates/CheckBars";
import Homepage from "../../../../components/templates/homepage";
import {
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
import { APP_LISTING } from "../../../../utils/constants";

import { appActivate, can_active, check_app_active } from "../../../../utils/function";
import Analytics from "../../../../components/templates/Analytics";
import sliderData from "../../../../data/sliderData.json";
import AnnouncementSettings from "../../../../components/templates/InAppSettings/AnnouncementSettings";
import IMAGES from "../../../../utils/Images";
import {
  getAppEmbedStatus,
  getAppEmbedUrl,
} from "../../../../utils/store-helper";

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
  }
  app_active = await check_app_active(1, shop);

  return cors(request, {
    announcement_bars: announcement_bars?.length ? announcement_bars : [],
    announcement_customization: announcement_bars_customization,
    announcement_bar_setting,
    app_active,
    color_theme: setting?.color_theme,
    app_embed: await getAppEmbedStatus(session),
    app_embed_url: await getAppEmbedUrl(session),
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
      if (
        data.enable_now == "true" && await can_active(request, shop, APP_LISTING.ANNOUNCEMENT_BARS)
      ) {
        await appActivate(shop, APP_LISTING.ANNOUNCEMENT_BARS, JSON.parse(data.enable_now), request)
        response = json({
          message: "Announcement Bar Added and App Activated",
          success: true,
          announcement_bar,
        });
      } 
      else if(data.enable_now == "true") {
        response = json({
          message: "Please Upgrade Your Plan to enable the app",
          success: false,
        });
      }
      else
      {
        response = json({
          message: "Announcement Bar Added",
          success: true,
          announcement_bar,
        });
      }

      return response;
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
      return json({ success: true });
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
      if (
        data.enable_now == "true" && await can_active(request, shop, APP_LISTING.ANNOUNCEMENT_BARS)
      ) {
        await appActivate(shop, APP_LISTING.ANNOUNCEMENT_BARS, JSON.parse(data.enable_now), request)
        response = json({
          message: "Announcement Bar Updated and App Activated",
          success: true
        });
      } else if(data.enable_now == "true") {
        response = json({
          message: "Please Upgrade Your Plan to enable the app",
          success: false,
        });
      }
      else
      {
        response = json({
          message: "Announcement Bar Updated",
          success: true,
        });
      }
      return response;
    case "DELETE":
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
      return response;
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
const route = () => {
  const announcementData = useLoaderData();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("appId");

  const announcementBarsData = announcementData.announcement_bars;
  const announcementBarsSettings = announcementData.announcement_bar_setting;
  const isAppActive = announcementData.app_active;
  const [selectedType, setSelectedType] = useState(ANNOUNCEMENT_BAR_TYPES.TEXT);
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const sliderData = [
    {
      type: "image",
      preview: IMAGES.AnnouncementBarSlider,
      content: IMAGES.AnnouncementBarSlider,
      title: "Announcement Bar",
    },
  ];
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
      content: "Announcement Bars",
      component: (
        <CheckBars barsData={announcementBarsData} pagination={true} />
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

  useEffect(() => {
    // Set default tab to Announcement Bars tab if there are are announcement bars present

    if (location.state && location.state.tabToOpen) {
      setSelectedTab(location.state.tabToOpen);
    }
  }, []);

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
