import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {icons} from '../../commonStyles/commonInlineStyles'
import {clearFormError} from "../../actionCreators/common";


class ErrorDialog extends Component {
    constructor(props) {
        super(props)
    }

    handleClose() {
        const {dispatch} = this.props
        dispatch(clearFormError())
    }

    render() {
        const actions = [
            <FlatButton label="ok" primary={true} onTouchTap={() => this.handleClose()} disableTouchRipple={true}/>
        ]
        const {errorMessage, formError} = this.props
        return (<Dialog
            title={<div>{icons.errorAvatar} Error submitting form</div>}
            open={formError}
            modal={false}
            actions={actions}
            onRequestClose={() => this.handleClose()}>
                {errorMessage}
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
