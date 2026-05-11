import { SUBMIT_FILTER_SEARCH, CHANGE_FILTER, CLEAR_FILTERS, SET_FILTER } from "../actionTypes";

export function submitFilterString(location, page) {
    return { type: SUBMIT_FILTER_SEARCH, location, prPage: 50, page }
}

export function clearFilters() {
    return { type: CLEAR_FILTERS }
}

export function changeFilter(filterName, filterValue) {
    return { type: CHANGE_FILTER, filterName, filterValue }
}

export function setFilter(filter) {
    return { type: SET_FILTER, filter }
} 
