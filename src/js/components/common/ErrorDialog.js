import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import {icons} from '../../commonStyles/commonInlineStyles'
import {clearFormError} from "../../actionCreators/common";
import {styles} from '../../commonStyles/commonInlineStyles'


class ErrorDialog extends Component {
    constructor(props) {
        super(props)
    }

    handleClose() {
        const {dispatch} = this.props
        dispatch(clearFormError())
    }

    render() {
        const {errorMessage, formError} = this.props
        return (<Dialog
            open={formError}
            onClose={() => this.handleClose()}>
                <DialogTitle><div>{icons.errorAvatar} Error submitting form</div></DialogTitle>
                <DialogContent>{errorMessage}</DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={() => this.handleClose()} style={styles.flatButton} disableRipple={true}>ok</Button>
                </DialogActions>
            </Dialog>)

    }
}

ErrorDialog.propTypes = {
    dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
    return {
        errorMessage: state.submit_form.submitFormErrorMessage,
        formError: state.submit_form.formError
    }
}

export default connect(mapStateToProps)(ErrorDialog)
