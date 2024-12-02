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
    const { session } = await authenticate.admin(request);
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
            id: true
          }
        }
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
      const lastDay = new Date(toDate);
      lastDay.setHours(0, 0, 0, 0);

      const secondToLastDay = new Date(lastDay);
      secondToLastDay.setDate(lastDay.getDate() - 1);

      let lastDayCount = 0;
      let secondToLastDayCount = 0;

      counts.forEach((record) => {
        const recordDate = new Date(record.createdAt).toLocaleDateString();
        if (record.activityId === activityId) {
          if (recordDate === lastDay.toLocaleDateString()) {
            lastDayCount += record._count.id;
          }
          else if (recordDate === secondToLastDay.toLocaleDateString()) {
            secondToLastDayCount += record._count.id;
          }
        }
      });

      let percentageChange = null;
      if (secondToLastDayCount > 0) {
        percentageChange = ((lastDayCount - secondToLastDayCount) / secondToLastDayCount) * 100;
        percentageChange = percentageChange.toFixed(2);
      } else if (lastDayCount > 0) {
        percentageChange = 100;
      } else {
        percentageChange = 0;
      }

      return {
        activityId,
        activityData: [
          {
            date: lastDay.toLocaleDateString(),
            count: lastDayCount
          },
          {
            date: secondToLastDay.toLocaleDateString(),
            count: secondToLastDayCount
          }
        ],
        isIncremented: (percentageChange > 0 ? true:false),
        percentageChange: (Math.abs(percentageChange) || 0) +'%',
        totalCount: totalCountsByActivity[activityId] || 0
      };
    });


    return cors(request, { analytics: formattedCounts, apps });

  } catch (error) {
    console.error('Error occurred:', error);
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