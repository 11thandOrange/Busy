import React from 'react'
import Analytics from '../../components/templates/Analytics'
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from '@remix-run/react';
import { getEventTypes } from '../../utils/function';
import { authenticate } from '../../shopify.server';
import GoBack from '../../components/atoms/GoBack';

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

    if (!appId || !fromDateString || !toDateString) {
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
          gte: new Date(fromDate.setHours(0, 0, 0, 0)),
          lte: new Date(toDate.setHours(23, 59, 59, 999))
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
console.log('test',formattedCounts)
    return cors(request, { analytics: formattedCounts, apps });

  } catch (error) {
    return cors(request, { error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

export const action = async ({ request }) => { 
  let analytics = await request.json();
  const activityId = analytics.activity;
  const pageUrl = analytics.pageUrl;
  const shop = analytics.shop;
  const appId = analytics.data.element;

  await db.analytics.create({
    data: {
      activityId,
      pageUrl,
      appId,
      shop
    }
  });
  response = json({ message: "Analytics", success: true });
  return cors(request, response);  
};
const GlobalAnalytics = () => {
  const apps = useLoaderData();
  console.log('analyticsnew', apps)

  return (
   <>
    <GoBack/>
    <Analytics apps={apps.apps} showAppSelection={true}/>
   </>
  )
}

export default GlobalAnalytics