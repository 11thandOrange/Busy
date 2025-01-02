import React from "react";
import SendAsGiftCustomization from "../../../../../components/templates/SendAsGiftCustomization";
import { authenticate } from "../../../../../shopify.server";
import { cors } from "remix-utils/cors";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router-dom";
import db from "../../../../../db.server";
import { createProduct } from "../../../../../utils/function";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
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

  const giftListing = [];

  const data = await response.json();
  return cors(
    request,
    json({ products: data.data.products.nodes, giftListing: giftListing }),
  );
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = session.shop;
  const data = Object.fromEntries(await request.formData());
  switch (data._action) {
    case "CREATE_GIFT":
      const newGift = await db.gift.create({
        data: {
          selectionType: data.selectionType,
          selectedProductList: data.selectedProductList,
          enableGiftWrap: JSON.parse(data.enableGiftWrap),
          giftWrapImage: data.giftWrapImage,
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
          sendEmailWhenItemIsShipped: JSON.parse(data.sendEmailWhenItemIsShipped),
          giftWrapCustomizationText: data.giftWrapCustomizationText,
          giftWrapCustomizationColor: data.giftWrapCustomizationColor,
          giftWrapCustomizationEmoji: data.giftWrapCustomizationEmoji,
          giftMessageCustomizationText: data.giftMessageCustomizationText,
          giftMessageCustomizationColor: data.giftMessageCustomizationColor,
          giftMessageCustomizationEmoji: data.giftMessageCustomizationEmoji,
          shop: shop,
        },
      });
      if(data.enableGiftWrap)
      {
        const productData = {
          title: data.giftWrapTitle,
          description: data.giftWrapDescription,
          price: data.giftWrapPrice,
          type: 'gift',
          image:"https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          altText:data.giftWrapTitle
        };
        await createProduct(admin, session, productData);
      }
      if(data.enableGiftMessage)
      {
        await createProduct(admin, session, {
          title: 'Gift Message',
          description: '<p>This is a sample product description.</p>',
          price: 1,
          image:"https://images.pexels.com/photos/7586239/pexels-photo-7586239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          altText: 'Gift Message',
          type: 'gift'
        });
      }
      if(data.sendWithGiftReceipt)
      {
        await createProduct(admin, session, {
          title: 'Gift Receipt',
          description: '<p>This is a sample product description.</p>',
          price: 1,
          image:"https://images.pexels.com/photos/7586239/pexels-photo-7586239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          altText: 'Gift Receipt',
          type: 'gift'
        });
      }
     

      return { success: true, gift: newGift };

    case "UPDATE_GIFT":
      await db.gift.update({
        where: {
          id: data.id,
        },
        data: {
          selectionType: data.selectionType,
          selectedProductList: data.selectedProductList,
          enableGiftWrap: data.enableGiftWrap,
          giftWrapImage: data.giftWrapImage,
          giftWrapTitle: data.giftWrapTitle,
          giftWrapPrice: data.giftWrapPrice,
          giftWrapDescription: data.giftWrapDescription,
          enableGiftMessage: data.enableGiftMessage,
          giftMessageTitle: data.giftMessageTitle,
          giftMessageDescription: data.giftMessageDescription,
          sendWithGiftReceipt: data.sendWithGiftReceipt,
          sendWithNoInvoice: data.sendWithNoInvoice,
          recipientEmailTitle: data.recipientEmailTitle,
          recipientEmailDescription: data.recipientEmailDescription,
          recipientEmail: data.recipientEmail,
          sendEmailUponCheckout: data.sendEmailUponCheckout,
          sendEmailWhenItemIsShipped: data.sendEmailWhenItemIsShipped,
          giftWrapCustomizationText: data.giftWrapCustomizationText,
          giftWrapCustomizationColor: data.giftWrapCustomizationColor,
          giftWrapCustomizationEmoji: data.giftWrapCustomizationEmoji,
          giftMessageCustomizationText: data.giftMessageCustomizationText,
          giftMessageCustomizationColor: data.giftMessageCustomizationColor,
          giftMessageCustomizationEmoji: data.giftMessageCustomizationEmoji,
          shop: shop,
        },
      });
     
      return { success: true, updatedGift };

    case "DELETE_GIFT":
      await db.gift.deleteMany({
        where: {
          id: {
            in: data.giftIds.split(",").map((num) => parseInt(num, 10)),
          },
          shop: shop,
        },
      });
      return { success: true, updatedGift };
    case "SETTING":
      await db.Gift.upsert({
        where: { shop: shop },
        update: {
          addEmailClient: data.addEmailClient,
          giftWrapTagName: data.giftWrapTagName,
          giftMessageTagName: data.giftMessageTagName,
          giftReceiptTagName: data.giftReceiptTagName,
          refreshTheCart: data.refreshTheCart,
          giftLogging: data.giftLogging,
          showDecimalPoints: data.showDecimalPoints,
          shop: shop,
        },
        create: {
          addEmailClient: data.addEmailClient,
          giftWrapTagName: data.giftWrapTagName,
          giftMessageTagName: data.giftMessageTagName,
          giftReceiptTagName: data.giftReceiptTagName,
          refreshTheCart: data.refreshTheCart,
          giftLogging: data.giftLogging,
          showDecimalPoints: data.showDecimalPoints,
          shop: shop,
        },
      });
    default:
      return { success: false, message: "Invalid action" };
  }
};

const GiftCustomization = () => {
  const products = useLoaderData();
  console.log(products, "pro");

  return (
    <div>
      <SendAsGiftCustomization
        productsList={products.products}
      ></SendAsGiftCustomization>
    </div>
  );
};

export default GiftCustomization;
