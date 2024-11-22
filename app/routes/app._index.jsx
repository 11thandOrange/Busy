
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
} from "@shopify/polaris";


import { cors } from 'remix-utils/cors';
import db from "../db.server";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { getCategories, getShopName } from "../utils/function";
import Slider from "../components/atoms/Slider";
import SingleSlider from "../components/atoms/SingleSlider";
import SingleWidget from "../components/atoms/SingleWidget";

export const loader = async ({ request }) => {
  const shop  = await getShopName(request)
  let apps = await db.app.findMany({
    include: {
      Merchant: true,
      categories: {
        select: {
          id:true
        }
      },
    },
  });
  let widgets = await db.widget.findMany({
    include: {
      categories: {
        select: {
          id:true
        }
      },
      Fav_widget: {
        where: { shop: shop },
        select: {
          widgetId: true,
        },
      },
    },
  });
  widgets = widgets.map((widget) => {
    const isFavorite = widget.Fav_widget.length > 0
  
    return {
      id: widget.id,
      name: widget.name,
      description_title: widget.description_title,
      description_content: widget.description_content,
      image: widget.image,
      categoryId: widget.categories.map(item => item.id),
      isFavorite,
    };
  });
  apps = apps.map((app) => {
    const isInstalled = app.Merchant.some((merchant) => merchant.enabled);
  
    return {
      id: app.id,
      name: app.name,
      description: app.description,
      image:app.image,
      categoryId: app.categories.map(item => item.id),
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      isInstalled, 
    };
  });
  
  const response = {apps, categories : await getCategories(), widgets};
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

  const handleAddToFavorite = (widgetId) => {
    fetcher.submit(
      {
        widgetId: widgetId,
      },
      { method: "POST", action: "/widgets" }
    );
  }
console.log(data, "data main")
  return (
    <Page>
      <div className='header'>
        <img
          src="https://via.placeholder.com/100"
          alt="Logo"
          className='logo'
        />
        <div>
          <Text as="h1" variant="headingLg" className="title">
            Busy Buddy
          </Text>
          <Text as="p" className="subtitle">
            Every busy body needs busy buddy
          </Text>
        </div>
      </div>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card title="My Apps" sectioned>
              <Text as="h2" variant="headingSm">
                Essentials Apps
              </Text>
              <div className="apps_list">
                {data?.apps?.map(item => {
                 return (<div className="list-item">
                    <img src={item?.image}/>
                    <span>{item.name}</span>
                  </div>)
                })}
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Text as="h2" variant="headingSm">
                Looking For Tips
              </Text>
              <Slider autoplay={false} navigation={true}/>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card className="bb-card-wrapper" sectioned>
              <Text as="h2" variant="headingSm">
                Suggested Apps
              </Text>
              <SingleSlider autoplay={true} navigation={true} autoplayDelay={2000} sliderData={data.widgets} slideRenderer={(item) => <SingleWidget widget={item} handleAddToFavorite={handleAddToFavorite}/> }/>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
