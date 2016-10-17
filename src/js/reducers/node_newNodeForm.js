import {
    CLEAR_NEW_NODE_FORM,
    CLOSE_SUBMIT_NEW_NODE_FORM_STATUS,
    SET_NEW_NODE_FORM_ENVIRONMENT,
    SET_NEW_NODE_FORM_ENVIRONMENTCLASS,
    SET_NEW_NODE_FORM_HOSTNAME,
    SET_NEW_NODE_FORM_PASSWORD,
    SET_NEW_NODE_FORM_TYPE,
    SET_NEW_NODE_FORM_USERNAME,
    SET_NEW_NODE_FORM_ZONE,
    SUBMIT_NEW_NODE_FORM_FAILED,
    SUBMIT_NEW_NODE_FORM_SUCCESS,
    SUBMITTING_NEW_NODE_FORM,
} from '../actionTypes'

export default (state = {
    environment: "",
    environmentclass: "",
    hostname: "",
    password: "",
    type: "",
    username: "",
    zone: "",
    isSubmitting: false,
    submitError: false,
    submitSuccess: false
}, action) => {

    switch (action.type) {

        case CLEAR_NEW_NODE_FORM:
            return Object.assign({}, state, {
                environment: "",
                environmentclass: "",
                hostname: "",
                password: "",
                type: "",
                username: "",
                zone: "",
            })

        case CLOSE_SUBMIT_NEW_NODE_FORM_STATUS:
            return Object.assign({}, state, {
                environment: "",
                environmentclass: "",
                hostname: "",
                password: "",
                type: "",
                username: "",
                zone: "",
                isSubmitting: false,
                submitError: false,
                submitSuccess: false,
            })

        case SET_NEW_NODE_FORM_ENVIRONMENT:
            return Object.assign({}, state, {
                environment: action.value,
            })

        case SET_NEW_NODE_FORM_ENVIRONMENTCLASS:
            return Object.assign({}, state, {
                environmentclass: action.value,
            })

        case SET_NEW_NODE_FORM_HOSTNAME:
            return Object.assign({}, state, {
                hostname: action.value,
            })

        case SET_NEW_NODE_FORM_PASSWORD:
            return Object.assign({}, state, {
                password: action.value
            })

        case SET_NEW_NODE_FORM_TYPE:
            return Object.assign({}, state, {
                type: action.value,
            })

        case SET_NEW_NODE_FORM_USERNAME:
            return Object.assign({}, state, {
                username: action.value,
            })

        case SET_NEW_NODE_FORM_ZONE:
            return Object.assign({}, state, {
                zone: action.value,
            })

        case SUBMITTING_NEW_NODE_FORM:
            return Object.assign({}, state, {
                isSubmitting: true
            })

        case SUBMIT_NEW_NODE_FORM_FAILED:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitError: action.value
            })

        case SUBMIT_NEW_NODE_FORM_SUCCESS:
            return Object.assign({}, state, {
                isSubmitting: false,
                submitSuccess: true
            })


        default:
            return state
    }
}
