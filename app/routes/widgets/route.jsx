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
import { useState, useCallback } from "react";
import DynamicEmptyState from "../../components/atoms/DynamicEmptyState";
import "@shopify/polaris/build/esm/styles.css";
import { APP_TABS } from "../../utils/constants";
import AppsRenderList from "../../components/atoms/AppsRenderList";
import AppListingTemplateWithPagination from "../../components/templates/AppListingTemplateWithPagination";
import WidgetRenderList from "../../components/atoms/WidgetRenderList";

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

function TabsInsideOfACardExample() {

  return (
    <AppListingTemplateWithPagination tabs={APP_TABS} list={items} componentToRender={(props) => <WidgetRenderList {...props}/>}/>
  );
}

export default TabsInsideOfACardExample;
