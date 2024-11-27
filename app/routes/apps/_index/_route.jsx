import { useState, useCallback, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import AppListingTemplate from "../../../components/templates/AppListingTemplate.jsx/index.";
import AppsRenderList from "../../../components/atoms/AppsRenderList";
import { cors } from "remix-utils/cors";
import db from "../../../db.server";
import { useLoaderData } from "@remix-run/react";
import { getCategories, getShopName } from "../../../utils/function";
import GoBack from "../../../components/atoms/GoBack";
import { CATEGORIES_ENUM } from "../../../utils/constants";
import { authenticate } from "../../../shopify.server";

export const loader = async ({ request }) => {
  const {session} = await authenticate.admin(request);
  const shop = session.shop
  let apps = await db.app.findMany({
    include: {
      Merchant: true,
      categories: {
        select: {
          id: true,
        },
      },
    },
  });
  apps = apps.map((app) => {
    const isInstalled = app.Merchant.some((merchant) => merchant.enabled && merchant.shop == shop);

    return {
      id: app.id,
      name: app.name,
      description_title: app.description_title,
      description_content: app.description_content,
      image: app.image,
      categoryId: app.categories.map((item) => item.id),
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      isInstalled,
      slug: app.slug,
    };
  });

  const response = { apps, categories: await getCategories() };
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
    } 
    else 
    {
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

function TabsInsideOfACardExample() {
  const apps = useLoaderData();
  const [tabs, setTabs] = useState([]);
  const [appsList, setAppsList] = useState(null);

  useEffect(() => {
    setTabs(
      apps.categories.filter((item) => item.id != CATEGORIES_ENUM.favorites),
    );
    setAppsList(apps.apps);
  }, []);

  return (
    <>
      <GoBack backLink="/app" />
      <AppListingTemplate
        tabs={tabs}
        list={appsList}
        componentToRender={(props) => <AppsRenderList {...props} />}
      />
    </>
  );
}

export default TabsInsideOfACardExample;
