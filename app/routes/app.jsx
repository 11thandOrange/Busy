import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider as RemixAppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import en from "@shopify/polaris/locales/en.json";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];
import {AppProvider } from '@shopify/polaris';
export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();
console.log("EN",en)
  return (
   
    <RemixAppProvider isEmbeddedApp apiKey={apiKey} >
     
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/apps">Apps</Link>
        <Link to="/widgets">Widgets</Link>
        <Link to="/app/additional">Additional page</Link>
        <Link to="/homepage">homepage</Link>
        <Link to="/plan">plan</Link>
        
      </NavMenu>
     
      <Outlet />
     </RemixAppProvider>
  
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
