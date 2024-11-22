
import { useState, useCallback, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { APP_TABS, CATEGORIES_ENUM } from "../../utils/constants";
import AppListingTemplateWithPagination from "../../components/templates/AppListingTemplateWithPagination";
import WidgetRenderList from "../../components/atoms/WidgetRenderList";
import db from "../../db.server";
import { cors } from 'remix-utils/cors';
import { useLoaderData } from "@remix-run/react";
import { useFetcher } from "@remix-run/react"; 
import { getCategories, getShopName, markWidgetAsFavorite } from "../../utils/function";
import './style.css'
import GoBack from "../../components/atoms/GoBack";

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
      description_title: widget.description_title,
      description_content: widget.description_content,
      slug: widget.slug,
      image: widget.image,
      categoryId: widget.categories.map(item => item.id),
      type: widget.type,
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
  const widgets_data = useLoaderData();
  console.log('test', widgets_data)
  const [widgets, setWidgets] = useState(null);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    let updatedTabData = widgets_data?.categories?.map(item => {
      if(item.id === CATEGORIES_ENUM.favorites){
        return {
          ...item,
          content: (<div>{item.content} <span className="favourite-count">{widgets_data.widgets.filter(item => item.isFavorite)?.length}</span></div>)
        }
      };
      return item;
    })
    setTabs(updatedTabData)
    setWidgets(widgets_data.widgets);

  }, [widgets_data]);

  const handleAddToFavorite = (widgetId) => {
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
