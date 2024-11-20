import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  hsbToHex,
} from "@shopify/polaris";
import React, { useState } from "react";
import PopoverContent from "../PopoverContent";
// import barsData from "../../../data/barsData";
import popoverData from "../../../data/popoverData";
import { announcementPopoverData } from "../../../constants/announcementCustomizationConfig";
import DiscardChangesConfirmationPopup from "../../atoms/DiscardChangesConfirmationPopup";
import DynamicEmptyState from "../../atoms/DynamicEmptyState";
import { formatDateAndTime } from "../../../utils/clientFunctions";
import { useNavigate } from "@remix-run/react";
import { ROUTES } from "../../../utils/constants";
const barState = {
  ACTIVE: "success",
  INACTIVE: "critical",
};
hsbToHex;
function CheckBars({ barsData }) {
  const navigate = useNavigate();
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(barsData);

  const rowMarkup = barsData.map(
    ({ id, name, createdAt, status, general_setting }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <div>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {name}
            </Text>
            <span style={{ marginLeft: "5px" }}>
              {" "}
              <Badge
                tone={status == true ? barState.ACTIVE : barState.INACTIVE}
              >
                {status === true ? "Active" : "Inactive"}
              </Badge>
            </span>

            <p>{general_setting} </p>
          </div>
        </IndexTable.Cell>

        <Text as="span" alignment="end" numeric>
          {formatDateAndTime(createdAt)}
        </Text>
      </IndexTable.Row>
    ),
  );
  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: () => {
        onConfirmDelete(true);
      },
    },
  ];

  const [confirmDelete, onConfirmDelete] = useState(false);

  return (
    <LegacyCard>
      {barsData.length ? (
        <>
          <IndexTable
            resourceName={resourceName}
            itemCount={barsData.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: `Showing ${barsData.length} announcement bar` },
            ]}
            promotedBulkActions={promotedBulkActions}
          >
            {rowMarkup}
          </IndexTable>
          <div style={{ position: "absolute", top: "4px", right: "10px" }}>
            <PopoverContent
              options={announcementPopoverData}
              heading="Create"
              onSelect={(selectedType) => {
                navigate(
                  `${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${selectedType}`,
                );
              }}
            ></PopoverContent>
            <DiscardChangesConfirmationPopup
              active={confirmDelete}
              toggleModal={() => {
                onConfirmDelete(false);
              }}
              primaryActionClick={() => {
                console.log("Selected option: ", selectedResources);
                onConfirmDelete(false);
              }}
              secondaryActionContent="close"
              primaryActionContent="Delete"
              mainContent="This cannot be undone. Are you sure you want to delete the selected announcement bar(s)?"
              title="Delete 1 item(s)?"
            ></DiscardChangesConfirmationPopup>
          </div>
        </>
      ) : (
        <DynamicEmptyState
          heading={"Create your first Announcement Bar"}
          description={
            "Display an interactive Free Shipping message, capture leads, or build trust using any of the 5 types of Announcement Bars."
          }
          actionContent={
            <PopoverContent
              options={announcementPopoverData}
              heading="Create Announcement Bar"
              onSelect={(selectedType) => {
                navigate(
                  `${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${selectedType}`,
                );
              }}
            ></PopoverContent>
          }
          actionCallback={() => {}}
        ></DynamicEmptyState>
      )}
    </LegacyCard>
  );
}

export default CheckBars;
