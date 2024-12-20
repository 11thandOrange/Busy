import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { cors } from "remix-utils/cors";


export const loader = async ({ request }) => {
    
    const {admin} = await authenticate.admin(request);
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

    console.log(data, 'product list')
  return cors(request, json(data.data.products.nodes));  
}
export async function action({ request }) {
  const { admin, session } = await authenticate.admin(request);
  const shop = session.shop;
  const data = Object.fromEntries(await request.formData());

  if (data._action === 'GiftWrap') {
    let gift = await db.Gift.findFirst({
      where: {
        shop: shop,
      },
    });

    if (!gift) {
      gift = await db.Gift.create({
        data: {
          shop: shop,
        },
      });
    }

    const giftWrap = await db.GiftWrap.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseInt(data.price),
        image: data.image,
        giftId: gift.id,
      },
    });

    const product = new admin.rest.resources.Product({session: session});
    product.title = data.title;
    product.body_html = `<strong>${data.description}</strong>`;
    product.vendor = "BusyBuddy Shop";
    product.product_type = "gift";
    product.status = "active";
    await product.save({
      update: true,
    });

    return { success: true, giftWrap };
  }
  else
  {
    await db.gift.upsert({
      where: { shop: shop },
      update: {data,
        shop: shop,
      },
      create: {
        data,
        shop: shop,
      },
    });
  }
  return { success: false, message: 'Invalid action' };
}
