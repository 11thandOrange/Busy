import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
} from "@shopify/polaris";
import "./style.css";
import React, { useEffect, useState } from "react";
import PopoverContent from "../PopoverContent";
import { announcementPopoverData } from "../../../constants/announcementCustomizationConfig";
import DiscardChangesConfirmationPopup from "../../atoms/DiscardChangesConfirmationPopup";
import DynamicEmptyState from "../../atoms/DynamicEmptyState";
import { formatDateAndTime, isLoading } from "../../../utils/clientFunctions";
import { useFetcher, useNavigate } from "@remix-run/react";
import { ROUTES } from "../../../utils/constants";
import SpinnerExample from "../../atoms/Spinner";
import ToastBar from "../../atoms/Toast";
import useToast from "../../../hooks/useToast";

const barState = {
  ACTIVE: "success",
  INACTIVE: "critical",
};

function CheckBars({
  barsData = [],
  pagination = false,
  onPageNext = () => {},
  onPagePrevious = () => {},
}) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { showToast, onDismiss } = useToast(fetcher);
  const [bars, setBars] = useState([]);
  const resourceName = {
    singular: "announcement bar",
    plural: "announcement bars",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Default number of items per page

  // Derived pagination controls
  const hasNext = currentPage * itemsPerPage < barsData?.length;
  const hasPrevious = currentPage > 1;
  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(bars);
  useEffect(() => {
    const barsDataNew = barsData?.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage,
    );
    console.log("bars data is here", barsData);

    setBars(barsDataNew);
  }, [currentPage, barsData]);

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: () => setConfirmDelete(true),
    },
  ];

  const handleCreateClick = (selectedType) => {
    navigate(`${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${selectedType}`);
  };

  const rowMarkup = bars?.map(
    ({ id, name, createdAt, status, general_setting, type }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
        onClick={() => {
          navigate(`${ROUTES.ANNOUNCEMENT_CUSTOMIZATION_ROOT}${type}?id=${id}`);
        }}
      >
        <IndexTable.Cell>
          <div>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {name}
            </Text>
            <p>{JSON.parse(general_setting).message || "Description"}</p>
          </div>
        </IndexTable.Cell>
        <div className="dateContainerContent">
          <div className="dateContainer">
            <Badge tone={status ? barState.ACTIVE : barState.INACTIVE}>
              {status ? "Active" : "Inactive"}
            </Badge>
            <Text as="span" alignment="end" numeric>
              {formatDateAndTime(createdAt)}
            </Text>
          </div>
        </div>
      </IndexTable.Row>
    ),
  );

  const handleDeleteConfirm = () => {
    fetcher.submit(
      {
        _action: "DELETE",
        announcement_bar_id: selectedResources,
      },
      { method: "DELETE", action: ROUTES.ANNOUNCEMENT_OVERVIEW },
    );
    setConfirmDelete(false);
    setCurrentPage(1);
    clearSelection();
  };

  return (
    <LegacyCard>
      <ToastBar
        onDismiss={onDismiss}
        show={showToast}
        message="Announcement bar(s) deleted successfully"
      />
      <IndexTable
        resourceName={resourceName}
        itemCount={bars?.length}
        selectedItemsCount={selectedResources.length}
        emptyState={
          <div className="bb-announcement-wrapper">
            <DynamicEmptyState
              heading="Create your first Announcement Bar"
              description="Display an interactive Free Shipping message, capture leads, or build trust using any of the 5 types of Announcement Bars."
              actionContent={
                <PopoverContent
                  options={announcementPopoverData}
                  heading="Create Announcement Bar"
                  onSelect={handleCreateClick}
                />
              }
              actionCallback={() => {}}
            />
          </div>
        }
        selectable={true}
        onSelectionChange={handleSelectionChange}
        headings={[{ title: `Showing ${bars?.length} announcement bar(s)` }]}
        promotedBulkActions={promotedBulkActions}
        {...(pagination && barsData?.length > 0
          ? {
              pagination: {
                hasNext: hasNext,
                hasPrevious: hasPrevious,
                onPrevious: handlePreviousPage,
                onNext: handleNextPage,
                label: bars?.length
                  ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                      currentPage * itemsPerPage,
                      barsData?.length,
                    )} of ${barsData?.length} items`
                  : "0-0 of 0 items",
              },
            }
          : {})}
      >
        {rowMarkup}
      </IndexTable>
      <div style={{ position: "absolute", top: "4px", right: "10px" }}>
        {bars?.length > 0 && (
          <PopoverContent
            options={announcementPopoverData}
            heading="Create"
            onSelect={handleCreateClick}
          />
        )}
        <DiscardChangesConfirmationPopup
          active={confirmDelete}
          toggleModal={() => setConfirmDelete(false)}
          primaryActionClick={handleDeleteConfirm}
          secondaryActionContent="Close"
          primaryActionContent="Delete"
          mainContent="This cannot be undone. Are you sure you want to delete the selected announcement bar(s)?"
          title={`Delete ${selectedResources.length} item(s)?`}
          fetcherState={fetcher.state}
        />
      </div>
      {isLoading(fetcher.state) && <SpinnerExample></SpinnerExample>}
    </LegacyCard>
  );
}

export default CheckBars;
