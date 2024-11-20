import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { AppProvider } from "@shopify/polaris";
import { AppProvider as RemixAppProvider } from "@shopify/shopify-app-remix/react";
import "@shopify/polaris/build/esm/styles.css";
import "./style.css";
import { authenticate } from "./shopify.server";

function LinkWrapper(props) {
  return (
    <Link to={props.url ?? props.to} ref={props.ref} {...props}>
      {props.children}
    </Link>
  );
}
export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};
export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <RemixAppProvider isEmbeddedApp apiKey={apiKey}>
          <AppProvider
            linkComponent={LinkWrapper}
            i18n={{
              Polaris: {
                Page: {
                  Header: {
                    rollupButton: "Actions",
                  },
                },
              },
            }}
          >
            <div className="app-main">
              <Outlet />
            </div>
          </AppProvider>
        </RemixAppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
