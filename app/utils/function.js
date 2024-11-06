import db from '../db.server'

export const check_active = async (setting_name, shop) => {
    try {
      const setting = await db.setting.findFirst({
        where: {
          name: setting_name,
          shop: shop,
          isActive: true,
        },
      });
  
      return setting !== null;
    } catch (error) {
      console.error('Error checking setting:', error);
      return false;
    }
  };