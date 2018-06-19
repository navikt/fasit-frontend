import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {styles} from "../../commonStyles/commonInlineStyles";
import TextField from "material-ui/TextField";

export default function RescueElementForm(props) {
    const {displayRescueForm, id, onClose, onSubmit, handleChange} = props
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
        <Dialog actions={actions} open={displayRescueForm} onRequestClose={onClose} title={`Confirm rescue of ${id}`}/>
    )
}
