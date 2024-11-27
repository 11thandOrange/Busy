import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
  BillingInterval,
  DeliveryMethod
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";
import prisma from "./db.server";

export const STARTER_MONTHLY_PLAN = 'Starter';
export const PRO_MONTHLY_PLAN = 'Pro';
export const ENTERPRISE_MONTHLY_PLAN = 'Enterprise';
export const PLANS = [ STARTER_MONTHLY_PLAN, PRO_MONTHLY_PLAN, ENTERPRISE_MONTHLY_PLAN];

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
    billing: {
      [STARTER_MONTHLY_PLAN]: {
        amount: 30,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
      },
      [PRO_MONTHLY_PLAN]: {
        amount: 60,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
      },
      [ENTERPRISE_MONTHLY_PLAN]: {
        amount: 90,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
      },
    }
});

export default shopify;
export const apiVersion = ApiVersion.October24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
