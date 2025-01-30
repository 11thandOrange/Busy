import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from "@remix-run/node";

import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

// Define a file upload handler to save files to the public/Files directory
export const standardFileUploadHandler = unstable_createFileUploadHandler({
  directory: "public/Files",
});
export const fileUploadHandler = (args) => {
  return standardFileUploadHandler(args);
};

export async function action({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get('shop')?.toString();

  const uploadHandler = unstable_composeUploadHandlers(
      async ({ name, contentType, data, filename }) => {
          const uploadedImage = await fileUploadHandler({
              name,
              data,
              filename,
              contentType,
          });
          return uploadedImage;
      },
      unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
  );

  const fields = {};
  for (const [name, value] of formData.entries()) {
      fields[name] = value;
  }
console.log(fields)
  const fileName = fields.file?.name;
  return json({ fileName });
}

export default function UploadPage() {
  const actionData = useActionData();

  return (
      <div>
          <h1>Upload a File</h1>
          <Form method="post" encType="multipart/form-data">
              <input type="file" name="file" />
              <input type="text" name="shop" />
              <button type="submit">Upload</button>
          </Form>

          {actionData?.fileName && (
              <p>Uploaded file: {actionData.fileName}</p>
          )}
      </div>
  );
}