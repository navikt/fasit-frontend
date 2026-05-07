import React from 'react'
import {connect} from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import {icons} from '../../commonStyles/commonInlineStyles'
import {clearFormError} from "../../actionCreators/common";
import {styles} from '../../commonStyles/commonInlineStyles'


function ErrorDialog({ dispatch, errorMessage, formError }) {
    const handleClose = () => {
        dispatch(clearFormError())
    }

    return (<Dialog
        open={formError}
        onClose={handleClose}>
            <DialogTitle><div>{icons.errorAvatar} Error submitting form</div></DialogTitle>
            <DialogContent>{errorMessage}</DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleClose} style={styles.flatButton} disableRipple={true}>ok</Button>
            </DialogActions>
        </Dialog>)
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.submit_form.submitFormErrorMessage,
        formError: state.submit_form.formError
    }
}

export default connect(mapStateToProps)(ErrorDialog)
