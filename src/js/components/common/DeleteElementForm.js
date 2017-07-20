import React from "react";
import FlatButton from "material-ui/FlatButton";
import {styles} from "../../commonStyles/commonInlineStyles";
import Dialog from "material-ui/Dialog";

export default function DeleteElement(props) {
    const {displayDeleteForm, id, onClose, onSubmit} = props
    const actions = [
        <FlatButton
            disableTouchRipple={true}
            style={styles.flatButton}
            label="Ok"
            onTouchTap={onSubmit}/>,
        <FlatButton
            disableTouchRipple={true}
            style={styles.flatButton}
            label="Cancel"
            onTouchTap={onClose}/>
    ]

    return (
        <Dialog actions={actions} open={displayDeleteForm} modal={true} onRequestClose={onClose} title="Confirm delete">
            Are you sure you want to delete {id}?
        </Dialog>)

}