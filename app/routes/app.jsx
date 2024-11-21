import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import { ROUTES } from "../utils/constants";

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
            <Link href={ROUTES.HOME} rel="home">
              Home
            </Link>
            <Link to={ROUTES.APPS}>Apps</Link>
            <a href={ROUTES.WIDGETS}>Widgets</a>
            <a href={ROUTES.SETTINGS}>Settings</a>
            <a href={ROUTES.ANALYTICS}>Analytics</a>
            <a href={ROUTES.PLAN}>Plan</a>
            <a href={ROUTES.HOMEPAGE}>homepage</a>
            <a href={ROUTES.ANNOUNCEMENT_BAR}>Announcement Customization</a>
            <a href={ROUTES.COUNTDOWN_TIMER}>Countdown Timer Customization</a>
            <Link to={ROUTES.ROUTE_TEST}>RouteTest</Link>
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
