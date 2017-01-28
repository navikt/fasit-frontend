import {
    SUBMITTING_FORM,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILED,
    CLOSE_SUBMIT_FORM_STATUS
} from '../actionTypes'
export default (state = {
    isSubmitting: false,
    submitError: false,
    submitSuccess: false,
}, action) => {

    switch (action.type) {

        case SUBMITTING_FORM:
            return Object.assign({}, state, {
                isSubmitting: true
            })

        case SUBMIT_FORM_FAILED:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitError: action.value
            })

        case SUBMIT_FORM_SUCCESS:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitSuccess: true
            })

        case CLOSE_SUBMIT_FORM_STATUS:
            return Object.assign({}, state, {
                isSubmitting:false,
                submitError: false,
                submitSuccess: false
            })


        default:
            return state
    }
}
