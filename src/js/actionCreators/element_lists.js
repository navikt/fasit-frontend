import {
    FETCH_ELEMENT_LISTS,
    CHANGE_PAGE,
    CHANGE_FILTER
} from '../actionTypes'

export const submitSearchString = (location, searchString, page) => {
    return {type: FETCH_ELEMENT_LISTS, location, searchString, prPage: 10, page}
}

export const changeFilter = (filterName, filterValue) => {
    return {
        type: CHANGE_FILTER,
        filterName,
        filterValue
    }
}

export const changePage = (page, lastPage)  => {
    if (page < 0) page = 0
    if (page > lastPage) page = lastPage
    return {type: CHANGE_PAGE, value: page}
}
