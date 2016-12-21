import {
    FETCH_ELEMENT_LISTS,
    CHANGE_PAGE,
    CHANGE_FILTER
} from '../actionTypes'

export const submitSearchString = (location, searchString, page) => {
    return {type: FETCH_ELEMENT_LISTS, location, searchString, prPage: 10, page}
}

export const changeFilter = (filterName, filterValue) => {
    return {type: CHANGE_FILTER, filterName, filterValue}
}

export const changePage = (page, lastPage) => (dispatch) => {
    if (page < 0) page = 0
    if (page > lastPage) page = lastPage
    dispatch({type: CHANGE_PAGE, value: page})
}