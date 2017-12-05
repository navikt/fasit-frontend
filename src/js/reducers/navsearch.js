import {
    NAVSEARCH_RESULTS_RECEIVED,
    NAVSEARCH_REQUEST_FAILED,
    NAVSEARCH_RESULTS_FETCHING,
    SET_NAVSEARCH_QUERY,

} from '../actionTypes'
import { sortSearchResults } from "../utils"

export const initialState = {
    data: [],
    searchResultTypes: [],
    requestFailed: false,
    isFetching: false,
    query: ""
}


const sortOrder = ["quick navigation", "resources",]

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NAVSEARCH_QUERY:
            return Object.assign({}, state, {
                query: action.value,
                requestFailed: false
            })
        case NAVSEARCH_RESULTS_RECEIVED:
            return enrichAndSortSearchResults(state, action)
        case NAVSEARCH_RESULTS_FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            })
        case NAVSEARCH_REQUEST_FAILED:
            console.error("failed fetching navsearch", action)
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                searchResultTypes: [],
                isFetching: false
            })
        default:
            return state
    }
}

function enrichAndSortSearchResults(state, action) {
    const navigationResult = { id: 0, name: `Search resources for ${state.query}`, type: "Quick navigation" }
    const searchResultsWithQuickNav = [navigationResult, ...sortSearchResults(action.value)]
    const types = [...new Set(searchResultsWithQuickNav.map(item => item.type))]

    return Object.assign({}, state, {
        data: searchResultsWithQuickNav,
        searchResultTypes: types,
        requestFailed: false,
        isFetching: false
    })
}
