import { Card, Text, Button, Layout, Page, BlockStack, Image } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from "@remix-run/react";
import { useFetcher } from "@remix-run/react"; 
import { getCategories, getShopName, markWidgetAsFavorite } from "../../utils/function";
import { useState } from "react";

  
  export const loader = async ({ request }) => {
    const shop  = await getShopName(request)
    let widgets = await db.widget.findMany({
      include: {
        categories: {
          select: {
            id:true
          }
        },
        Fav_widget: {
          where: { shop: shop },
          select: {
            widgetId: true,
          },
        },
      },
    });
     widgets = widgets.map((widget) => {
      const isFavorite = widget.Fav_widget.length > 0
    
      return {
        id: widget.id,
        name: widget.name,
        description: widget.description,
        image: widget.image,
        categoryId: widget.categories.map(item => item.id),
        isFavorite,
      };
    });
    const response = {categories: await getCategories(), widgets}
    return cors(request, response);
  };
  export const action = async ({ request }) => {
   
    const shop = await getShopName(request);
   
    const formData = new URLSearchParams(await request.text());
    const widgetId = parseInt(formData.get("widgetId"));
    return markWidgetAsFavorite(shop, widgetId);
  };
  export default function Widgets() {
    const fetcher = useFetcher();
    const widgets_data = useLoaderData();
    const [widgets, setWidgets] = useState(widgets_data.widgets);
    const [categories, setCategories] = useState(widgets_data.categories);
    const handleFavourite = (widgetId) =>{
      const updatedWidgets = widgets.map((widget) => {
        if (widget.id == widgetId) {
          return { ...widget, isFavorite: !widget.isFavorite };
        }
        return widget;
      });
      setWidgets(updatedWidgets)
      fetcher.submit(
        {
          widgetId: widgetId,
        },
        { method: "POST", action: "/widgets" }
      );
    }
    return (
      <Page>
        <TitleBar title="BuddyBoss Widget" />
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                {JSON.stringify(categories)}
                {JSON.stringify(widgets)}
                {widgets && widgets.length > 0 ? (
                  widgets.map((widget) => (
                    <div onClick={() => handleFavourite(widget.id)}>
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
  
  
  