import {
    LegacyCard,
    Tabs,
    TextField,
    Button,
    Icon,
    ResourceList,
    ResourceItem,
    Badge,
    EmptyState,
    AppProvider,
    // TextStyle,
    // Badge,
  } from "@shopify/polaris";
  import { SearchIcon } from "@shopify/polaris-icons";
  import { useState, useCallback } from "react";
  import DynamicEmptyState from "../../components/atoms/DynamicEmptyState";
  import "@shopify/polaris/build/esm/styles.css";
  import AppListingTemplate from "../../components/templates/AppListingTemplate.jsx/index.";
  import { APP_TABS } from "../../utils/constants";
  import AppsRenderList from "../../components/atoms/AppsRenderList";
  import { cors } from 'remix-utils/cors';
  import db from "../../db.server";
  import { useLoaderData } from "@remix-run/react";
  import { useFetcher } from "@remix-run/react"; 
  import { getCategories, getShopName } from "../../utils/function";
  import GoBack from "../../components/atoms/GoBack";
  
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
      categoryId: app.categoryId,
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
  
  const tabs = [
    { id: "all", content: "All" },
    { id: "my-apps", content: "My apps" },
    { id: "boost-sales", content: "Boost Sales" },
    { id: "ux", content: "UX" },
    { id: "engage-users", content: "Engage Users" },
    { id: "social", content: "Social" },
  ];
  
  const items = [
    {
      id: "1",
      category: ["boost-sales", "ux"],
      title: "Cart Notice",
      description:
        "Easily collect, import and display reviews with photos and boost trust and conversion rates with social proof.",
      status: "Active",
    },
    {
      id: "2",
      category: ["boost-sales"],
      title: "Countdown Timer",
      description:
        "Create social proof by showing notifications regarding your recent orders and products being added to cart.",
    },
    {
      id: "3",
      category: ["engage-users", "ux"],
      title: "Announcement Bars",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
    {
      id: "4",
      category: [],
      title: "Inactive Tab",
      description:
        "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
    },
  ];
  
  function TabsInsideOfACardExample() {
  const apps = useLoaderData();
  
    return (
      <>
      {JSON.stringify(apps)}
      <GoBack/>
      <AppListingTemplate tabs={APP_TABS} list={items} componentToRender={(props) => <AppsRenderList {...props}/>}/>
      </>
    );
  }
  
  export default TabsInsideOfACardExample;
  