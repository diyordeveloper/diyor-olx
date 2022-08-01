import React, { useEffect, useRef } from "react";
import { useUserContext } from "../Contexts/Context";
import Modal from "react-bootstrap/Modal";
import Audio1 from "./audio/audio1.ogg";
function ModalDocumentation() {
  const { showModal, ToggleModalopen } = useUserContext();

  return (
    <>
      <Modal size="xl" show={showModal} onHide={ToggleModalopen}>
        <Modal.Header closeButton>
          <Modal.Title>Yordamchi mikrafon yo'riqnomasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <audio src={Audio1} controls />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDocumentation;
