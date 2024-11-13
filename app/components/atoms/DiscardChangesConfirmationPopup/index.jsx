import { Modal, Frame} from '@shopify/polaris';

const DiscardChangesConfirmationPopup = ({active = false, toggleModal = () => {}, title = 'Discard all unsaved changes', primaryActionContent = 'Discard changes', secondaryActionContent = 'Continue editing', primaryActionClick = () => {}, mainContent = ""}) => {
  return (
    <Frame>
      <div style={{height: '500px'}}>
        <Modal
          open={active}
          onClose={toggleModal}
          title={title}
          primaryAction={{
            destructive: true,
            content: primaryActionContent,
            onAction: primaryActionClick,
          }}
          secondaryActions={[
            {
              content: secondaryActionContent,
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            {mainContent ? mainContent : "If you discard changes, you’ll delete any edits you made since you last saved."}
          </Modal.Section>
        </Modal>
      </div>
    </Frame>
  );
}


export default DiscardChangesConfirmationPopup;