import {SUBMIT_FILTER_SEARCH, CHANGE_FILTER} from "../actionTypes";

export const submitFilterString = (location, page) => {
    return {type: SUBMIT_FILTER_SEARCH, location,  prPage: 50, page}
}

export const changeFilter = (filterName, filterValue) => {
    return {type: CHANGE_FILTER, filterName, filterValue}
}
