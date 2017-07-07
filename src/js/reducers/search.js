import {
    SEARCH_RESULTS_RECEIVED,
    SEARCH_REQUEST_FAILED,
    SEARCH_RESULTS_FETCHING,
    SET_SEARCH_FILTER,
} from '../actionTypes'

export const initialState = {
    data: [],
    requestFailed: false,
    isFetching: false,
    filter: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_FILTER:
            return Object.assign({}, state, {
                filter: action.value,
                requestFailed: false
            })
        case SEARCH_RESULTS_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                requestFailed: false,
                isFetching: false
            })
        case SEARCH_RESULTS_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isFetching: true
            })
        case SEARCH_REQUEST_FAILED:
            console.log("Req fail", action.error.message)
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isFetching: false
            })
        default:
            return state
    }
}