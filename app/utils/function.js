import db from '../db.server'
import { authenticate, STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN } from "../shopify.server";


export const getShopName = async(request) => {
  let parsedUrl;
  if(request.method=='GET')
  {
    parsedUrl = new URL(request.url);
  }
  else
  {
    parsedUrl = new URL(request.headers.get('referer'));
  }
  const shop = parsedUrl.searchParams.get("shop");
  if (shop) {
    return shop;
  }
  return '';
}
export const getCategories = async() =>{
  try{
    const categories = await db.Category.findMany({
      select: {
        id: true,
        content: true,
      },
    });
    return categories;
  }catch(error)
  {
    return [];
  }
}
export const check_app_active = async (appId, shop) => {
    try {
      const setting = await db.merchant.findFirst({
        where: {
          appId: appId,
          shop: shop,
          enabled: true,
        },
      });
      return setting !== null;
    } catch (error) {
      return false;
    }
  };

export const check_subscription = async () =>
{
  const { billing, session } = await authenticate.admin(request);
  const billingCheck = await billing.check({ plans: [STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN] });
  if (!billingCheck.appSubscriptions || billingCheck.appSubscriptions.length === 0) {
    return {
      hasSubscription: false,
    };
  }
  const subscription = billingCheck.appSubscriptions[0];
  console.log('Subscription found:', subscription);

  return {
    hasSubscription: true,
    subscription,
  };
}

