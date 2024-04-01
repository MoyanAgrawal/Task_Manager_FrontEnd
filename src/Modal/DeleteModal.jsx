import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { baseUrl } from "../Components/Hero";

function DeleteModal({ showDeleteModal, onHide, task, getList }) {
  function handleDelete() {
    axios
      .delete(`${baseUrl}/tasks/delete/${task._id}`, {})
      .then((res) => {
        console.log(res.data);
        onHide();
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal
      show={showDeleteModal}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#b985b9" }}>
        <h4>Are you sure you want to delete this card</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
