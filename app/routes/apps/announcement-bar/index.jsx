import React from 'react'
import db from '../../../db.server';
import { getShopName } from '../../../utils/function';
import { useLoaderData } from '@remix-run/react';
import { cors } from 'remix-utils/cors';

export const loader = async ({ request }) => {
  let shop = await getShopName(request);
  let announcement_bars = await db.announcement_bar.findMany({
    where:{
      shop: shop
    },
    select:{
      id: true,
      name: true,       
      status : true,
      general_setting: true,
      theme_style: true,
      theme_setting: true
    }
  });
  return cors(request, announcement_bars);
}

export const action = async({request}) => {
  let announcement_bar = await request.formData();
  announcement_bar = Object.fromEntries(inactive_tab_message);
  const shop = await getShopName(request)
    await db.announcement_bar.create({
      data: {
        message: announcement_bar.name,
        shop: shop
      }
    });
}
  

const AnnouncementBar = () => {
  const announcement_bars = useLoaderData();
  return (
    <div>AnnouncementBar dd</div>
  )
}

export default AnnouncementBar