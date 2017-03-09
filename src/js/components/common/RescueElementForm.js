import React from 'react'
import {Modal} from 'react-bootstrap'
import {FormComment} from '../common'

export default function RescueElementForm(props){
    const { displayRescueForm, id, onClose, onSubmit, comment, handleChange} = props
    return (
        <Modal show={displayRescueForm} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Rescue {id}
                    <button type="reset" className="btn btn-link pull-right"
                            onClick={onClose}><strong>X</strong>
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This will save {id}
                <br />
                Are you sure?

            </Modal.Body>
            <Modal.Footer>
                <FormComment
                    value={comment}
                    handleChange={handleChange}
                />
                <br />
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-2">
                        <button type="submit" className="btn btn-info pull-right"
                                onClick={onSubmit}><i className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
