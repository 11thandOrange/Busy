import { DropZone, LegacyStack, Thumbnail, Text } from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import "./style.css";

export default function DropZoneWithImageFileUpload({
  label = "",
  onImageUpload = () => {},
  initalImage = "",
}) {
  const [file, setFile] = useState();

  useEffect(() => {
    if (initalImage) setFile(initalImage);
  }, [initalImage]);
  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      onImageUpload(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
    [],
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <div className="image-import-wrapper">
      <LegacyStack >
        <Thumbnail
          size="small"
          alt={file.name}
          source={
            validImageTypes.includes(file.type)
              ? window.URL.createObjectURL(file)
              : initalImage
          }
        />
        {/* <div>
          {file.name}{" "}
          <Text variant="bodySm" as="p">
            {file.size} bytes
          </Text>
        </div> */}
      </LegacyStack>
    </div>
  );

  return (
    <DropZone label={label} allowMultiple={false} onDrop={handleDropZoneDrop}>
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
}
