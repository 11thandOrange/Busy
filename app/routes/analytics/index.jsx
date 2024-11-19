import React from 'react'
import Analytics from '../../components/templates/Analytics'
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from '@remix-run/react';
import { getEventTypes, getShopName } from '../../utils/function';

export async function loader({ request }) {
  const shop = await getShopName(request)
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get('appId'));
  const fromDate = new Date(url.searchParams.get('analytics.fromDate'));
  const toDate = new Date(url.searchParams.get('analytics.toDate'));  // 2024-01-01
  const activityIds = await getEventTypes(appId);

  const counts = await db.analytics.groupBy({
    by: ['activityId'],
    where: {
      appId: appId,
      shop: shop,
      activityId: { in: activityIds },
      createdAt: {
        gte: fromDate,
        lte: toDate
      }
    },
    _count: {
      id: true
    }
  });
  
  const formattedCounts = activityIds.map((activityId) => {
    const record = counts.find((count) => count.activityId === activityId);
    return {
      appId: appId,
      activityId: activityId,
      count: record ? record._count.id : 0
    };
  });
  
  return cors(request, {analytics: formattedCounts});
}
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