import React from "react";
import { Modal } from "../components/ModalsManager";
import LoadingModal from "../modals/LoadingModal";
import ConfiramtionModal from "../modals/ConfiramtionModal";

const ModalManager = () => {
  return (
    <div>
      <Modal index="loading" clickOverlayClose={false} showExitButton={false}>
        <LoadingModal />
      </Modal>
      <Modal index="confirm">
        <ConfiramtionModal />
      </Modal>
    </div>
  );
};

export default ModalManager;
