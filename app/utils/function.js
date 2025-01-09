import db from "../db.server";
import { DateTime } from "luxon";
import {
  authenticate,
  STARTER_MONTHLY_PLAN,
  PRO_MONTHLY_PLAN,
  ENTERPRISE_MONTHLY_PLAN,
} from "../shopify.server";
import fs from 'fs';
import path from 'path';

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
  const diff = end.diff(start, ["days", "hours", "minutes", "seconds"]);

  return {
    days: diff.days,
    hours: diff.hours,
    minutes: diff.minutes,
    seconds: diff.seconds,
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
  let script = "";
  const announcement_bar = await db.announcement_bar.findFirst({
    where: {
      shop: shop,
      status: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (announcement_bar && announcement_bar.status) {
    announcement_bar.general_setting = JSON.parse(
      announcement_bar.general_setting,
    );
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

    if (await check_enable_button(shop)) {
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
      const endTime = new Date(
        announcement_bar.general_setting.countDownEndsAt,
      ).getTime();

      script += `
        let countdownInterval;
        function updateCountdown() {
          const now = get_current_timestamp();
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
    if (announcement_bar.type == 3) {
      const shipping_rule = await getShippingRule(shop);
      const getDomestingShipping = shipping_rule.find(
        (shipping) => shipping.name == "Domestic",
      );
      const price = getDomestingShipping.price_based_shipping_rates;
      const free_price = price.find((pr) => pr.price == 0);
      if (free_price.min_order_subtotal == null) return { script: "" };

      script += `let shipping_price = ${free_price.min_order_subtotal}
                      get_cart_total(function(price){
                        if(price == 0)
                        {
                          messageDiv.textContent = "${announcement_bar.general_setting.message.replace("#amount#", free_price.min_order_subtotal)}";
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
    if (announcement_bar.type == 4) {
      const order_count = await getOrderCounter(shop);
      script += `
      messageDiv.textContent = "${announcement_bar.general_setting.message.replace("#orders_count#", order_count)}";`;
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
                  announcementBar.style.color = "${announcement_bar.theme_setting?.textColor}";`;
    }
    if (announcement_bar.theme_style?.id != 1) {
      script += `announcementBar.style.color = "#fff";`;
    }
    if (announcement_bar.theme_style?.id == 2) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-2');`;
    }

    if (announcement_bar.theme_style?.id == 3) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-3');`;
    }
    if (announcement_bar.theme_style?.id == 4) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-4');`;
    }
    if (announcement_bar.theme_style?.id == 5) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-5');`;
    }
    if (announcement_bar.theme_style?.id == 6) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-6');`;
    }
    if (announcement_bar.theme_style?.id == 7) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-7');`;
    }
    if (announcement_bar.theme_style?.id == 8) {
      script += `announcementBar.classList.add('busy-buddy-announcement-bar-8');`;
    }

    if (announcement_bar.theme_setting?.status == "TOP_FIXED") {
      script += `
        announcementBar.style.position = 'sticky';
        announcementBar.style.top = '0'; 
        announcementBar.style.left = '0'; 
        announcementBar.style.zIndex = '9999';
      `;
    }

    if (announcement_bar.theme_setting?.status == "BOTTOM") {
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

  if (cartNotice) {
    cartNotice.general_setting = cartNotice.general_setting
      ? JSON.parse(cartNotice.general_setting)
      : "";
    htmlToInsert = `<div id="busyBuddyCartNotice" class="di-flex busyBuddyCartNotice" style="background-color:${cartNotice.backgroundColor};color:${cartNotice.textColor};margin-top:${cartNotice.general_setting.marginTop}${cartNotice.general_setting.marginTopUnit};margin-bottom:${cartNotice.general_setting.marginBottom}${cartNotice.general_setting.marginBottomUnit};">`;
    if (cartNotice.emojiToAdd != null) {
      htmlToInsert += `<div class="fireEmoji">${cartNotice.emojiToAdd}</div>`;
    }
    if (cartNotice.showCountdown) {
      const countdownTimer = parseInt(cartNotice.countdown_timer) * 60;
      let minutes = Math.floor(countdownTimer / 60);
      let remainingSeconds = countdownTimer % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      remainingSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      const countdownText = `<span class="busyBuddyCartReservedTimer" style="color: red;">${minutes}:${remainingSeconds}</span>`;
      cartNotice.primary_message = cartNotice.primary_message.replace(
        "{{counter}}",
        countdownText,
      );
      cartNotice.secondary_message = cartNotice.secondary_message.replace(
        "{{counter}}",
        countdownText,
      );
    } else {
      cartNotice.primary_message = cartNotice.primary_message.replace(
        "{{counter}}",
        "",
      );
      cartNotice.secondary_message = cartNotice.secondary_message.replace(
        "{{counter}}",
        "",
      );
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
  let countdownTimerHtml = "";
  let script;

  let countdownTimer = await db.countdown_timer.findFirst({
    where: {
      shop: shop,
    },
    select: {
      general_setting: true,
      display_setting: true,
    },
  });
  script = ``;

  return {
    script,
    discount_products:
      countdownTimer?.display_setting?.timerForDiscountedProducts,
    countdownTimer: countdownTimer,
  };
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
  } catch (error) {
    return false;
  }
};
export const getSendAsGift = async (shop, productId = '') => {
  let script = "";
  let giftWrapHTML = "";
  const gifts = await db.gift.findMany({
    where: {
      shop: shop,
      OR: [
        {
          selectionType: '1',
        },
        {
          selectedProductList: {
            contains: productId.toString(),
          },
        },
      ],
    },
  });
  
  const giftCustomization = await db.giftCustomization.findFirst({
    where: {
      shop: shop,
    },
  });
  const giftSetting = await db.giftSetting.findFirst({
    where: {
      shop: shop,
    },
  });
  
  
  
  gifts.forEach((option, index) => {
    const wrapProductId = option.wrapProductId;
    const wrapProductIdMatch = wrapProductId && typeof wrapProductId === 'string' ? wrapProductId.match(/(\d+)$/) : null;
    option.wrapProductId = wrapProductIdMatch ? wrapProductIdMatch[0] : null
    option.giftWrapImage =  process.env.SHOPIFY_APP_URL + option.giftWrapImage,
    giftWrapHTML += `
    <div class="accordion-main-wrapper">
      <input type="radio" name="giftWrapData" value="${option.wrapProductId}" class="giftWrapRadio" id="giftWrapAccordions${index}">
      <label for="giftWrapAccordions${index}">
          <div class="parent-accordion">
                <div class="parent-accordion-header">
                    <div style="color:${option.giftWrapCustomizationColor}">${option.giftWrapCustomizationText}</div>
                    <div class="parent-accordion-arrow">&#x25BC;</div>
                </div>
                <div class="parent-accordion-content">
                    <div class="send-as-gift-preview-wrapper">
                        <div key="1">
                            <div class="accordion-header">
                                <div class="giftCardPreview_wrapper">
                                    <div class="accordion-icon">${option.giftWrapCustomizationEmoji}</div>
                                    <div class="accordion-title">${option.giftWrapCustomizationText}</div>
                                </div>
                                <div class="accordion-arrow">&#x25BC;</div>
                            </div>
                            <div class="accordion-content">
                                <div class="content-container">
                                    <div class="title-price-container">
                                        <div class="gift-title">${option.giftWrapTitle}</div>
                                        <div class="gift-price">$${giftSetting.showDecimalPoints?option.giftWrapPrice:option.giftWrapPrice.toFixed(0)}</div>
                                    </div>
                                    <img class="gift-image" src="${option.giftWrapImage}" alt="Gift Wrap">
                                </div>
                            </div>
                        </div>`;
    if(option.enableGiftMessage)
    {
      giftWrapHTML += `<div key="4">
                            <div class="accordion-header">
                                <div class="giftCardPreview_wrapper" style="color:${option.giftMessageCustomizationColor}">
                                    <div class="accordion-icon">${option.giftMessageCustomizationEmoji}</div>
                                    <div class="accordion-title">${option.giftMessageCustomizationText}</div>
                                </div>
                                <div class="accordion-arrow">&#x25BC;</div>
                            </div>
                            <div class="accordion-content">
                                <div class="content-container">
                                    <div class="title-price-container bb_giftMessagePreview">
                                    <div class="gift-title">${option.giftMessageTitle}</div>
                                    <div class="gift-price">${option.giftMessageDescription}</div>
                                    <label for="gift-message">Message</label>
                                    <input type="text" id="giftMessage${option.wrapProductId}">
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    if(option.enableGiftReceipt)
    {
      giftWrapHTML += `<div key="2">
                            <div class="accordion-header">
                                <div class="giftCardPreview_wrapper" style="color:${option.giftReceiptCustomizationColor}">
                                    <div class="accordion-icon">${option.giftReceiptCustomizationEmoji}</div>
                                    <div class="accordion-title">${option.giftReceiptCustomizationText}</div>
                                </div>
                                <div class="accordion-arrow">&#x25BC;</div>
                            </div>
                            <div class="accordion-content">
                                <div class="content-container">
                                    <div class="title-price-container">`;
                                    if(option.sendWithGiftReceipt)
                                    {
                                      giftWrapHTML += `<label>
                                            <input type="checkbox" id="sendWithGiftReceipt${option.wrapProductId}"> Send With Gift Receipt
                                        </label>`
                                    }
                                    if(option.sendWithNoInvoice)
                                    {
                                      giftWrapHTML += `<label>
                                            <input type="checkbox" id="sendWithNoInvoice${option.wrapProductId}"> Send With No Invoice
                                        </label>`
                                    }
                                    giftWrapHTML += `
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    if(option.enableGiftRecipientEmail)
    {
      giftWrapHTML +=        `
                        <div key="3">
                            <div class="accordion-header">
                                <div class="giftCardPreview_wrapper" style="color:${option.giftReceiptEmailCustomizationColor}">
                                    <div class="accordion-icon">${option.giftReceiptEmailCustomizationEmoji}</div>
                                    <div class="accordion-title">${option.giftReceiptEmailCustomizationText}</div>
                                </div>
                                <div class="accordion-arrow">&#x25BC;</div>
                            </div>
                            <div class="accordion-content">
                                <div class="content-container">
                                    <div class="title-price-container bb_container_wrapper">
                                    <div class="gift-title">${option.recipientEmailTitle}</div>
                                    <label for="gift-email">Email</label>
                                    <input type="text" id="giftEmail${option.wrapProductId}">`;
                                    if(option.sendEmailUponCheckout)
                                    {
                                      giftWrapHTML += `<div class="gift-price gift-recepient-text">
                                    
                                        <input type="checkbox" id="sendWithGiftReceiptEmail${option.wrapProductId}">
                                        <label for="sendWithGiftReceiptEmail">Send Email Upon Checkout</label>
                                    </div>`
                                    }
                                    if(option.sendEmailWhenItemIsShipped)
                                    {
                                      giftWrapHTML += `<div class="gift-price gift-recepient-text">
                                        <input type="checkbox" id="sendWithNoInvoiceEmail${option.wrapProductId}">
                                        <label for="sendWithNoInvoiceEmail">Send Email Without Invoice</label>
                                    </div>`
                                    }
                                    giftWrapHTML += `
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    giftWrapHTML += `
                    </div>
                </div>
               
            </div>
            </label>
            </div>
             `;    
  });
  

          const popupHtml = `
          <div id="giftWrapPopup" class="send-as-gift-preview" style="display: none;z-index:1000;">
          <input type="hidden" name="giftLogging" id="giftLogging" value="${giftSetting.giftLogging}">
          <input type="hidden" name="refreshTheCart" id="refreshTheCart" value="${giftSetting.refreshTheCart}">
            <div class="send-as-gift-close-button" onclick="onClose()">X</div>
        <div class="parent-accordion-wrapper">
            ${giftWrapHTML}
              <div id="saveGiftButton" class="save-gift-button" onclick="handleSaveAndRemember()">Save and Remember</div>
            </div>
          </div>
        `;

        script += `
        const loggingOrder = ${giftSetting.giftLogging};
        let form = document.querySelector('.product-form') || document.querySelector('form[action="/cart/add"]');
        let checkoutForm = document.querySelector('.cart__footer-wrapper');
        let currentPageProductId = form ? form.querySelector('input[name="id"]')?.value : null;
        if (form && ("${giftCustomization.displayGiftOptions}" === 'both' || "${giftCustomization.displayGiftOptions}" === 'product_page_only')) {
            console.log('Product page - adding gift options');
            const buttonHtml = \`
                <div id="busyBuddySendAsGift" class="giftContent-wrapper busyBuddySendAsGiftPopup" onclick="popupOpen()">
                    <img src="https://img.icons8.com/?size=100&id=338&format=png&color=${(giftCustomization?.btnColor).replace('#', '') || '000000'}" alt="Gift Icon" style="width: 24px; height: 24px;">
                    <span id="giftText">${giftCustomization?.btnText || 'Add as Gift'}</span>
                </div>
            \`;

            if(("${giftCustomization.giftBtnType}" === 'both') || ("${giftCustomization.giftBtnType}" === 'inline'))
            {
              form.insertAdjacentHTML('beforebegin', buttonHtml);
            } 
            document.body.insertAdjacentHTML('beforeend', \`${popupHtml}\`);
            if(("${giftCustomization.giftBtnType}" === 'both') || ("${giftCustomization.giftBtnType}" === 'drawer'))
            {
              document.body.insertAdjacentHTML('beforeend', \`<div class="addGiftBtn busyBuddySendAsGiftPopup" onclick="popupOpen()"><button class="busyBuddySendAsGiftPopup" style="background-color: ${giftCustomization.btnColor};"><span class="Polaris-Icon Polaris-Icon--toneBase"><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M7.835 9.5h-.96c-.343 0-.625-.28-.625-.628 0-.344.28-.622.619-.622.242 0 .463.142.563.363l.403.887Z"></path><path d="M10.665 9.5h.96c.343 0 .625-.28.625-.628 0-.344-.28-.622-.619-.622-.242 0-.463.142-.563.363l-.403.887Z"></path><path fill-rule="evenodd" d="M8.5 4h-3.25c-1.519 0-2.75 1.231-2.75 2.75v2.25h1.25c.414 0 .75.336.75.75s-.336.75-.75.75h-1.25v2.75c0 1.519 1.231 2.75 2.75 2.75h3.441c-.119-.133-.191-.308-.191-.5v-2c0-.414.336-.75.75-.75s.75.336.75.75v2c0 .192-.072.367-.191.5h4.941c1.519 0 2.75-1.231 2.75-2.75v-2.75h-2.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.75v-2.25c0-1.519-1.231-2.75-2.75-2.75h-4.75v2.25c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-2.25Zm.297 3.992c-.343-.756-1.097-1.242-1.928-1.242-1.173 0-2.119.954-2.119 2.122 0 1.171.95 2.128 2.125 2.128h.858c-.595.51-1.256.924-1.84 1.008-.41.058-.694.438-.635.848.058.41.438.695.848.636 1.11-.158 2.128-.919 2.803-1.53.121-.11.235-.217.341-.322.106.105.22.213.34.322.676.611 1.693 1.372 2.804 1.53.41.059.79-.226.848-.636.059-.41-.226-.79-.636-.848-.583-.084-1.244-.498-1.839-1.008h.858c1.176 0 2.125-.957 2.125-2.128 0-1.168-.946-2.122-2.119-2.122-.83 0-1.585.486-1.928 1.242l-.453.996-.453-.996Z"></path></svg></span>Add a gift option</button></div>\`);
            }
        }
    
        if (checkoutForm && ("${giftCustomization.displayGiftOptions}" === 'both' || "${giftCustomization.displayGiftOptions}" === 'cart_only')) {
            const buttonHtml = \`
                <div id="busyBuddySendAsGift" class="giftContent-wrapper busyBuddySendAsGiftPopup" onclick="popupOpen()">
                    <img src="https://img.icons8.com/?size=100&id=338&format=png&color=000000" alt="Gift Icon" style="width: 24px; height: 24px;">
                    <span id="giftText">${giftCustomization?.btnText || 'Add as Gift'}</span>
                </div>
            \`;
            if(("${giftCustomization.giftBtnType}" === 'both') || ("${giftCustomization.giftBtnType}" === 'inline'))
            {
              checkoutForm.insertAdjacentHTML('beforebegin', buttonHtml);
            }
            document.body.insertAdjacentHTML('beforeend', \`${popupHtml}\`);
             if(("${giftCustomization.giftBtnType}" === 'both') || ("${giftCustomization.giftBtnType}" === 'drawer'))
            {
              document.body.insertAdjacentHTML('beforeend', \`<div class="addGiftBtn busyBuddySendAsGiftPopup" onclick="popupOpen()"><button class="busyBuddySendAsGiftPopup" style="background-color: ${giftCustomization.btnColor};"><span class="Polaris-Icon Polaris-Icon--toneBase"><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M7.835 9.5h-.96c-.343 0-.625-.28-.625-.628 0-.344.28-.622.619-.622.242 0 .463.142.563.363l.403.887Z"></path><path d="M10.665 9.5h.96c.343 0 .625-.28.625-.628 0-.344-.28-.622-.619-.622-.242 0-.463.142-.563.363l-.403.887Z"></path><path fill-rule="evenodd" d="M8.5 4h-3.25c-1.519 0-2.75 1.231-2.75 2.75v2.25h1.25c.414 0 .75.336.75.75s-.336.75-.75.75h-1.25v2.75c0 1.519 1.231 2.75 2.75 2.75h3.441c-.119-.133-.191-.308-.191-.5v-2c0-.414.336-.75.75-.75s.75.336.75.75v2c0 .192-.072.367-.191.5h4.941c1.519 0 2.75-1.231 2.75-2.75v-2.75h-2.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.75v-2.25c0-1.519-1.231-2.75-2.75-2.75h-4.75v2.25c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-2.25Zm.297 3.992c-.343-.756-1.097-1.242-1.928-1.242-1.173 0-2.119.954-2.119 2.122 0 1.171.95 2.128 2.125 2.128h.858c-.595.51-1.256.924-1.84 1.008-.41.058-.694.438-.635.848.058.41.438.695.848.636 1.11-.158 2.128-.919 2.803-1.53.121-.11.235-.217.341-.322.106.105.22.213.34.322.676.611 1.693 1.372 2.804 1.53.41.059.79-.226.848-.636.059-.41-.226-.79-.636-.848-.583-.084-1.244-.498-1.839-1.008h.858c1.176 0 2.125-.957 2.125-2.128 0-1.168-.946-2.122-2.119-2.122-.83 0-1.585.486-1.928 1.242l-.453.996-.453-.996Z"></path></svg></span>Add a gift option</button></div>\`);
            }
        }
        
        document.getElementById('closePopupBtn')?.addEventListener('click', function() {
            document.getElementById('giftWrapPopup').style.display = 'none';
        });
    `;
  return {
    script,
  };
};



export const can_active = async (request, shop, appId) => {
  try {
    const setting = await db.merchant.findMany({
      where: {
        shop: shop,
        enabled: true,
        appId: {
          not: appId,
        },
      },
    });
    let hasSubscription = await check_subscription(request);
    if (!(hasSubscription).hasSubscription) {
      return setting.length < 1;
    } else {
      return setting.length < 4 && (hasSubscription).hasSubscription()
        ? true
        : false;
    }
  } catch (error) {
    return false;
  }
};
export const storefront_api = async (shop, url, method, query = null) => {
  const session = await db.session.findFirst({
    where: { shop: shop },
  });

  if (session) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "X-Shopify-Access-Token": session.accessToken,
          "Content-Type": "application/json",
        },
        body: query,
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("API request failed:", error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: "Session not found" };
  }
};
export const getShippingRule = async (shop) => {
  const shipping_rule = await storefront_api(
    shop,
    `https://${shop}/admin/api/2024-04/shipping_zones.json`,
    "GET",
  );
  return shipping_rule.data.shipping_zones;
};
export const getOrderCounter = async (shop) => {
  const order_count = await storefront_api(
    shop,
    `https://${shop}/admin/api/2024-10/orders/count.json?status=any`,
    "GET",
  );
  if (order_count.success) {
    return order_count.data.count;
  }
  return 0;
};

export const addScriptTag = async (shop) => {
  const scriptTag = await storefront_api(
    shop,
    `https://${shop}/admin/api/2024-10/script_tags.json`,
    "GET",
    JSON.stringify({
      script_tag: {
        event: "onload",
        src: `${process.env.SHOPIFY_APP_URL}/scripts/script.js`,
      },
    }),
  );
};

export const appActivate = async (shop, appId, enable, request) => {
  appId = parseInt(appId);
  enable = JSON.parse(enable);
  try {
    const existingMerchant = await db.merchant.findFirst({
      where: {
        appId: appId,
        shop: shop,
      },
    });
    if (existingMerchant) {
      const updatedApp = await db.merchant.update({
        where: {
          id: existingMerchant.id,
        },
        data: {
          enabled: enable,
        },
      });

      return { success: true, updatedApp, isActive: enable };
    } else {
      const newMerchant = await db.merchant.create({
        data: {
          appId: appId,
          shop: shop,
          enabled: enable,
        },
      });
      return { success: true, newMerchant, isActive: enable };
    }
  } catch (error) {
    throw new Error("Failed to update or create merchant d", error);
  }
};
export const createProduct = async (admin, session, productData) => {
  try {
    const publicationIds = await getAllPublications(admin);
    const productResponse = await admin.graphql(
      `#graphql
      mutation createProductMetafields($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            options {
              id
              name
              values
            }
            metafields(first: 3) {
              edges {
                node {
                  id
                  namespace
                  key
                  value
                }
              }
            }
          }
          userErrors {
            message
            field
          }
        }
      }`,
      {
        variables: {
          "input": {
            "title": productData.title,
            "descriptionHtml":productData.description,
          }
        },
      }
    );

    const productCreateData = await productResponse.json();
    if (productCreateData?.data?.productCreate?.userErrors?.length > 0) {
      throw new Error(`Product creation failed: ${productCreateData.data.productCreate.userErrors.map(err => err.message).join(', ')}`);
    }

    const product = productCreateData?.data?.productCreate?.product;
    const productId = product?.id;
    console.log(productId, 'product create')

    await attachImage(admin, productData.image, productData.altText, productId);

    if (!productId) {
      throw new Error('Product creation failed or no product ID returned.');
    }
    const optionId = product?.options?.[0]?.id;
    if (!optionId) {
      throw new Error('Product does not have valid options.');
    }

    const variantCreateData = await createVariant(admin, productData, productId, optionId)

    console.log(variantCreateData.data.productVariantsBulkCreate.productVariants, 'variantCreateData')
    if (variantCreateData?.data?.productVariantsBulkCreate?.userErrors?.length > 0) {
      throw new Error(`Product variant creation failed: ${variantCreateData.data.productVariantsBulkCreate.userErrors.map(err => err.message).join(', ')}`);
    }
    const variantId = variantCreateData.data.productVariantsBulkCreate.productVariants[0].id;

    const publishResponse = await admin.graphql(
      `#graphql
      mutation publishProductToSalesChannel($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          publishable {
            availablePublicationsCount {
              count
            }
            resourcePublicationsCount {
              count
            }
          }
          shop {
            publicationCount
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          id: productId,
          input: publicationIds
        }
      }
    );
  
    const publishData = await publishResponse.json();
    if (publishData?.data?.productPublish?.userErrors?.length > 0) {
      const errorMessages = publishData.data.productPublish.userErrors
        .map((err) => err.message)
        .join(', ');
      throw new Error(`Product publishing failed: ${errorMessages}`);
    }
    return { productId, variantId };
  } catch (error) {
    console.error("Unexpected error occurred during product creation:", error);
  }
};


export const createVariant = async (admin, productData, productId, optionId) => {
  const variantResponse = await admin.graphql(
    `#graphql
    mutation ProductVariantsCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkCreate(productId: $productId, variants: $variants) {
        productVariants {
          id
          title
          selectedOptions {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        "productId": productId,
        "variants": [
          {
            "price": productData.price,
            "inventoryPolicy": "CONTINUE",
            "inventoryItem": {
              "tracked": false
            },
            "optionValues": [
              {
                "name": productData.title,
                "optionId": optionId
              }
            ]
          }
        ]
      },
    }
  );

  return await variantResponse.json();
}
export const getAllPublications = async (admin) => {
  let publications = [];
  let hasNextPage = true;
  let cursor = null;
  
  while (hasNextPage) {
    const response = await admin.graphql(
      `#graphql
      query getAllPublications($first: Int!, $after: String) {
        publications(first: $first, after: $after) {
          edges {
            node {
              id
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`,
      {
        variables: {
          first: 10,
          after: cursor,
        },
      }
    );
  
    const data = await response.json();
    if (data?.data?.publications?.edges) {
      publications.push(...data.data.publications.edges);
    }
    hasNextPage = data?.data?.publications?.pageInfo?.hasNextPage;
    cursor = data?.data?.publications?.pageInfo?.endCursor;
  }
  const publicationIds = publications.map(pub => ({
    publicationId: pub.node.id
  }));
  return publicationIds;
};

export const attachImage = async (admin, imageURL, altText, productId) => {
  const response = await admin.graphql(
    `#graphql
    mutation ProductImageCreate($id: ID!, $imageURL: String!, $altText: String!) {
      productCreateMedia(productId: $id, media: [
        {
          mediaContentType: IMAGE,
          originalSource: $imageURL,
          alt: $altText
        }
      ]) {
        media {
          id
          alt
          status
          ... on MediaImage {
            image {
              url
            }
          }
        }
        mediaUserErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        id: productId,
        imageURL: imageURL,
        altText: altText
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getGiftSetting = async (shop) => {
  const giftSetting = await db.gift_setting.findFirst({
    where: {
      shop: shop,
    },
  });
  return giftSetting;
};
export const productDelete = async (admin, productId) => {
  const response = await admin.graphql(
    `#graphql
    mutation productDelete($input: ProductDeleteInput!) {
      productDelete(input: $input) {
        deletedProductId
        userErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        input: {
          id: productId,
        },
      },
    }
  );

  const data = await response.json();
  return data;
};

export const uploadImage = async(image)=>{
  const base64String = image;
  const matches = base64String.match(/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/);
  if (!matches) {
    return ({ success:true, filePath:image, error: "Invalid base64 string" });
  }

  const type = matches[1];
  const base64Data = matches[2];
  
  const buffer = Buffer.from(base64Data, 'base64');
  
  const fileName = `image-${Date.now()}.${type}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buffer);
    return ({ success: true, filePath: `/uploads/${fileName}` });
  } catch (error) {
    console.error('Error writing file', error);
    return ({ success: false, error: 'Failed to save the image' });
  }
}