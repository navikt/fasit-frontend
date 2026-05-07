import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Snackbar from '@mui/material/Snackbar'

function SubmitFormStatus({ form }) {
    const autoHideDuration = 4000

    return (
        <Snackbar
            open={form.displaySnackbar}
            message="Success"
            autoHideDuration={autoHideDuration}
        />
    )
}

SubmitFormStatus.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        form: state.submit_form,
    }
}

export default connect(mapStateToProps)(SubmitFormStatus)
