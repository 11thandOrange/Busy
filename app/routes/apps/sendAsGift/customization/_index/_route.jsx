import React from "react";
import SendAsGiftCustomization from "../../../../../components/templates/SendAsGiftCustomization";
import { authenticate } from "../../../../../shopify.server";
import { cors } from "remix-utils/cors";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
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
  return cors(request, json(data.data.products.nodes));
};
const GiftCustomization = () => {
  const products = useLoaderData();

  return (
    <div>
      <SendAsGiftCustomization
        productsList={products}
      ></SendAsGiftCustomization>
    </div>
  );
};

export default GiftCustomization;
