import {
  LegacyCard,
  Tabs,
  TextField,
  Button,
  Icon,
  ResourceList,
  ResourceItem,
  Badge,
  EmptyState,
  AppProvider,
  // TextStyle,
  // Badge,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import DynamicEmptyState from "../../components/atoms/DynamicEmptyState";
import "@shopify/polaris/build/esm/styles.css";
import { APP_TABS, CATEGORIES_ENUM } from "../../utils/constants";
import AppsRenderList from "../../components/atoms/AppsRenderList";
import AppListingTemplateWithPagination from "../../components/templates/AppListingTemplateWithPagination";
import WidgetRenderList from "../../components/atoms/WidgetRenderList";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from "@remix-run/react";
import { useFetcher } from "@remix-run/react"; 
import { getCategories, getShopName, markWidgetAsFavorite } from "../../utils/function";
import './style.css'
import GoBack from "../../components/atoms/GoBack";

const tabs = [
  { id: "all", content: "All" },
  { id: "my-apps", content: "My apps" },
  { id: "boost-sales", content: "Boost Sales" },
  { id: "ux", content: "UX" },
  { id: "engage-users", content: "Engage Users" },
  { id: "social", content: "Social" },
];

const items = [
  {
    id: "1",
    category: ["boost-sales", "ux"],
    title: "Cart Notice",
    description:
      "Easily collect, import and display reviews with photos and boost trust and conversion rates with social proof.",
    status: "Active",
  },
  {
    id: "2",
    category: ["boost-sales"],
    title: "Countdown Timer",
    description:
      "Create social proof by showing notifications regarding your recent orders and products being added to cart.",
  },
  {
    id: "3",
    category: ["engage-users", "ux"],
    title: "Announcement Bars",
    description:
      "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
  },
  {
    id: "4",
    category: [],
    title: "Inactive Tab",
    description:
      "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
  },
  {
    id: "4",
    category: [],
    title: "Inactive Tab",
    description:
      "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
  },
  {
    id: "4",
    category: [],
    title: "Inactive Tab",
    description:
      "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
  },
  {
    id: "4",
    category: [],
    title: "Inactive Tab",
    description:
      "Build trust by letting your visitors know that you are accepting a wide assortment of payment methods.",
  },
];

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

function TabsInsideOfACardExample() {
  const fetcher = useFetcher();
  const widgets_data = useLoaderData()
  const [widgets, setWidgets] = useState([]);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    let updatedTabData = widgets_data?.categories?.map(item => {
      if(item.id === CATEGORIES_ENUM.favorites){
        return {
          ...item,
          content: (<div>{item.content} <span className="favourite-count">{widgets_data.widgets.find(item => item.isFavorite)?.length || 0}</span></div>)
        }
      };
      return item;
    })
    console.log(updatedTabData, "updatedTabData")
    setTabs(updatedTabData)
    setWidgets(widgets_data.widgets)
  }, [widgets_data]);

  const handleAddToFavorite = (widgetId) => {
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
    <div>
      <GoBack/>
      <AppListingTemplateWithPagination tabs={tabs} items={widgets} componentToRender={(props) => <WidgetRenderList {...props} handleAddToFavorite={handleAddToFavorite}/>}/>
    </div>
  );
}

export default TabsInsideOfACardExample;
