import {
    SHOW_KEYBOARD_SHORTCUTS,
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    NAVSEARCH_RESULTS_FETCHING,
    SET_NAVSEARCH_QUERY,
    SEARCH_RESULTS_RECEIVED,
    SEARCH_REQUEST_FAILED,
    SEARCH_RESULTS_FETCHING,
    SET_SEARCH_QUERY,


} from '../actionTypes'

export const initialState = {
    data: [],
    displayShortcuts: false,
    requestFailed: false,
    isFetching:false,
    query: "",

    searchResults: [],
    searchRequestFailed: false,
    isSearching: false
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
        case SHOW_KEYBOARD_SHORTCUTS:
            return Object.assign({}, state, {
                displayShortcuts: !state.displayShortcuts
            })


        case SET_SEARCH_QUERY:
            return Object.assign({}, state, {
                query: action.value,
                searchRequestFailed: false
            })
        case SEARCH_RESULTS_RECEIVED:
            return Object.assign({}, state, {
                data: [],
                searchResults: action.value,
                searchRequestFailed: false,
                isSearching:false
            })
        case SEARCH_RESULTS_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isSearching: true
            })
        case SEARCH_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isSearching:false
            })
        default:
            return state
    }
}