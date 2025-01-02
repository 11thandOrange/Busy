import db from "../db.server";
import { DateTime } from "luxon";
import {
  authenticate,
  STARTER_MONTHLY_PLAN,
  PRO_MONTHLY_PLAN,
  ENTERPRISE_MONTHLY_PLAN,
} from "../shopify.server";

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
export const getSendAsGift = async (shop) => {
  let script = "";

  const gift = await db.gift.findFirst({
    where: {
      shop: shop,
    },
    include: {
      gift_wrap: true,
    },
  });
  if (gift) {
    
    let itemHtml = `<div id="giftWrap-${gift.wrapProductId}" class="gift-wrap-item busyBuddySendAsGift" style="border: 1px solid #ddd; padding: 15px; margin: 10px; background-color: #f9f9f9;">`;
    if (gift.gift_wrap.image) {
      itemHtml += `<img src="${gift.giftWrapImage}" alt="${gift.giftWrapTitle}" style="width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px;">`;
    } else {
      itemHtml += `<img src="https://via.placeholder.com/100" alt="No Image" style="width: 100px; height: 100px; object-fit: cover; margin-bottom: 10px;">`;
    }
    if(gift.enableGiftWrap)
    {
      itemHtml += `<h3>${gift.giftWrapTitle}</h3>`;
      itemHtml += `<p>${gift.giftWrapDescription}</p>`;
      itemHtml += `<p><strong>Price: $${gift.giftWrapPrice.toFixed(2)}</strong></p>`;
    }
    if(gift.enableGiftMessage)
    {
      itemHtml += `<h3>${gift.giftMessageTitle}</h3>`;
      itemHtml += `<p>${gift.giftMessageDescription}</p>`;
      itemHtml += `<p><strong><input type="text" id="giftMessageText"></strong></p>`;
    }
    if(gift.enableGiftRecipient)
    {
      itemHtml += `<h3>${gift.recipientEmailTitle}</h3>`;
      itemHtml += `<p>${gift.recipientEmailDescription}</p>`;
      itemHtml += `<p><strong><input type="text" id="giftRecipientEmail"></strong></p>`;
    }
    itemHtml += `</div>`;

    const popupHtml = `
      <div id="giftWrapPopup" class="gift-wrap-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 9999; justify-content: center; align-items: center;">
        <div class="popup-content" style="background: #fff; padding: 20px; max-width: 500px; width: 100%; border-radius: 8px;">
          <button id="closePopupBtn" style="position: absolute; top: 10px; right: 10px; background: #fff; border: none; font-size: 20px; cursor: pointer;">&times;</button>
          <h2>Gift Wrap Options</h2>
          ${itemHtml}
          <div>
            <label>
              <input type="checkbox" id="giftWrapCheckbox"> Add Gift Wrap
            </label>
          </div>
          <div>
            <label for="giftMessageText">Gift Message:</label>
            <textarea id="giftMessageText" rows="4" style="width: 100%;"></textarea>
          </div>
          <div>
            <label>
              <input type="checkbox" id="giftRecipientCheckbox"> Add Gift Recipient Info
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" id="giftEmailCheckbox"> Send Gift by Email
            </label>
          </div>
          <button id="addGiftWrapBtn">Add Gift Wrap</button>
        </div>
      </div>
    `;
    script += `
      let form = document.querySelector('.product-form') || document.querySelector('form[action="/cart/add"]');
      let currentPageProductId = form.querySelector('input[name="id"]')?.value; 
      if(("${gift.selectionType}"=="any" || ${gift.selectedProductList.includes(get_current_page().productId)}) && form)
      {
        const buttonHtml = \`<div id="busyBuddySendAsGift" class="busyBuddyCountdownTimer busyBuddySendAsGift" style="cursor: pointer;">Add As Gift Options</div>\`;
        form.insertAdjacentHTML('beforebegin', buttonHtml);
        document.body.insertAdjacentHTML('beforeend', \`${popupHtml}\`);
      }

      document.getElementById('busyBuddySendAsGift')?.addEventListener('click', function() {
        document.getElementById('giftWrapPopup').style.display = 'flex';
      });

      document.getElementById('closePopupBtn')?.addEventListener('click', function() {
        document.getElementById('giftWrapPopup').style.display = 'none';
      });

      function handleAddGift() {
        const gift = ${JSON.stringify(giftData)};
        let giftWrapProduct = \`\${gift.gift_wrap.productId}\`;
        let bodyData = { updates: { [giftWrapProduct]: 1 } };

        const giftWrapSelected = document.querySelector('#giftWrapCheckbox').checked;
        const giftMessage = document.querySelector('#giftMessageText').value;
        const recipientSelected = document.querySelector('#giftRecipientCheckbox').checked;
        const giftEmailSelected = document.querySelector('#giftEmailCheckbox').checked;

        const attributes = {};
        let note;

        if (gift?.notes === true) {
          note = \`Gift Message: \${giftMessage} Gift Recipient: \${recipientSelected} Gift Email: \${giftEmailSelected}\`;
          bodyData.note = note;
        } else {
          if (giftMessage.trim() !== "") {
            attributes["Gift Message"] = giftMessage;
          }
          if (recipientSelected) {
            attributes["Gift Recipient"] = "Yes";
          }
          if (giftEmailSelected) {
            attributes["Gift Email"] = "Yes";
          }
          if (Object.keys(attributes).length > 0) {
            bodyData.attributes = attributes;
          }
        }

        fetch('/cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        })
        .then(response => response.json())
        .then(data => {
          console.log("Cart updated successfully:", data);
          document.getElementById('giftWrapPopup').style.display = 'none';
        })
        .catch(error => {
          console.error('Error updating cart:', error);
        });
      }
      document.getElementById('addGiftWrapBtn')?.addEventListener('click', handleAddGift);
    `;

    return {
      script,
    };
  } else {
    console.error('Gift not found');
    return {
      script: '',
    };
  }
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

    await attachImage(admin, productData.image, productData.altText, productId);

    if (!productId) {
      throw new Error('Product creation failed or no product ID returned.');
    }
    const optionId = product?.options?.[0]?.id;
    if (!optionId) {
      throw new Error('Product does not have valid options.');
    }

    const variantCreateData = await createVariant(admin, productData, productId, optionId)

    if (variantCreateData?.data?.productVariantsBulkCreate?.userErrors?.length > 0) {
      throw new Error(`Product variant creation failed: ${variantCreateData.data.productVariantsBulkCreate.userErrors.map(err => err.message).join(', ')}`);
    }

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
        .map((err) => err.message) // Extract error messages
        .join(', ');
      throw new Error(`Product publishing failed: ${errorMessages}`);
    }
    return productId;
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

  // Ensure the response is in the correct format
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