import React from 'react'
import {Modal} from 'react-bootstrap'
import {FormCreatableList} from '../common'

export default function AccessControl(props){
    const { displayAccessControlForm, id, onClose, onSubmit, value, handleChange} = props
    return (
        <Modal show={displayAccessControlForm} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Alter access control for {id}
                    <button type="reset" className="btn btn-link pull-right" id="close"
                            onClick={onClose}><strong>X</strong>
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Set groups that will have access to this element. This will override the default accesscontrol based on environmentClass.
                <br /><br />
                Add a list of AD groups that will have exclusive edit and view password rights to this element
            </Modal.Body>
            <Modal.Footer>
                <FormCreatableList
                    label="adgroups"
                    editMode={true}
                    value={value}
                    handleChange={handleChange}
                />
                <br />
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-2">
                        <button type="submit" id="submit" className="btn btn-danger pull-right"
                                onClick={onSubmit}>Update
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
