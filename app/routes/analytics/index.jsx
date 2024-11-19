import React from 'react'
import Analytics from '../../components/templates/Analytics'
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ request }) => {
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
  apps = apps.map((app) => {  
    return {
      id: app.id,
      name: app.name,
    };
  });

  const response = {apps};
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
const GlobalAnalytics = () => {
  const apps = useLoaderData();

  return (
   <Analytics apps={apps.apps}/>
  )
}

export default GlobalAnalytics