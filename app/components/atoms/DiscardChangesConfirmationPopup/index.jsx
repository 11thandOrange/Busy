import { Modal, Frame } from "@shopify/polaris";
import { FETCHER_STATE } from "../../../utils/constants";
import { isLoading } from "../../../utils/clientFunctions";

const DiscardChangesConfirmationPopup = ({
  active = false,
  toggleModal = () => {},
  title = "Discard all unsaved changes",
  primaryActionContent = "Discard changes",
  secondaryActionContent = "Continue editing",
  primaryActionClick = () => {},
  mainContent = "",
  fetcherState = FETCHER_STATE.IDLE,
}) => {
  return (
    <div>
      <Modal
        open={active}
        onClose={toggleModal}
        title={title}
        primaryAction={{
          destructive: true,
          content: primaryActionContent,
          onAction: primaryActionClick,
          loading: isLoading(fetcherState),
        }}
        secondaryActions={[
          {
            content: secondaryActionContent,
            onAction: toggleModal,
          },
        ]}
      >
        <Modal.Section>
          {mainContent
            ? mainContent
            : "If you discard changes, you’ll delete any edits you made since you last saved."}
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default DiscardChangesConfirmationPopup;
