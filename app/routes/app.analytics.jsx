import { cors } from 'remix-utils/cors';
import db from '../db.server';
import { getEventTypes, getShopName } from '../utils/function';

export async function loader({ request }) {
  const shop = await getShopName(request)
  const url = new URL(request.url);
  const appId = parseInt(url.searchParams.get('appId'));
  const fromDate = new Date(url.searchParams.get('analytics.fromDate'));
  const toDate = new Date(url.searchParams.get('analytics.toDate'));  
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