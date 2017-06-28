import {
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    NAVSEARCH_RESULTS_FETCHING,
    SET_NAVSEARCH_QUERY,

} from '../actionTypes'

export const initialState = {
    data: [],
    requestFailed: false,
    isFetching:false,
    query: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NAVSEARCH_QUERY:
            return Object.assign({}, state, {
                query: action.value,
                requestFailed: false
            })
        case NAVSEARCH_RESULTS_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                requestFailed: false,
                isFetching:false
            })
        case NAVSEARCH_RESULTS_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isFetching: true
            })
        case NAVSEARCH_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isFetching:false
            })
        default:
            return state
    }
}