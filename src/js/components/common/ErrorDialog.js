import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
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
