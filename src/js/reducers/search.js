import {
    SEARCH_RESULTS_RECEIVED,
    SEARCH_REQUEST_FAILED,
    SEARCH_RESULTS_FETCHING,
    SET_SEARCH_QUERY,
} from '../actionTypes'

export const initialState = {
    data: [],
    requestFailed: false,
    isFetching: false,
    query: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            console.log("SETQ", action.value)
            return Object.assign({}, state, {
                query: action.value,
                requestFailed: false
            })
        case SEARCH_RESULTS_RECEIVED:
            console.log("Se Re Rec", action.value)
            return Object.assign({}, state, {
                data: action.value,
                requestFailed: false,
                isFetching: false
            })
        case SEARCH_RESULTS_FETCHING:
            console.log("Se Re Fet", action.value)
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