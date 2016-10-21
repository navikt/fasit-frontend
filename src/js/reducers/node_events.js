import {
    NODE_EVENTS_RECEIVED,
    NODE_EVENTS_FETCHING,
    NODE_EVENTS_REQUEST_FAILED,
} from '../actionTypes'

export default (state = {
    data: [],
    isFetching: false,
    requestFailed: false
}, action) => {
    switch (action.type) {
        case NODE_EVENTS_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })
        case NODE_EVENTS_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isFetching: true,
                requestFailed: false
            })
        case NODE_EVENTS_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isFetching:false
            })

        default:
            return state
    }
}