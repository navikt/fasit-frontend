import {
    CLOSE_SUBMIT_DELETE_NODE_STATUS,
    SUBMIT_DELETE_NODE_SUCCESS,
    SUBMIT_DELETE_NODE_FAILED,
    SUBMITTING_DELETE_NODE
} from '../actionTypes'

export default (state = {
    isSubmitting: false,
    submitError: false,
    submitSuccess: false
}, action) => {

    switch (action.type) {

        case CLOSE_SUBMIT_DELETE_NODE_STATUS:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitError: false,
                submitSuccess: false,
            })

        case SUBMITTING_DELETE_NODE:
            return Object.assign({}, state, {
                isSubmitting: true,
            })

        case SUBMIT_DELETE_NODE_FAILED:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitError: action.value
            })

        case SUBMIT_DELETE_NODE_SUCCESS:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitSuccess: true
            })

        default:
            return state
    }
}
