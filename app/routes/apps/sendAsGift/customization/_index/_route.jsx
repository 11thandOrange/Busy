import React from "react";
import SendAsGiftCustomization from "../../../../../components/templates/SendAsGiftCustomization";
import { authenticate } from "../../../../../shopify.server";
import { cors } from "remix-utils/cors";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router-dom";
import db from "../../../../../db.server";
import { createProduct, productDelete, uploadImage } from "../../../../../utils/function";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  let sendAsGiftCustomization = null;
  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    sendAsGiftCustomization = await db.gift.findFirst({
      where: {
        id: parseInt(url.searchParams.get("id")),
      },
    });
  }
  const shop = session.shop;
  const response = await admin.graphql(
    `#graphql
      query GetProducts {
        products(first: 100) {
          nodes {
            id
            title,
            media(first: 5) {
              edges {
                node {
                  id,
                  preview{
                  image{
                  url}}
                }
              }
            }   
            priceRange {
              maxVariantPrice {
                amount,
                currencyCode
              }
            }
          }
        }
      }`,
  );

  const data = await response.json();
  const gifts = await db.gift.findMany({
    where: {
      shop: shop, // Filter by the shop
      ...(parseInt(url.searchParams.get("id")) // Only apply the 'not' condition if 'id' is provided in the URL
        ? { id: { not: parseInt(url.searchParams.get("id")) } }
        : {}),
    },
  });
  

  let allProducts = [];
  gifts.forEach((gift) => {
    if (gift.selectedProductList) {
      const productArray = gift.selectedProductList
        .split(",")
        .map((product) => product.trim());
      allProducts = [...allProducts, ...productArray];
    }
  });

  allProducts = [...new Set(allProducts)];
  const giftCustomization = await db.giftCustomization.findFirst({
    where: {
      shop: shop,
    },
  });
  return cors(
    request,
    json({
      products: data.data.products.nodes,
      productExists: allProducts,
      sendAsGiftCustomization,
      giftCustomization,
    }),
  );
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = session.shop;
  const data = Object.fromEntries(await request.formData());
  let wrapMainProductId = null;
  let wrapProductId = null;
  let messageProductId = null;
  let messageMainProductId = null;
  let receiptProductId = null;
  let receiptMainProductId = null;
  switch (data._action) {
    case "CREATE_GIFT":
      const imagePath = await uploadImage(data.giftWrapImage);
      if (
        JSON.parse(data.enableGiftWrap) &&
        data.giftWrapTitle != "" &&
        data.giftWrapDescription != ""
      ) {
        const productData = {
          title: data.giftWrapTitle,
          description: data.giftWrapDescription,
          price: data.giftWrapPrice,
          type: "gift",
          image: imagePath.success
            ? process.env.SHOPIFY_APP_URL + imagePath.filePath
            : "https://www.shutterstock.com/shutterstock/photos/89764912/display_1500/stock-photo-collection-of-various-card-notes-with-ribbon-on-white-background-each-one-is-shot-separately-89764912.jpg",
          altText: data.giftWrapTitle,
        };
        const { productId, variantId } =await createProduct(admin, session, productData);
        wrapMainProductId = productId;
        wrapProductId = variantId;
      }
      
      const newGift = await db.gift.create({
        data: {
          selectionType: data.selectionType,
          selectedProductList: data.selectedProductList,
          enableGiftWrap: JSON.parse(data.enableGiftWrap),
          giftWrapImage: imagePath.success ? imagePath.filePath : null,
          giftWrapTitle: data.giftWrapTitle,
          giftWrapPrice: parseFloat(data.giftWrapPrice),
          giftWrapDescription: data.giftWrapDescription,
          enableGiftMessage: JSON.parse(data.enableGiftMessage),
          giftMessageTitle: data.giftMessageTitle,
          giftMessageDescription: data.giftMessageDescription,
          sendWithGiftReceipt: JSON.parse(data.sendWithGiftReceipt),
          sendWithNoInvoice: JSON.parse(data.sendWithNoInvoice),
          recipientEmailTitle: data.recipientEmailTitle,
          recipientEmailDescription: data.recipientEmailDescription,
          recipientEmail: data.recipientEmail,
          sendEmailUponCheckout: JSON.parse(data.sendEmailUponCheckout),
          sendEmailWhenItemIsShipped: JSON.parse(
            data.sendEmailWhenItemIsShipped,
          ),
          giftWrapCustomizationText: data.giftWrapCustomizationText,
          giftWrapCustomizationColor: data.giftWrapCustomizationColor,
          giftWrapCustomizationEmoji: data.giftWrapCustomizationEmoji,
          giftMessageCustomizationText: data.giftMessageCustomizationText,
          giftMessageCustomizationColor: data.giftMessageCustomizationColor,
          giftMessageCustomizationEmoji: data.giftMessageCustomizationEmoji,
          wrapProductId: wrapProductId,
          messageProductId: messageProductId,
          recipeientProductId: receiptProductId,
          wrapMainProductId: wrapMainProductId,
          messageMainProductId: messageMainProductId,
          recipeientMainProductId: receiptMainProductId,
          shop: shop,
        },
      });
      return { success: true, gift: newGift };

    case "UPDATE_GIFT":
      const getGift = await db.gift.findFirst({
        where: {
          id: parseInt(data.id),
        },
      });
      if(getGift.wrapMainProductId)
      {
        await productDelete(admin, getGift.wrapMainProductId)
      }
      const imagePathUpdate = await uploadImage(data.giftWrapImage);
      if (
        JSON.parse(data.enableGiftWrap) &&
        data.giftWrapTitle != "" &&
        data.giftWrapDescription != ""
      ) {
        const productData = {
          title: data.giftWrapTitle,
          description: data.giftWrapDescription,
          price: data.giftWrapPrice,
          type: "gift",
          image: imagePathUpdate.success
            ? process.env.SHOPIFY_APP_URL + imagePathUpdate.filePath
            : "https://www.shutterstock.com/shutterstock/photos/89764912/display_1500/stock-photo-collection-of-various-card-notes-with-ribbon-on-white-background-each-one-is-shot-separately-89764912.jpg",
          altText: data.giftWrapTitle,
        };
        const { productId, variantId } =await createProduct(admin, session, productData);
        wrapMainProductId = productId;
        wrapProductId = variantId;
      }
      await db.gift.update({
        where: {
          id: parseInt(data.id),
        },
        data: {
          selectionType: data.selectionType,
          selectedProductList: data.selectedProductList,
          enableGiftWrap: JSON.parse(data.enableGiftWrap),
          giftWrapImage: imagePathUpdate.success
            ? imagePathUpdate.filePath
            : null,
          giftWrapTitle: data.giftWrapTitle,
          giftWrapPrice: parseFloat(data.giftWrapPrice),
          giftWrapDescription: data.giftWrapDescription,
          enableGiftMessage: JSON.parse(data.enableGiftMessage),
          giftMessageTitle: data.giftMessageTitle,
          giftMessageDescription: data.giftMessageDescription,
          sendWithGiftReceipt: JSON.parse(data.sendWithGiftReceipt),
          sendWithNoInvoice: JSON.parse(data.sendWithNoInvoice),
          recipientEmailTitle: data.recipientEmailTitle,
          recipientEmailDescription: data.recipientEmailDescription,
          recipientEmail: data.recipientEmail,
          sendEmailUponCheckout: JSON.parse(data.sendEmailUponCheckout),
          sendEmailWhenItemIsShipped: JSON.parse(
            data.sendEmailWhenItemIsShipped,
          ),
          giftWrapCustomizationText: data.giftWrapCustomizationText,
          giftWrapCustomizationColor: data.giftWrapCustomizationColor,
          giftWrapCustomizationEmoji: data.giftWrapCustomizationEmoji,
          giftMessageCustomizationText: data.giftMessageCustomizationText,
          giftMessageCustomizationColor: data.giftMessageCustomizationColor,
          giftMessageCustomizationEmoji: data.giftMessageCustomizationEmoji,
          wrapProductId: wrapProductId,
          messageProductId: messageProductId,
          recipeientProductId: receiptProductId,
          wrapMainProductId: wrapMainProductId,
          messageMainProductId: messageMainProductId,
          recipeientMainProductId: receiptMainProductId,
          shop: shop,
        },
      });

      return { success: true };

    case "DELETE_GIFT":
      await db.gift.deleteMany({
        where: {
          id: {
            in: data.giftIds.split(",").map((num) => parseInt(num, 10)),
          },
          shop: shop,
        },
      });
      return { success: true };
    case "SETTING":
      await db.giftSetting.upsert({
        where: { shop: shop },
        update: {
          addEmailClient: data.addEmailClient,
          giftWrapTagName: data.giftWrapTagName,
          giftMessageTagName: data.giftMessageTagName,
          giftReceiptTagName: data.giftReceiptTagName,
          refreshTheCart: data.refreshTheCart,
          giftLogging: data.giftLogging,
          showDecimalPoints: JSON.parse(data.showDecimalPoints),
          shop: shop,
        },
        create: {
          addEmailClient: data.addEmailClient,
          giftWrapTagName: data.giftWrapTagName,
          giftMessageTagName: data.giftMessageTagName,
          giftReceiptTagName: data.giftReceiptTagName,
          refreshTheCart: data.refreshTheCart,
          giftLogging: data.giftLogging,
          showDecimalPoints: JSON.parse(data.showDecimalPoints),
          shop: shop,
        },
      });
      return { success: true };
    case "CUSTOMIZATION_SETTING":
      await db.giftCustomization.upsert({
        where: { shop: shop },
        update: {
          displayGiftOptions: data.displayGiftOptions,
          giftBtnType: data.giftBtnType,
          btnText: data.btnText,
          btnColor: data.btnColor,
          btnEmoji: data.btnEmoji,
          shop: shop,
        },
        create: {
          displayGiftOptions: data.displayGiftOptions,
          giftBtnType: data.giftBtnType,
          btnText: data.btnText,
          btnColor: data.btnColor,
          btnEmoji: data.btnEmoji,
          shop: shop,
        },
      });
      return { success: true };
    default:
      return { success: false, message: "Invalid action" };
  }
};

const GiftCustomization = () => {
  const products = useLoaderData();
  
  return (
    <div>
      <SendAsGiftCustomization
        productsList={products.products}
        productExists={products.productExists}
        initialData={products.sendAsGiftCustomization}
        giftCustomization={products.giftCustomization}
      ></SendAsGiftCustomization>
    </div>
  );
};

export default GiftCustomization;
