import db from "../db.server";
import { DateTime } from "luxon";
import {
  authenticate,
  STARTER_MONTHLY_PLAN,
  PRO_MONTHLY_PLAN,
  ENTERPRISE_MONTHLY_PLAN,
} from "../shopify.server";
import { fetchTimeObject, pickRandomTime } from "./clientFunctions";
import { get_random_time, getCardCountdownTimer, getClassicCountdownTimer, getDividerCountdownTimer, getHexagonCountdownTimer, getModernCountdownTimer, getProgressBarCountdownTimer, getProgressCircleCountdownTimer } from "./countdown_timer/countdown_timer";

export const getShopName = async (request) => {
  let parsedUrl;
  if (request.method == "GET") {
    parsedUrl = new URL(request.url);
  } else {
    parsedUrl = new URL(request.headers.get("referer"));
  }
  const shop = parsedUrl.searchParams.get("shop");
  if (shop) {
    return shop;
  }
  return "";
};
export const getCategories = async () => {
  try {
    const categories = await db.Category.findMany({
      select: {
        id: true,
        content: true,
      },
    });
    return categories;
  } catch (error) {
    return [];
  }
};
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

export const check_subscription = async (request) => {
  const { billing, session } = await authenticate.admin(request);
  const billingCheck = await billing.check({
    plans: [STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN],
  });
  if (
    !billingCheck.appSubscriptions ||
    billingCheck.appSubscriptions.length === 0
  ) {
    return {
      hasSubscription: false,
    };
  }
  const subscription = billingCheck.appSubscriptions[0];
  console.log("Subscription found:", subscription);

  return {
    hasSubscription: true,
    subscription,
  };
};

export const markWidgetAsFavorite = async (shop, widgetId) => {
  try {
    const existingFavorite = await db.fav_widget.findUnique({
      where: {
        widgetId_shop: {
          shop: shop,
          widgetId: widgetId,
        },
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
};
export const createEvent = async (data) => {
  await db.analytics.create({
    data: {
      eventId: data.eventId,
    },
  });
};
export function getTimeDifference(startTime, endTime, timezone) {
  const start = DateTime.fromISO(startTime, { zone: timezone });
  const end = DateTime.fromISO(endTime, { zone: timezone });
  const diff = end.diff(start, ['days', 'hours', 'minutes', 'seconds']);

  return {
    days: diff.days,
    hours: diff.hours,
    minutes: diff.minutes,
    seconds: diff.seconds
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
          id: true,
        },
      },
    },
  });
  if (!eventTypes) return [];
  const activityIds = eventTypes.activities.map((activity) => activity.id);
  return activityIds;
};

