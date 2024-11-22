import React from 'react'
import Analytics from '../../components/templates/Analytics'
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from '@remix-run/react';
import { getEventTypes, getShopName } from '../../utils/function';
import { authenticate } from '../../shopify.server';

export async function loader({ request }) {
  try {
    const {session} = await authenticate.admin(request);
    const url = new URL(request.url);
    const appId = parseInt(url.searchParams.get('appId'));
    const fromDateString = url.searchParams.get('fromDate');
    const toDateString = url.searchParams.get('toDate');
    const shop = session.shop;

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

    if (!appId || !shop || !fromDateString || !toDateString) {
      return cors(request, { error: 'Missing required query parameters', apps }, { status: 400 });
    }

    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return cors(request, { error: 'Invalid date format', apps }, { status: 400 });
    }

    const activityIds = await getEventTypes(appId);

    const counts = await db.analytics.groupBy({
      by: ['activityId', 'createdAt'],
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

    const totalCountsByActivity = counts.reduce((acc, record) => {
      const activityId = record.activityId;
      const count = record._count.id;
    
      if (acc[activityId]) {
        acc[activityId] += count;
      } else {
        acc[activityId] = count;
      }
    
      return acc;
    }, {});

    const formattedCounts = activityIds.map((activityId) => {
      const activityData = [];
      counts.forEach((record) => {
        if (record.activityId === activityId) {
          const activityDate = new Date(record.createdAt).toLocaleDateString();
          const existingEntry = activityData.find(entry => entry.date === activityDate);
          
          if (existingEntry) {
            existingEntry.count += record._count.id;
          } else {
            activityData.push({
              date: activityDate,
              count: record._count.id
            });
          }
        }
      });

      activityData.sort((a, b) => new Date(a.date) - new Date(b.date));

      return {
        activityId,
        activityData,
        totalCount: totalCountsByActivity[activityId] || 0
      };
    });

    return cors(request, { analytics: formattedCounts, apps });

  } catch (error) {
    return cors(request, { error: 'An error occurred while processing your request' }, { status: 500 });
  }
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
   <Analytics apps={apps.apps} showAppSelection={true}/>
  )
}

export default GlobalAnalytics