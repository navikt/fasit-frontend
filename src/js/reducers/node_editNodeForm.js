import {
    CLEAR_EDIT_NODE_FORM,
    CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS,
    SET_EDIT_NODE_FORM_VALUES,
    SET_EDIT_NODE_FORM_HOSTNAME,
    SET_EDIT_NODE_FORM_TYPE,
    SET_EDIT_NODE_FORM_USERNAME,
    SET_EDIT_NODE_FORM_PASSWORD,
    SUBMIT_EDIT_NODE_FORM_SUCCESS,
    SUBMIT_EDIT_NODE_FORM_FAILED,
    SUBMITTING_EDIT_NODE_FORM,
    REQUEST_EDIT_NODE_FORM_DATA,
    REQUEST_EDIT_NODE_FORM_DATA_FAILED,
    RECEIVED_EDIT_NODE_FORM_DATA,
} from '../actionTypes'
export default (state = {
    hostname: "",
    type: "",
    username: "",
    password: "",
    isFetching: false,
    isSubmitting: false,
    fetchError: false,
    submitError: false,
    submitSuccess: false,
}, action) => {

    switch (action.type) {

        case CLEAR_EDIT_NODE_FORM:
            return Object.assign({}, state, {
                hostname: "",
                type: "",
                username: "",
                password: "",
            })

        case CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS:
            return Object.assign({}, state, {
                hostname: "",
                type: "",
                username: "",
                password: "",
                isFetching: false,
                isSubmitting: false,
                fetchError: false,
                submitError: false,
                submitSuccess: false,
            })
        case REQUEST_EDIT_NODE_FORM_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                fetchError: false
            })

        case REQUEST_EDIT_NODE_FORM_DATA_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                fetchError: action.value
            })

        case RECEIVED_EDIT_NODE_FORM_DATA:
            return Object.assign({}, state, action.value, {
                    currentPassword: action.value.password
                }
            )

        case SET_EDIT_NODE_FORM_HOSTNAME:
            return Object.assign({}, state, {
                hostname: action.value,
            })

        case SET_EDIT_NODE_FORM_TYPE:
            return Object.assign({}, state, {
                type: action.value,
            })

        case SET_EDIT_NODE_FORM_USERNAME:
            return Object.assign({}, state, {
                username: action.value,
            })

        case SET_EDIT_NODE_FORM_PASSWORD:
            return Object.assign({}, state, {
                password: action.value
            })

        case SET_EDIT_NODE_FORM_VALUES:
            return Object.assign({}, state, action.value)

        case SUBMITTING_EDIT_NODE_FORM:
            return Object.assign({}, state, {
                isSubmitting: true
            })

        case SUBMIT_EDIT_NODE_FORM_FAILED:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitError: action.value
            })

        case SUBMIT_EDIT_NODE_FORM_SUCCESS:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitSuccess: true
            })


        default:
            return state
    }
}
