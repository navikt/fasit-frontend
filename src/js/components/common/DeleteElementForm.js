import React from "react"
//import Button from '@material-ui/core/Button';
//import {styles} from "../../commonStyles/commonInlineStyles";
//import Dialog from '@material-ui/core/Dialog';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

export default function DeleteElement(props) {
  const { displayDeleteForm, id, onClose, onSubmit } = props
  /*const actions = [
        <Button
        size="small"
            disableTouchRipple={true}
            style={styles.flatButton}
            label="Ok"
            onClick={onSubmit}/>,
        <Button
        size="small"
        disableRipple={true}
            style={styles.flatButton}
            label="Cancel"
            onClick={onClose}/>
    ]*/

  /*return (
        <Dialog actions={actions} open={displayDeleteForm} modal={true} onRequestClose={onClose} title="Confirm delete">
            Are you sure you want to delete {id}?
        </Dialog>)*/

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
