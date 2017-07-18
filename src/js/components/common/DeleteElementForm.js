import React from "react";
import {Modal} from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import {FormComment} from "../common";
import {styles} from "../../commonStyles/commonInlineStyles";

export default function DeleteElement(props) {
    const {displayDeleteForm, id, onClose, onSubmit, comment, handleChange} = props
    return (
        <Modal show={displayDeleteForm} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Delete {id}
                    <button type="reset" id="close" className="btn btn-link pull-right"
                            onClick={onClose}><strong>X</strong>
                    </button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Going to delete {id}
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
                        <RaisedButton disableTouchRipple={true} style={styles.button} onTouchTap={onSubmit}>
                            <strong style={{color: 'white'}}><i className="fa fa-fw fa-trash"/>&nbsp;DELETE</strong>
                        </RaisedButton>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}