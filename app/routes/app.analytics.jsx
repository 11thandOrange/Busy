import db from '../db.server';
import { getEventTypes } from '../utils/function';

export async function loader({ request }) {
  let data = await request.formData();
  data = Object.fromEntries(data);
  const appId = data.app;
  const shop = data.shop;
  
    const eventTypes = await getEventTypes(appId);
    const eventCounts = await db.analytics.groupBy({
        by: ['eventId'],
        where: {
          AND: [
            {
              OR: [
                { appId: appId },
                { appId: null },
              ],
            },
            {
              shop: shop,
            },
            {
              event: {
                type: {
                  in: eventTypes,
                },
              },
            },
          ],
        },
        _count: {
          eventId: true,
        },
      });
      
      
      const eventCountMap = eventCounts.reduce((acc, group) => {
        const eventType = group.event.type;
      
        if (!acc[eventType]) {
          acc[eventType] = 0;
        }
      
        acc[eventType] += group._count.eventId
        return acc;
      }, {});
    const response = json(eventCountMap);
    return cors(request, response);
  }


export async function action({ request }) {
    let data = await request.formData();
    data = Object.fromEntries(data);
    const type = data.type;
    const elementId = data.elementId;
    const time = data.time;
    const shop = data.shop;
    await db.analytics.create({
        data: {
            type: type,
            shop: shop,
            elementId: elementId,
            time: time,
        },
    });
  
    return json({status:'ok'});
  }