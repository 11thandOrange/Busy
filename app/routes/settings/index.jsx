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