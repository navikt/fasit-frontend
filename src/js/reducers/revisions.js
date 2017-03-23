import {
    REVISIONS_FETCHING,
    REVISIONS_RECEIVED,
    REVISIONS_REQUEST_FAILED,
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: [],
}, action) => {
    switch (action.type) {
        case REVISIONS_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })

        case REVISIONS_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isFetching: true,
                requestFailed: false
            })

        case REVISIONS_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isFetching:false
            })
        default:
            return state
    }
}