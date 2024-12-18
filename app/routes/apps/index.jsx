
  import { useState, useCallback, useEffect } from "react";
  import "@shopify/polaris/build/esm/styles.css";
  import AppListingTemplate from "../../components/templates/AppListingTemplate.jsx/index.";
  import AppsRenderList from "../../components/atoms/AppsRenderList";
  import { cors } from 'remix-utils/cors';
  import db from "../../db.server";
  import { useLoaderData } from "@remix-run/react";
  import { getCategories, getShopName } from "../../utils/function";
  import GoBack from "../../components/atoms/GoBack";
import { CATEGORIES_ENUM } from "../../utils/constants";
  
export const loader = async ({ request }) => {
  let apps = await db.app.findMany({
    include: {
      Merchant: true,
    },
  });
  apps = apps.map((app) => {
    const isInstalled = app.Merchant.some((merchant) => merchant.enabled);
  
    return {
      id: app.id,
      name: app.name,
      description: app.description,
      categoryId: app.categoryId ? [app.categoryId] : [],
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      isInstalled,
    };
  });
  
  const response = {apps, categories : await getCategories()};
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
  
  function TabsInsideOfACardExample() {
    const apps = useLoaderData();
    const [tabs, setTabs] = useState([]);
    const [appsList, setAppsList] = useState([])

    useEffect(() => {
      console.log(apps, "apps");
      setTabs(apps.categories.filter(item => item.id != CATEGORIES_ENUM.favorites));
      setAppsList(apps.apps)
    }, [])

    return (
      <>
        <GoBack/>
        <AppListingTemplate tabs={tabs} list={appsList} componentToRender={(props) => <AppsRenderList {...props}/>}/>
      </>
    );
  }
  
  export default TabsInsideOfACardExample;
  