export const markWidgetAsFavorite = async(shop, widgetId) => {
  try {
    const existingFavorite = await db.fav_widget.findUnique({
      where: {
        widgetId_shop:{
          shop: shop,
          widgetId: widgetId,
        }
      },
    });

    if (existingFavorite) {
      await db.fav_widget.delete({
        where: {
          widgetId_shop: {
            shop: shop,
            widgetId: widgetId,
          },
        },
      });
      return false;
    }

    const favorite = await db.fav_widget.create({
      data: {
        shop: shop,
        widgetId: widgetId,
      },
    });

    return favorite;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export const createEvent = async(data) => {
  await db.analytics.create({
    data:{
      eventId: data.eventId,
    }
  });
}
export  function getTimeDifference(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const differenceInMilliseconds = end - start;

  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
  
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
export const getEventTypes = async (appId) => {
  const eventTypes = await db.app.findFirst({
    where: {
      id: appId,
    },
    include: {
      activities: {
        select: {
          id: true
        }
      }
    },
  });
  if (!eventTypes) return [];
  const activityIds = eventTypes.activities.map(activity => activity.id);
  return activityIds;
};

export const getAnnouncementBar = async (shop) => {
  let script = '';

  // Fetch announcement bar from the database
  const announcement_bar = await prisma.announcement_bar.findFirst({
    where: {
      shop: shop,
      status: true
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  if (announcement_bar && announcement_bar.status) {
    // Parse JSON settings
    announcement_bar.general_setting = JSON.parse(announcement_bar.general_setting);
    announcement_bar.theme_setting = JSON.parse(announcement_bar.theme_setting);
    announcement_bar.theme_style = JSON.parse(announcement_bar.theme_style);

    // Start building the script to create the announcement bar
    script = `
      const announcementBar = document.createElement('div');
      announcementBar.classList.add('busy-buddy-announcement-bar');
      announcementBar.id = 'busyBuddyAnnouncementBar'; 
      announcementBar.style.padding = '10px';
      announcementBar.style.textAlign = 'center';
      announcementBar.style.fontWeight = 'bold';
      announcementBar.style.height = '45px';
      announcementBar.style.width = '100%';
    `;
    
    if (announcement_bar.type == 1) {
      script += `announcementBar.textContent = "${announcement_bar.general_setting.message.replace(/"/g, '\\"')}";`
    }

    if (announcement_bar.type == 2) { 
      // Set countdown start time to the current time
      const currentTime = new Date().getTime(); // Current time in milliseconds
      const endTime = new Date(announcement_bar.general_setting.countDownEndsAt).getTime(); // Countdown end time in milliseconds

      script += `
        function getTimeDifference(startAt, endsAt) {
          const difference = endsAt - startAt; // Time difference in milliseconds
          
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
          return { days, hours, minutes, seconds, difference };
        }

        function updateCountdown() {
          // Update the current time
          const now = new Date().getTime();
          
          let difference = getTimeDifference(now, ${endTime});
          
          // Update the announcement bar text
          let countdownString = \`<span style="color:${announcement_bar.theme_setting.specialColor}; !important">\${difference.days}d \${difference.hours}h \${difference.minutes}m \${difference.seconds}s</span>\`;
          let message = ("${announcement_bar.general_setting.message}").replace('#countdown_timer#', countdownString);
          announcementBar.innerHTML = message;

          if (document.getElementById('busyBuddyAnnouncementBar')) {
            countdownString = \`<span style="color:${announcement_bar.theme_setting.specialColor}; !important">\${difference.days}d  \${difference.hours}h  \${difference.minutes}m  \${difference.seconds}s</span>\`;
            message = ("${announcement_bar.general_setting.message}").replace('#countdown_timer#', countdownString);
            announcementBar.innerHTML = message;
          }

          if (difference.difference <= 0) {
            clearInterval(countdownInterval);
            announcementBar.textContent = "Countdown Finished!";
            if (document.getElementById('busyBuddyAnnouncementBar')) {
              document.getElementById('busyBuddyAnnouncementBar').innerHTML = "Countdown Finished!";
            }
          }
        }
        updateCountdown();

        let countdownInterval = setInterval(updateCountdown, 1000);
      `;
    }

    if (announcement_bar.theme_style?.id == 1) {
      script += `announcementBar.style.backgroundColor = "${announcement_bar.theme_setting?.backgroundColor}";
                  announcementBar.style.color = "${announcement_bar.theme_setting?.textColor}";`
    }

    if (announcement_bar.theme_style?.id == 2) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-2');`
    }

    if (announcement_bar.theme_style?.id == 3) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-3');`
    }

    // Check if the announcement bar should be fixed at the top
    if (announcement_bar.theme_setting?.status == 'TOP_FIXED') {
      script += `
        announcementBar.style.position = 'sticky';
        announcementBar.style.top = '0'; 
        announcementBar.style.left = '0'; 
        announcementBar.style.zIndex = '9999';
      `;
    }

    if (announcement_bar.theme_setting?.status == 'BOTTOM') {
      script += ` document.body.appendChild(announcementBar);`;
    } else {
      script += `document.body.prepend(announcementBar);`;
    }
  }

  return { script };
};



export const getInactiveTabMessage = async(shop) => {
  let message = await db.Inactive_tab_message.findFirst({
    where:{
      shop:shop
    },
    select:{
      message: true
    }
  })
  message = message ? message.message : ""
  const script = `
    (function() {
      var originalTitle = document.title;
      function handleVisibilityChange() {
        if (document.hidden) {
          document.title = "${message}";
        } 
          else {
          document.title = originalTitle;
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      if (document.hidden) {
        document.title = "${message}";
      }
    })();
  `;
  return {script};
}
export const getCartNotice = async(shop) => {
  let cartNotice = await db.Cart_notice.findFirst({
    where:{
      shop:shop
    },
    select:{
      primary_message: true,
      secondary_message: true,
      general_setting:true
    }
  })
  cartNotice = cartNotice ? cartNotice.primary_message : ""
  const script = `
    (function() {
      const form = document.querySelector('form[action="/cart"]');
      if (form) {
        const htmlToInsert = '<div class="cart-notice">"${cartNotice}"</div>';
        form.insertAdjacentHTML('beforebegin', htmlToInsert);
      }
    })();
  `;
  return {script};
} 
export const getCountdownTimer = async(shop) => {
  let script;
  let countdownTimer = await db.countdown_timer.findFirst({
    where:{
      shop:shop
    },
    select:{
      html: true,
      general_setting: true,
      display_setting:true,
      position:true
    }
  })
  if(countdownTimer)
  {
    countdownTimer.general_setting = JSON.parse(countdownTimer.general_setting)
    countdownTimer.html = countdownTimer.html.replace('{{message}}', countdownTimer.general_setting.message);
    script = `
      (function() {
        const form = document.querySelector('.product__info-wrapper');
        if (form) {
          const htmlToInsert = '<div class="countdown-timer">"${countdownTimer.html}"</div>';
          form.insertAdjacentHTML('beforeend', htmlToInsert);
        }
      })();
    `;
  }
  
  return {script};
} 