import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();


  return (
    <>
      <AppProvider isEmbeddedApp apiKey={apiKey}>
        <PolarisAppProvider i18n={en}>
          <NavMenu>
            <Link href="/app" rel="home">
              Home
            </Link>
            <Link to="/apps">Apps</Link>
            <a href="/widgets">Widgets</a>
            <a href="/settings">Settings</a>
            <a href="/app/plan">Plan</a>
            <a href="/homepage">homepage</a>
            <a href="/announcementBar">Announcement Customization</a>
            <a href="/countdownTimer">Countdown Timer Customization</a>
            <Link to="/RouteTest">RouteTest</Link>
          </NavMenu>
          <Outlet />
        </PolarisAppProvider>
      </AppProvider>
    </>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
