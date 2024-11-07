import { AppProvider, Card, Text, Button, Layout, Page, BlockStack, Image } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useFetcher } from "@remix-run/react"; 
import { getCategories, getShopName } from "../../utils/function";
  
export const loader = async ({ request }) => {
  let apps = await db.app.findMany({
    include: {
      Merchant: true,
    },
  });
  apps = apps.map((app) => {
    const isInstalled = app.Merchant.some((merchant) => merchant.enabled);
  
    return {
      id: app.id,
      name: app.name,
      description: app.description,
      categoryId: app.categoryId,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      isInstalled,
    };
  });
  
  const response = {apps, categories : await getCategories()};
  return cors(request, response);
};
export const action = async ({ request }) => {
  const shop = getShopName(request);
  const formData = new URLSearchParams(await request.text());
  const appId = parseInt(formData.get("appId"));
  const enable = formData.get("enable") === true;
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
      return updatedApp;
    } else {
      const newMerchant = await db.merchant.create({
        data: {
          appId: appId,
          shop: shop,
          enabled: enable,
        },
      });
      return newMerchant;
    }
  } catch (error) {
    throw new Error("Failed to update or create merchant");
  }
};
  export default function BundleApps() {
    const apps_data = useLoaderData();
    const fetcher = useFetcher();
    const [apps, setApps] = useState(apps_data.apps)
    const [categories, setCategories] = useState(apps_data.categories)
    const handleToggle = (appId, currentStatus) => {
      
       const updatedApps = apps.map((app) => {
      if (app.id == appId) {
        return { ...app, isInstalled: !currentStatus };
      }
      return app;
    });

    setApps(updatedApps); 
      fetcher.submit(
        {
          appId: appId,
          enable: !currentStatus,
        },
        { method: "POST", action: "/bundle/apps" }
      );
    };

    return (
      <AppProvider>
        <Page>
          <TitleBar title="BuddyBoss page" />
          <Layout>
            <Layout.Section>
              <Card>
                <BlockStack gap="300">
                {JSON.stringify(categories)}
                {apps && apps.length > 0 ? (
                    apps.map((app) => (
                      <div>
                        
                          <Text as="p" variant="bodyMd">
                            {app.name}
                          </Text>
                          <Text as="p" variant="bodyMd">
                            {app.description}
                          </Text>
                         
                          <Button
                    onClick={() => handleToggle(app.id, app.isInstalled)}
                  >
                    { app.isInstalled ? "Deactivate" : "Activate"}
                  </Button>
                      </div>
                    ))
                  ) : (
                    <Text>No Apps available</Text>
                  )}
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </AppProvider>
    );
  }