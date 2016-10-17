import {
    CLEAR_NODE_PASSWORD,
    NODE_FASIT_RECEIVED,
    NODE_FASIT_FETCHING,
    NODE_FASIT_REQUEST_FAILED,
    NODE_FASIT_PASSWORD_RECEIVED,
    NODE_FASIT_PASSWORD_REQUEST_FAILED,
    SHOW_NODE_PASSWORD
} from '../actionTypes'

export default (state = {
    data: {},
    isFetching: false,
    requestFailed: false,
    currentPassword: "",
    showPassword: false
}, action) => {
    switch (action.type) {

        case CLEAR_NODE_PASSWORD:
            return Object.assign({}, state, {
                currentPassword: ""
            })

        case NODE_FASIT_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })

        case NODE_FASIT_FETCHING:
            return Object.assign({}, state, {
                data: {},
                isFetching: true,
                requestFailed: false
            })

        case NODE_FASIT_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: {},
                isFetching:false
            })

        case NODE_FASIT_PASSWORD_RECEIVED:
            return Object.assign({}, state, {
                currentPassword: action.value
            })

        case NODE_FASIT_PASSWORD_REQUEST_FAILED:
            return Object.assign({}, state, {
                currentPassword: action.value
            })

        case SHOW_NODE_PASSWORD:
            return Object.assign({}, state, {
                showPassword: action.value
            })
        default:
            return state
    }
}