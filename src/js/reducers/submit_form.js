import {
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILED
} from '../actionTypes'
export default (state = {
    displaySnackbar: false,
    submitMessage: ''
}, action) => {

    switch (action.type) {
        case SUBMIT_FORM_FAILED:
            return Object.assign({}, state, {
                displaySnackbar: true,
                submitMessage: `Error submitting ${action.value}`
            })

        case SUBMIT_FORM_SUCCESS:
            return Object.assign({}, state, {
                displaySnackbar: true,
                submitMessage: "Success"
            })
        default:
            return state
    }
}