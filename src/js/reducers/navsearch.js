import {
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    SET_NAVSEARCH_QUERY
} from '../actionTypes'

export default (state = {
    data: [],
    requestFailed: false
}, action) => {
    switch (action.type) {
        case SET_NAVSEARCH_QUERY:
            return Object.assign({}, state, {
                query: action.value,
                requestFailed: false
            })
        case NAVSEARCH_RESULTS_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                requestFailed: false
            })
        case NAVSEARCH_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: []
            })

        default:
            return state
    }
}