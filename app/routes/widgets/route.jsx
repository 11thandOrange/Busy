import { authenticate } from "../../shopify.server";
import { Card, Text, Button, Layout, Page, BlockStack, Image } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from "@remix-run/react";

  
  export const loader = async ({ request }) => {
    await authenticate.admin(request);
    const response = await db.widget.findMany();
    return cors(request, response);
  };

  export default function Widgets() {
    const widgets = useLoaderData();
    return (
      <Page>
        <TitleBar title="BuddyBoss Widget" />
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                {widgets && widgets.length > 0 ? (
                  widgets.map((widget) => (
                    <div>
                      <Image
                          src={widget.image} // Assuming widget has an image URL
                          alt={widget.name}
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover', borderRadius: '8px' }} // Optional styles
                        />
                        <Text as="p" variant="bodyMd">
                          {widget.name}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          {widget.description}
                        </Text>
                    </div>
                  ))
                ) : (
                  <Text>No widgets available</Text>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          
        </Layout>
      </Page>
    );
  }
  
  
  