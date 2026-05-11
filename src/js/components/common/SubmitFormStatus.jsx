import React from 'react'
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

const mapStateToProps = (state) => {
    return {
        form: state.submit_form,
    }
}

export default connect(mapStateToProps)(SubmitFormStatus)
