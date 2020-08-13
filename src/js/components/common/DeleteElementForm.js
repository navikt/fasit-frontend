import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function DeleteElement(props) {
  const { displayDeleteForm, id, onClose, onSubmit } = props

  return (
    <Modal animation={false} show={displayDeleteForm} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete {id}?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