export const getAnnouncementBar = async (shop, timezone) => {
  let script = '';
  const announcement_bar = await db.announcement_bar.findFirst({
    where: {
      shop: shop,
      status: true
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  if (announcement_bar && announcement_bar.status) {
    announcement_bar.general_setting = JSON.parse(announcement_bar.general_setting);
    announcement_bar.theme_setting = JSON.parse(announcement_bar.theme_setting);
    announcement_bar.theme_style = JSON.parse(announcement_bar.theme_style);

    script = `
     
      const announcementBar = document.createElement('div');
      announcementBar.classList.add('busyBuddyAnnouncementBar');
      announcementBar.id = 'busyBuddyAnnouncementBar'; 
      announcementBar.style.padding = '10px';
      announcementBar.style.textAlign = 'center';
      announcementBar.style.fontWeight = 'bold';
      announcementBar.style.height = '45px';
      announcementBar.style.width = '100%';
      announcementBar.style.position = 'relative'; /* Ensure space for the close button */
    `;
    
    if(await check_enable_button(shop))
    {
        script += `
        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.border = 'none';
        closeButton.style.background = 'transparent';
        closeButton.style.fontSize = '18px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = 'inherit';
        closeButton.style.fontWeight = 'bold';
        closeButton.addEventListener('click', function() {
          announcementBar.style.display = 'none';
        });
        announcementBar.appendChild(closeButton);
      `;
    }
    
    script += `
      const messageDiv = document.createElement('div');
      announcementBar.appendChild(messageDiv);
    `;
  
    if (announcement_bar.type == 1) {
      script += `
        messageDiv.textContent = "${announcement_bar.general_setting.message.replace(/"/g, '\\"')}";
      `;
    }

    if (announcement_bar.type == 2) { 
      const endTime = new Date(announcement_bar.general_setting.countDownEndsAt).getTime();

      script += `
        let countdownInterval;
        function updateCountdown() {
          const now = get_local_time();
          let difference = getTimeDifference(now, ${endTime});
          let countdownString = \`<span>\${difference.days}d \${difference.hours}h \${difference.minutes}m \${difference.seconds}s </span>\`;
          let message = ("${announcement_bar.general_setting.message}").replace('#countdown_timer#', countdownString);

          // Update only the message, not the close button
          messageDiv.innerHTML = message;

          if (difference.difference <= 0) {
            clearInterval(countdownInterval);
            announcementBar.innerHTML = "";
          }
        }
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);  // Start the countdown interval after its declaration
      `;
    }
    if(announcement_bar.type == 3)
      {
        const shipping_rule = await getShippingRule(shop);
        const getDomestingShipping = shipping_rule.find((shipping)=>shipping.name=='Domestic');
        const price = getDomestingShipping.price_based_shipping_rates;
        const free_price = price.find((pr)=> pr.price == 0);
        if(free_price.min_order_subtotal == null) return {script:''}
       
        
          script +=  `let shipping_price = ${free_price.min_order_subtotal}
                      get_cart_total(function(price){
                        if(price == 0)
                        {
                          messageDiv.textContent = "${announcement_bar.general_setting.message.replace('#amount#', free_price.min_order_subtotal)}";
                        }
                        else if(price != 0 && price < shipping_price)
                        {
                          let difference = Math.abs(price - shipping_price)
                          let message_content = "${announcement_bar.general_setting.progressMessage}"
                          messageDiv.textContent = message_content.replace('#amount#', difference);
                        }
                        else
                        {
                          messageDiv.textContent = "${announcement_bar.general_setting.finalMessage}";
                        }
        })
          `;
        
      }
    if(announcement_bar.type == 4)
    {
      const order_count = await getOrderCounter(shop);
      script += `
      messageDiv.textContent = "${announcement_bar.general_setting.message.replace('#orders_count#', order_count)}";`;
    }
    if (announcement_bar.type == 5) {
      script += `
        messageDiv.innerHTML = \`
          <div id="busyBuddySmartBarContainer" style="font-family: inherit;display:flex;justify-content:center;gap:10px;">
            <div id="busyBuddySmartBarContainerMessage">${announcement_bar.general_setting.message}</div>
            <form id="busyBuddySmartBarForm" style="display:flex;gap:10px;">
              <input type="text" id="busyBuddySmartBarInput" aria-label="Email address" class="bundle-input-email">
              <input type="button" class="bundle-btn-email" id="busyBuddySmartBarButton" style="
                background-color: ${announcement_bar.general_setting.buttonColor};
                color: ${announcement_bar.general_setting.buttonTextColor};
                border: 1px solid #dc0a0a;" value="${announcement_bar.general_setting.buttonText}">
            </form>
            <div class="bundle-invalid-email" style="color:red;"></div>                
          </div>
        \`;
      `;
    }
    
    if (announcement_bar.theme_style?.id == 1) {
      script += `announcementBar.style.backgroundColor = "${announcement_bar.theme_setting?.backgroundColor}";
                  announcementBar.style.color = "${announcement_bar.theme_setting?.textColor}";`
              
    }
    if (announcement_bar.theme_style?.id != 1) {
       script += `announcementBar.style.color = "#fff";`
    }
    if (announcement_bar.theme_style?.id == 2) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-2');`
    }

    if (announcement_bar.theme_style?.id == 3) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-3');`
    }
    if (announcement_bar.theme_style?.id == 4) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-4');`
    }
    if (announcement_bar.theme_style?.id == 5) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-5');`
    }
    if (announcement_bar.theme_style?.id == 6) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-6');`
    }
    if (announcement_bar.theme_style?.id == 7) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-7');`
    }
    if (announcement_bar.theme_style?.id == 8) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-8');`
    }

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

