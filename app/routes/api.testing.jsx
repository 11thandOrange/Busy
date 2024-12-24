import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { cors } from "remix-utils/cors";
import { createProduct } from "../utils/function";
// import { unstable_parseMultipartFormData, upload } from "@remix-run/node";
// import fs from "fs";
// import path from "path";


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
  const gift = await prisma.gift.create({
    data: {
      giftWrapStatus: data.giftWrapStatus,
      giftMessageStatus: data.giftMessageStatus,
      giftRecieptStatus: data.giftRecieptStatus,
      giftAppearanceSetting: data.giftAppearanceSetting,
      appearanceRules: data.appearanceRules,
      accountSetting: data.accountSetting,
      shop: session.shop
    },
  });

  const giftWrap = await prisma.giftWrap.create({
    data: {
      title: 'Luxury Wrap',
      description: 'Gold foil wrapping with a satin bow',
      price: 15,
      image: 'https://example.com/ luxury-wrap.jpg',
      giftId: gift.id,
    },
  });

  const giftMessage = await prisma.giftMessage.create({
    data: {
      title: 'Happy Birthday!', // Customize as needed
      description: 'Wishing you all the best on your special day!',
      giftId: gift.id,
    },
  });

  const giftReciept = await prisma.giftReciept.create({
    data: {
      title: 'Gift Receipt', // Customize as needed
      description: 'This receipt is proof of your purchase for the gift above.',
      giftId: gift.id,
    },
  });

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

    createProduct(session, data.giftWrap);

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
// export let action = async ({ request }) => {
//   // Parse the form data
//   let formData = await unstable_parseMultipartFormData(request, uploadHandler);

//   // Retrieve the file
//   let image = formData.get("image");
//   let name = formData.get("name");
//   let email = formData.get("email");
  
//   if (image) {
//     // Save the file to a directory on the server
//     const uploadPath = path.join(__dirname, "uploads", image.name);
//     fs.writeFileSync(uploadPath, image.stream());

//     return json({ message: "File uploaded successfully!", filePath: uploadPath });
//   }

//   return json({ message: "No file uploaded" });
// };

// // Define an upload handler for the file
// async function uploadHandler(file) {
//   return new Promise((resolve, reject) => {
//     const fileStream = file.stream();
//     let chunks = [];
//     fileStream.on("data", chunk => chunks.push(chunk));
//     fileStream.on("end", () => resolve(Buffer.concat(chunks)));
//     fileStream.on("error", reject);
//   });
// }

// export let loader: LoaderFunction = async ({ request }) => {
//   const imagePath = path.join(__dirname, "uploads", "your-image.jpg"); // Provide the correct image path

//   if (fs.existsSync(imagePath)) {
//     // Read the image file and convert it to a Base64 string
//     const imageBuffer = fs.readFileSync(imagePath);
//     const base64Image = imageBuffer.toString("base64");

//     // You can return the Base64 string, or include it in the response
//     return json({ imageBase64: base64Image });
//   }

//   return json({ error: "Image not found" });
// };