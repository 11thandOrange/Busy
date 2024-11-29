import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import db from "../../db.server";
import { getShopName } from "../../utils/function";

export async function loader({ request }) {
  const shop = await getShopName(request);
  let inactive_tab_message = await db.inactive_tab_message.findFirst({
    where: {
      shop: shop,
    },
  });

  if (!inactive_tab_message) {
    inactive_tab_message = {};
  }
  return json(inactive_tab_message);
}

export async function action({ request }) {
  let inactive_tab_message = await request.formData();
  inactive_tab_message = Object.fromEntries(inactive_tab_message);
  const shop = await getShopName(request);
  await db.inactive_tab_message.upsert({
    where: { shop: shop },
    update: {
      message: inactive_tab_message.message,
      shop: shop,
    },
    create: {
      message: inactive_tab_message.message,
      shop: shop,
    },
  });

  return json(inactive_tab_message);
}

export default function InactiveTabMessagePage() {
  const inactive_tab_message = useLoaderData();
  console.log("inactive_tab_message", inactive_tab_message);

  const [formState, setFormState] = useState(inactive_tab_message);

  return (
    <Page>
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Inactive Tab Message
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="Message"
                  name="message"
                  value={formState?.message}
                  onChange={(value) =>
                    setFormState({ ...formState, message: value })
                  }
                />
                <Button submit={true}>Save </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
