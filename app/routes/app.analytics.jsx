import { cors } from 'remix-utils/cors';
import db from '../db.server';
import { getEventTypes } from '../utils/function';
import { json } from '@remix-run/node';

export async function loader({ request }) {
  if (request.method === "OPTIONS") {
    const response = json({
      status: 200,
    });
    return await cors(request, response);
  }
  try {
    
    const url = new URL(request.url);
    const appId = parseInt(url.searchParams.get('appId'));
    const shop = url.searchParams.get('shop');
    const fromDateString = url.searchParams.get('fromDate');
    const toDateString = url.searchParams.get('toDate');

    if (!appId || !shop || !fromDateString || !toDateString) {
      return cors(request, { error: 'Missing required query parameters' }, { status: 400 });
    }

    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return cors(request, { error: 'Invalid date format' }, { status: 400 });
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

    const formattedCounts = activityIds.map((activityId) => {
      const activityData = [];
      counts.forEach((record) => {
        if (record.activityId === activityId) {
          const activityDate = new Date(record.createdAt).toLocaleDateString();
          const existingEntry = activityData.find(entry => entry.date === activityDate);

          if (existingEntry) {
            existingEntry.count += record._count.id;
          }
          else {
            activityData.push({
              date: activityDate,
              count: record._count.id
            });
          }
        }
      });

      activityData.sort((a, b) => new Date(b.date) - new Date(a.date));

      return {
        activityId,
        activityData
      };
    });

    return cors(request, { analytics: formattedCounts });

  } catch (error) {
    return cors(request, { error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

export const action = async ({ request }) => {
  if (request.method === "OPTIONS") {
    const response = json({
      status: 200,
    });
    return await cors(request, response);
  }
  let response;
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
  return cors(request, response, { methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"] });
};