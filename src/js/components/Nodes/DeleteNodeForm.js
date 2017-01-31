import React from 'react'
import {Modal} from 'react-bootstrap'

export default function DeleteNodeForm(props){
    const { displayDeleteNode, hostname, onClose, onSubmit } = props
        return (
            <Modal show={displayDeleteNode} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Delete {hostname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Going to delete {hostname}
                    <br />
                    Are you sure?

                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-block">
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="submit" className="btn btn-danger pull-right"
                                    onClick={onSubmit}>Delete
                            </button>
                            <button type="reset" className="btn btn-default btn-space pull-right"
                                    onClick={() => onClose({hostname}, null, null, "deleteNode")}>Close
                            </button>

                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
