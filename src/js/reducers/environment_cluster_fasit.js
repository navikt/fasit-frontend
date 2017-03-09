import {
    ENVIRONMENT_CLUSTER_FASIT_FETCHING,
    ENVIRONMENT_CLUSTER_FASIT_RECEIVED,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED,
} from '../actionTypes'

export default (state = {
    data: [],
    isFetching: false,
    requestFailed: false,
}, action) => {
    switch (action.type) {
        case ENVIRONMENT_CLUSTER_FASIT_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isFetching: true,
                requestFailed: false
            })
        case ENVIRONMENT_CLUSTER_FASIT_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })
        case ENVIRONMENT_CLUSTER_FASIT_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isFetching: false
            })

        default:
            return state
    }
}