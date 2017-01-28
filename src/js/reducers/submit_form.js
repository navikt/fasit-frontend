import {
    SUBMITTING_FORM,
    SUBMIT_FORM_FAILED,
    SUBMIT_FORM_SUCCESS
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


        default:
            return state
    }
}
