import {SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILED, CLEAR_FORM_ERROR} from "../actionTypes";
export default (state = {
    displaySnackbar: false,
    formError: false,
    submitFormErrorMessage: ''

}, action) => {

    switch (action.type) {
        case SUBMIT_FORM_FAILED:
            return Object.assign({}, state, {
                formError: true,
                displaySnackbar: false,
                submitFormErrorMessage: `Error submitting ${action.value}`

            })

        case SUBMIT_FORM_SUCCESS:
            return Object.assign({}, state, {
                displaySnackbar: true,
                formError: false,
                submitFormErrorMessage: ''
            })
        case CLEAR_FORM_ERROR:
            return Object.assign({}, state, {
                formError: false,
                submitFormErrorMessage: ''
            })
        default:
            return state
    }
}