import { Page, Layout, Text, Card, BlockStack } from "@shopify/polaris";

import { cors } from "remix-utils/cors";
import db from "../db.server";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { getCategories, getShopName } from "../utils/function";
import Slider from "../components/atoms/Slider";
import SingleSlider from "../components/atoms/SingleSlider";
import SingleWidget from "../components/atoms/SingleWidget";
import IMAGES from "../utils/Images";

import ImageRenderer from "../components/atoms/ImageRenderer";
import { authenticate } from "../shopify.server";
import EnableAppPopup from "../components/templates/EnableAppPopup";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  let apps = await db.app.findMany({
    select: {
      id: true,
      name: true,
      description_title: true,
      image: true,
      slug: true,
    },
  });
  let widgets = await db.widget.findMany({
    include: {
      Fav_widget: {
        where: { shop: shop },
        select: {
          widgetId: true,
        },
      },
    },
  });
  widgets = widgets.map((widget) => {
    const isFavorite = widget.Fav_widget.length > 0;
    return {
      id: widget.id,
      name: widget.name,
      description_title: widget.description_title,
      description_content: widget.description_content,
      image: widget.image,
      slug: widget.slug,
      type: widget.type,
      isFavorite,
    };
  });

  const response = { apps, categories: await getCategories(), widgets };
  return cors(request, response);
};
export const action = async ({ request }) => {
  const shop = getShopName(request);
  const formData = new URLSearchParams(await request.text());
  const appId = parseInt(formData.get("appId"));
  const enable = formData.get("enable") === true;
  try {
    const existingMerchant = await db.merchant.findFirst({
      where: {
        appId: appId,
        shop: shop,
      },
    });

    if (existingMerchant) {
      const updatedApp = await db.merchant.update({
        where: {
          id: existingMerchant.id,
        },
        data: {
          enabled: enable,
        },
      });
      return updatedApp;
    } else {
      const newMerchant = await db.merchant.create({
        data: {
          appId: appId,
          shop: shop,
          enabled: enable,
        },
      });
      return newMerchant;
    }
  } catch (error) {
    throw new Error("Failed to update or create merchant");
  }
};

export default function Index() {
  const data = useLoaderData();
  const fetcher = useFetcher();
  const sliderData = [
    {
      type: "image",
      preview: IMAGES.AnnouncementBarSlider,
      content: IMAGES.AnnouncementBarSlider,
      title: "Announcement Bar",
    },

    {
      type: "video",
      preview: IMAGES.InactiveTabPreview,
      content: IMAGES.InactiveTabSlider,
      title: "Inactive Tab",
    },
    {
      type: "image",
      preview: IMAGES.CartNoticeSlider,
      content: IMAGES.CartNoticeSlider,
      title: "Cart Notice",
    },
    {
      type: "video",
      preview: IMAGES.CountDownPreview,
      content: IMAGES.CountDownTimerSlider,
      title: "Countdown Timer",
    },
  ];
  const handleAddToFavorite = (widgetId) => {
    fetcher.submit(
      {
        widgetId: widgetId,
      },
      { method: "POST", action: "/widgets" },
    );
  };

  return (
    <Page>
      <div className="header">
        <img
          src={IMAGES.BusyBuddyLogo}
          alt="Logo"
          className="logo"
          loading="lazy"
        />
        <div>
          <Text as="h1" variant="headingLg" className="title">
            BusyBuddy
          </Text>
          <Text as="p" className="subtitle">
            Every busy body needs busybuddy
          </Text>
        </div>
      </div>

      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            {" "}
            <EnableAppPopup show={true}></EnableAppPopup>
          </Layout.Section>
          <Layout.Section>
            <Card title="My Apps" sectioned>
              <Text as="h2" variant="headingSm">
                Essentials Apps
              </Text>
              <div className="apps_list">
                {data?.apps?.map((item) => {
                  return (
                    <Link
                      className="list-item bb-anchorTag"
                      to={`/apps/${item.slug}?appId=${item.id}`}
                      key={item.id}
                    >
                      <div className="app-databx">
                        <div className="appimagebx">
                          <ImageRenderer src={item?.image} />
                        </div>
                        <div>
                          <div className="apptextebx">
                            <span>{item.name}</span>
                          </div>
                          <div>
                            <span className="desc">
                              {item.description_title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Text as="h2" variant="headingSm">
                Looking For Tips
              </Text>
              <Slider
                autoplay={false}
                navigation={true}
                sliderData={sliderData}
              />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card className="bb-card-wrapper" sectioned>
              <Text as="h2" variant="headingSm">
                Suggested Apps
              </Text>
              <SingleSlider
                autoplay={true}
                navigation={true}
                autoplayDelay={2000}
                sliderData={data.widgets}
                slideRenderer={(item) => (
                  <SingleWidget
                    widget={item}
                    handleAddToFavorite={handleAddToFavorite}
                  />
                )}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
