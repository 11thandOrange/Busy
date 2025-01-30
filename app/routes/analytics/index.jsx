import React from "react";
import Analytics from "../../components/templates/Analytics";
import db from "../../db.server";
import { cors } from "remix-utils/cors";
import { useLoaderData } from "@remix-run/react";
import { getEventTypes } from "../../utils/function";
import { authenticate } from "../../shopify.server";
import GoBack from "../../components/atoms/GoBack";

function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export async function loader({ request }) {
  try {
    const { session } = await authenticate.admin(request);
    const url = new URL(request.url);
    const appId = parseInt(url.searchParams.get("appId"));
    const fromDateString = url.searchParams.get("fromDate");
    const toDateString = url.searchParams.get("toDate");
    const shop = session.shop;

    let apps = await db.app.findMany({
      where: {
        activities: {
          some: {},
        },
      },
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
      return {
        id: app.id,
        name: app.name,
      };
    });

    if (!appId || !fromDateString || !toDateString) {
      return cors(
        request,
        { error: "Missing required query parameters", apps },
        { status: 400 },
      );
    }

    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return cors(
        request,
        { error: "Invalid date format", apps },
        { status: 400 },
      );
    }

    const activityIds = await getEventTypes(appId);

    const counts = await db.analytics.groupBy({
      by: ["activityId", "createdAt"],
      where: {
        appId: appId,
        shop: shop,
        activityId: { in: activityIds },
        createdAt: {
          gte: new Date(fromDate.setHours(0, 0, 0, 0)),
          lte: new Date(toDate.setHours(23, 59, 59, 999)),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      _count: {
        id: true,
      },
    });

    const analyticsData = activityIds.map((activityId) => {
      const dailyCounts = {};

      for (
        let date = new Date(fromDate);
        date <= toDate;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = formatDate(date);
        dailyCounts[formattedDate] = 0;
      }

      counts.forEach((record) => {
        if (record.activityId === activityId) {
          const recordDate = formatDate(new Date(record.createdAt));
          if (dailyCounts[recordDate] !== undefined) {
            dailyCounts[recordDate] += record._count.id;
          }
        }
      });

      const formattedDailyCounts = Object.entries(dailyCounts).map(
        ([date, count]) => ({ date, count })
      );

      let percentageChange = 0;
      if (formattedDailyCounts.length >= 2) {
        const yesterday = formattedDailyCounts[formattedDailyCounts.length - 2];
        const today = formattedDailyCounts[formattedDailyCounts.length - 1];

        if (yesterday.count > 0) {
          percentageChange = ((today.count - yesterday.count) / yesterday.count) * 100;
        } else {
          percentageChange = today.count > 0 ? 100 : 0;
        }
      }

      return {
        activityId,
        activityData: formattedDailyCounts,
        isIncremented: percentageChange.toFixed(2) > 0 ? true : false,
        percentageChange: Math.abs(percentageChange.toFixed(2)),
        totalCount: formattedDailyCounts.reduce((sum, entry) => sum + entry.count, 0),
      };
    });

    return cors(request, { analytics: analyticsData, apps });
  } catch (error) {
    console.error("Error occurred:", error);
    return cors(
      request,
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
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
      shop,
    },
  });
  response = json({ message: "Analytics", success: true });
  return cors(request, response);
};
const GlobalAnalytics = () => {
  const apps = useLoaderData();
 

  return (
    <>
      <GoBack />
      <Analytics apps={apps.apps} showAppSelection={true} />
    </>
  );
};

export default GlobalAnalytics;