export const getInactiveTabMessage = async (shop) => {
  let message = await db.Inactive_tab_message.findFirst({
    where: {
      shop: shop,
    },
    select: {
      message: true,
    },
  });
  message = message ? message.message : "";
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
  return { script };
};
export const getCartNotice = async (shop) => {
  let htmlToInsert;
  let cartNotice = await db.Cart_notice.findFirst({
    where: {
      shop: shop,
    },
  });

  if(cartNotice)
  {
    cartNotice.general_setting = cartNotice.general_setting?JSON.parse(cartNotice.general_setting):''
    htmlToInsert = `<div id="busyBuddyCartNotice" class="di-flex busyBuddyCartNotice" style="background-color:${cartNotice.backgroundColor};color:${cartNotice.textColor};margin-top:${cartNotice.general_setting.marginTop}${cartNotice.general_setting.marginTopUnit};margin-bottom:${cartNotice.general_setting.marginBottom}${cartNotice.general_setting.marginBottomUnit};">`;
    htmlToInsert += `<div class="fireEmoji">${cartNotice.emojiToAdd}</div>`
    if (cartNotice.showCountdown) {
      const countdownTimer = parseInt(cartNotice.countdown_timer)*60;
      let minutes = Math.floor(countdownTimer / 60);
      let remainingSeconds = countdownTimer % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
      const countdownText = `<span class="busyBuddyCartReservedTimer" style="color: red;">${minutes}:${remainingSeconds}</span>`;
      cartNotice.primary_message = cartNotice.primary_message.replace('{{counter}}', countdownText);
      cartNotice.secondary_message = cartNotice.secondary_message.replace('{{counter}}', countdownText);
    }
    htmlToInsert += `<div class="cart-reserved-text-box" style="margin-left:20px;"><span id="cart_reserved_message">${cartNotice.primary_message}</span>
    <span class="cartReservedTimerText">${cartNotice.secondary_message}`;
   
      htmlToInsert += `</span></div></div>`;
  }
  
  const script = `
  (function() {
   get_cart(function(cart){
    if(cart.item_count!=0)
    {
        const forms = document.querySelectorAll('form[action="/cart"]');
        forms.forEach(function(form) {
          form.insertAdjacentHTML('beforebegin', \`${htmlToInsert}\`);
        });
        const countdownElements = document.querySelectorAll('.busyBuddyCartReservedTimer');
        if (countdownElements.length > 0) {
          countdownElements.forEach(function(countdownElement) {
            let countdownTime = ${cartNotice.showCountdown ? parseInt(cartNotice.countdown_timer) * 60 : 0};

            const countdownInterval = setInterval(function() {
              if (countdownTime > 0) {
                countdownTime--;
                  let minutes = Math.floor(countdownTime / 60);
                  let remainingSeconds = countdownTime % 60;
                  minutes = minutes < 10 ? '0' + minutes : minutes;
                  remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
                countdownElement.textContent = minutes+':'+remainingSeconds;
              } else {
                clearInterval(countdownInterval);
              const noticeElements = document.querySelectorAll('#busyBuddyCartNotice');
                  noticeElements.forEach(function(element) {
                  element.remove();
                });
              }
            }, 1000);
          });
        }
    }
  }) 
  })();
  `;
  return { script };
};

