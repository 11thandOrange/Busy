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
  const shop = session.shop; // Get the shop from the session
  const data = Object.fromEntries(await request.formData()); // Get form data

  switch (data._action) {
    case "create":
      const newGift = await db.gift.create({
        data: {
          selectionType: "any",
          giftWrapStatus: data.giftWrapStatus,
          giftMessageStatus: data.giftMessageStatus,
          giftRecieptStatus: data.giftReceiptStatus,
          shop: shop, // Use the shop from the session

          // Conditionally create related models
          giftWraps: data.giftWrapStatus ? {
            create: {
              title: "Premium Wrap",
              price: 5,
              image: "image_url",
            }
          } : undefined,

          giftMessages: data.giftMessageStatus ? {
            create: {
              title: "Happy Birthday!",
              description: "Hope you have a wonderful day!",
            }
          } : undefined,

          giftReceipts: data.giftReceiptStatus ? {
            create: {
              title: "Order Receipt",
              description: "Your order is ready for delivery.",
            }
          } : undefined,
        },
      });

      if (giftWrapStatus) {
        await createProduct(session, { type: "giftWrap", data: newGift.giftWraps });
      }

      if (giftMessageStatus) {
        await createProduct(session, { type: "giftMessage", data: newGift.giftMessages });
      }

      if (giftReceiptStatus) {
        await createProduct(session, { type: "giftReceipt", data: newGift.giftReceipts });
      }
      return { success: true, gift: newGift };

    case "update":
      const giftIdToUpdate = parseInt(data.giftId); 

      const updatedGiftData = {};
      if (data.selectionType) {
        updatedGiftData.selectionType = data.selectionType;
      }
      if (data.giftWrapStatus !== undefined) {
        updatedGiftData.giftWrapStatus = data.giftWrapStatus === "true";
      }
      if (data.giftMessageStatus !== undefined) {
        updatedGiftData.giftMessageStatus = data.giftMessageStatus === "true";
      }
      if (data.giftRecieptStatus !== undefined) {
        updatedGiftData.giftRecieptStatus = data.giftRecieptStatus === "true";
      }
      const updatedGift = await db.gift.update({
        where: { id: giftIdToUpdate },
        data: updatedGiftData,
      });
      if (updatedGiftData.giftWrapStatus !== undefined && updatedGiftData.giftWrapStatus) {
        await db.giftWrap.updateMany({
          where: { giftId: giftIdToUpdate },
          data: {
            title: data.giftWrapTitle || "Default Wrap",
            price: parseInt(data.giftWrapPrice) || 0,
            image: data.giftWrapImage || "default_image_url",
          },
        });
      }

      if (updatedGiftData.giftMessageStatus !== undefined && updatedGiftData.giftMessageStatus) {
        await db.giftMessage.updateMany({
          where: { giftId: giftIdToUpdate },
          data: {
            title: data.giftMessageTitle || "Default Message",
            description: data.giftMessageDescription || "Default description",
          },
        });
      }

      if (updatedGiftData.giftRecieptStatus !== undefined && updatedGiftData.giftRecieptStatus) {
        await db.giftReciept.updateMany({
          where: { giftId: giftIdToUpdate },
          data: {
            title: data.giftReceiptTitle || "Default Receipt",
            description: data.giftReceiptDescription || "Your order is ready for delivery.",
          },
        });
      }
      return { success: true, updatedGift };
    default:
      return { success: false, message: 'Invalid action' };
  }
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