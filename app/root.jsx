import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { AppProvider } from "@shopify/polaris";
import { Link } from "@remix-run/react";
import "@shopify/polaris/build/esm/styles.css";
function LinkWrapper(props) {
  return (
    // TODO: fix type conflix with LegacyRef and Ref between Remix and Polaris
    <Link to={props.url ?? props.to} ref={props.ref} {...props}>
      {props.children}
    </Link>
  );
}
export default function App() {
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
      <AppProvider
      linkComponent={LinkWrapper}
      i18n={{
        Polaris: {
          Page: {
            Header: {
              rollupButton: 'Actions',
            },
          },
        },
      }}
    >
        <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