export const getCountdownTimer = async (shop, timezone) => {
  let countdownTimerHtml = '';
  let script;
 
  let countdownTimer = await db.countdown_timer.findFirst({
    where: {
      shop: shop,
    },
    select: {
      general_setting: true,
      display_setting: true
    },
  });
  if (countdownTimer) {
    countdownTimer.general_setting = JSON.parse(countdownTimer.general_setting);
    countdownTimer.display_setting = JSON.parse(countdownTimer.display_setting);
    if(countdownTimer.general_setting.status == 'EVERGREEN')
    {
      const randomTimeObject = pickRandomTime(countdownTimer.general_setting.minExpTime, countdownTimer.general_setting.maxExpTime);
      countdownTimer.general_setting.countDownStartAt = get_local_date(timezone);
      countdownTimer.general_setting.countDownEndsAt = get_random_time(randomTimeObject);
    }
  

      console.log(new Date(countdownTimer.general_setting.countDownEndsAt).getTime(), 'end time')
      const timeLeft = getTimeerDifference(get_local_time(timezone), new Date(countdownTimer.general_setting.countDownEndsAt).getTime());
      countdownTimerHtml += `
        <div style="margin-top:${countdownTimer.display_setting.marginTop}${countdownTimer.display_setting.marginTopUnit}; margin-bottom:${countdownTimer.display_setting.marginBottom}${countdownTimer.display_setting.marginBottomUnit};"
          class="busyBuddyCountdownTimer preview-card-container timer ${countdownTimer.display_setting.timerAlignment} ${
          countdownTimer.display_setting.theme !== 1 ? "align-column" : "align-row"}">
          <div class="main-countdown-title" style="color:${countdownTimer.display_setting.titleColor};">
            ${countdownTimer.display_setting.title}
          </div>
      `;
      console.log('check', countdownTimer.display_setting.theme)
    
      switch (countdownTimer.display_setting.theme) {
        case 'CLASSIC':
          countdownTimerHtml += getClassicCountdownTimer(timeLeft, countdownTimer);
          break;
        case 'HEXAGON_TIMER':
          countdownTimerHtml += getHexagonCountdownTimer(timeLeft, countdownTimer);
          break;
        case 'PROGRESS_CIRCLES':
          console.log(countdownTimer, 'circle')
          countdownTimerHtml += getProgressCircleCountdownTimer(timeLeft, countdownTimer);
          break;
        case 'CARDS':
          countdownTimerHtml += getCardCountdownTimer(timeLeft, countdownTimer);
          break;
        case 'MODERNS':
          console.log('teset done ')
          countdownTimerHtml += getModernCountdownTimer(timeLeft, countdownTimer);
          break;
        case 'PROGRESS_BAR':
          countdownTimerHtml += getProgressBarCountdownTimer(timeLeft, countdownTimer);
          break;
        case 'MINIMALIST':
          countdownTimerHtml += getDividerCountdownTimer(timeLeft, countdownTimer);
          break;
        default:
          break;
      }

      countdownTimerHtml += '</div>';
    
      script = `
        let countdownTimerInterval;
        function updateCountdownNew() {
          const now = get_local_time();
          const endTime = ${new Date(countdownTimer.general_setting.countDownEndsAt).getTime()};
          const difference = getCountTimeDifference(now, endTime);
          document.getElementById('seconds').textContent = difference.seconds;
          document.getElementById('minutes').textContent = difference.minutes;
          document.getElementById('hours').textContent = difference.hours;
          document.getElementById('days').textContent = difference.days;
          if (difference.difference <= 0) {
            document.getElementById('busyBuddyCountdownTimer').remove();
            clearInterval(countdownTimerInterval);
          }
        }
        
        (function() {
       
       
          const form = document.querySelector('.product-form');
          if (form) {
            const htmlToInsert = \`<div id="busyBuddyCountdownTimer" class="busyBuddyCountdownTimer">${countdownTimerHtml}</div>\`;
            form.insertAdjacentHTML('beforebegin', htmlToInsert);
            if("${countdownTimer.display_setting.theme}"=='PROGRESS_CIRCLES')
            {
              updateProgress(new Date("${countdownTimer.general_setting.countDownStartAt}").getTime(), new Date("${countdownTimer.general_setting.countDownEndsAt}").getTime())
              const timerInterval = setInterval(() => {
              updateProgress(new Date("${countdownTimer.general_setting.countDownStartAt}").getTime(), new Date("${countdownTimer.general_setting.countDownEndsAt}").getTime());
            }, 1000);      
            }
            else if("${countdownTimer.display_setting.theme}" == 'PROGRESS_BAR')
            {
             startCountdown("${countdownTimer.general_setting.countDownStartAt}", "${countdownTimer.general_setting.countDownEndsAt}", document.getElementById('progressBar'));
              countdownTimerInterval = setInterval(updateCountdownNew, 1000);
            }
           
            else
            {
              countdownTimerInterval = setInterval(updateCountdownNew, 1000);
            }
                
          }
        })();
      `;
    }
  

  return { script, discount_products:countdownTimer?.display_setting?.timerForDiscountedProducts };
};

