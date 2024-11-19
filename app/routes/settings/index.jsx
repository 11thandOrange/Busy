import React from 'react'
import GlobalSettings from '../../components/templates/GlobalSettings'
import GoBack from '../../components/atoms/GoBack'
import db from '../../db.server'
import { getShopName } from '../../utils/function';
import { cors } from 'remix-utils/cors';
import { useLoaderData } from '@remix-run/react';
import { json } from "@remix-run/node";

  export const loader = async ({ request }) => {
    let shop = await getShopName(request)
    let setting = await db.setting.findFirst({
      where:{
        shop:shop
      }
    });
    return cors(request, setting || {
      admin_language : "English",
      lazy_load_images: false,
      change_setting: false,
      color_theme: 'light'
    });
  };
  
  export const action = async ({ request }) => { 
    let response = {}
    const shop = await getShopName(request);
    let settings = await request.formData();
    settings = Object.fromEntries(settings);
    const admin_language = settings.admin_language;
    const lazy_load_images = Boolean(settings.lazy_load_images);
    const change_setting = Boolean(settings.change_setting);
    const color_theme = settings.color_theme;
    const global_customizations = settings.global_customizations;

    await db.Setting.upsert({
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
  const settings = useLoaderData();
  return (
    <>
        <GoBack/>
        <GlobalSettings settings={settings}/>
    </>
  )
}

export default Settings