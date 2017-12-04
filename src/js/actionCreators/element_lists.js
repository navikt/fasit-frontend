import { SUBMIT_FILTER_SEARCH, CHANGE_FILTER, CLEAR_FILTERS, SET_FILTER } from "../actionTypes";

export const submitFilterString = (location, page) => {
    return { type: SUBMIT_FILTER_SEARCH, location, prPage: 50, page }
}

export const clearFilters = () => {
    return { type: CLEAR_FILTERS }
}

export const changeFilter = (filterName, filterValue) => {
    return { type: CHANGE_FILTER, filterName, filterValue }
}

export const setFilter = (filter) => {
    return { type: SET_FILTER, filter }
} 
