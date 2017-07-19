import {
    RESOURCE_FASIT_RECEIVED,
    RESOURCE_FASIT_FETCHING,
    RESOURCE_FASIT_REQUEST_FAILED,
    CLEAR_RESOURCE_SECRET,
    RESOURCE_FASIT_SECRET_RECEIVED
} from "../actionTypes";

export default (state = {
    data: {},
    isFetching: false,
    requestFailed: false,
}, action) => {
    switch (action.type) {

        case CLEAR_RESOURCE_SECRET:
            return Object.assign({}, state, {
                currentSecret: ""
            })

        case RESOURCE_FASIT_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })

        case RESOURCE_FASIT_FETCHING:
            return Object.assign({}, state, {
                data: {},
                isFetching: true,
                requestFailed: false
            })

        case RESOURCE_FASIT_SECRET_RECEIVED:
            return Object.assign({}, state, {
                currentSecret: action.value,

            })

        case RESOURCE_FASIT_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: {},
                isFetching: false
            })
        default:
            return state
    }
}