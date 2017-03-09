import {
    SHOW_KEYBOARD_SHORTCUTS,
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    NAVSEARCH_RESULTS_FETCING,
    SET_NAVSEARCH_QUERY
} from '../actionTypes'

export const initialState = {
    data: [],
    displayShortcuts: false,
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
        case NAVSEARCH_RESULTS_FETCING:
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
        case     SHOW_KEYBOARD_SHORTCUTS:
            return Object.assign({}, state, {
                displayShortcuts: action.value
            })

        default:
            return state
    }
}