export const check_enable_button = async (shop) => {
  try {
    const setting = await db.announcement_bar_setting.findFirst({
      where: {
        shop: shop,
        enable_close_button: true,
      },
    });
    return setting !== null;
  } 
  catch (error) {
    return false;
  }
};

export const can_active = async (request, shop) => {
  try {
    const setting = await db.merchant.findMany({
      where: {
        shop: shop,
        enabled: true,
      }
    });
    let hasSubscription =  check_subscription(request);
    if(!((await hasSubscription).hasSubscription))
    {
      return setting.count <= 1;
    }
    else
    {
      return setting.count <= 4 && (await hasSubscription).hasSubscription()?true:false;;
    }
  } 
  catch (error) 
  {
    return false;
  }
};
export const storefront_api = async (shop, url, method, query=null) => {
  const session = await db.session.findFirst({
    where: { shop: shop }
  });
  
  if (session) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'X-Shopify-Access-Token': session.accessToken,
          'Content-Type': 'application/json',
        },
        body: query
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Session not found' };
  }
}
export const getShippingRule = async(shop)=>{
  const shipping_rule = await storefront_api(shop, `https://${shop}/admin/api/2024-04/shipping_zones.json`, 'GET');
  return shipping_rule.data.shipping_zones;
}
export const getOrderCounter = async(shop)=>{
  const order_count = await storefront_api(shop, `https://${shop}/admin/api/2024-10/orders/count.json?status=any`, 'GET');
  if(order_count.success)
  {
    return order_count.data.count;
  }
  return 0;
}

export const addScriptTag = async(shop)=>{
  const scriptTag = await storefront_api(shop, `https://${shop}/admin/api/2024-10/script_tags.json`, 'GET', JSON.stringify({
    script_tag: {
      event: 'onload',
      src: `${process.env.SHOPIFY_APP_URL}/scripts/script.js`,
    },
  }));
}
function formatDate(date) {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const dd = String(date.getUTCDate()).padStart(2, '0'); 
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
function get_local_time(timezone)
{

  let localDate = new Date(); 
  const year = localDate.getUTCFullYear();  // Get the UTC year
  const month = localDate.getUTCMonth();  // Get the UTC month
  const day = localDate.getUTCDate();  // Get the UTC day
  const hours = localDate.getUTCHours();  // Get the UTC hours
  const minutes = localDate.getUTCMinutes();  // Get the UTC minutes
  const seconds = localDate.getUTCSeconds();  // Get the UTC seconds
  const milliseconds = localDate.getUTCMilliseconds(); 

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds)).getTime();
}
function get_local_date(timezone)
{
  let localTime = new Date();
  return formatDate(new Date(localTime))
}
function getTimeerDifference(startAt, endsAt) {
  let difference = endsAt - startAt;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days:0, hours:0, minutes:0, seconds:0, difference:0 };
}