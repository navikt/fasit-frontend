import React from "react";
import Button from "@mui/material/Button";
import {styles} from "../../commonStyles/commonInlineStyles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function DeleteElement(props) {
    const {displayDeleteForm, id, onClose, onSubmit} = props

    return (
        <Dialog open={displayDeleteForm} onClose={onClose}>
            <DialogTitle>Confirm delete</DialogTitle>
            <DialogContent>Are you sure you want to delete {id}?</DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    disableRipple={true}
                    style={styles.flatButton}
                    onClick={onSubmit}>Ok</Button>
                <Button
                    variant="text"
                    disableRipple={true}
                    style={styles.flatButton}
                    onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>)

}