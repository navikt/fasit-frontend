import React from "react";
import Button from "@material-ui/core/Button";
import {styles} from "../../commonStyles/commonInlineStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

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