import React from 'react'
import GlobalSettings from '../../components/templates/GlobalSettings'
import GoBack from '../../components/atoms/GoBack'
import db from '../../db.server'
import { getShopName } from '../../utils/function';
import { cors } from 'remix-utils/cors';

export const loader = async ({ request }) => {
  let shop = await getShopName(request)
  let setting = await db.setting.findFirst({
    where:{
      shop:shop
    }
  });
  return cors(request, setting || {});
  };
  
  export const action = async ({ request }) => { 
    const shop = await getShopName(request);
    let settings = await request.formData();
    settings = Object.fromEntries(settings);
    const admin_language = data.admin_language;
    const lazy_load_images = data.lazy_load_images;
    const change_setting = data.change_setting;
    const color_theme = data.color_theme;
    const global_customizations = data.global_customizations;

    await db.wishlist.upsert({
      where: {
        shop: shop
      },
      create: {
        admin_language,
        lazy_load_images,
        change_setting,
        color_theme,
        global_customizations,
        shop
      },
      update: {
        admin_language,
        lazy_load_images,
        change_setting,
        color_theme,
        global_customizations
      },
    });
    

    response = json({ message: "Setting Updated", success: true });
    return cors(request, response);  
  };

const Settings = () => {
  return (
    <>
        <GoBack/>
        <GlobalSettings/>
    </>
  )
}

export default Settings