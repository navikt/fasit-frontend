import {
    CHANGE_FILTER,
    CHANGE_ALL_FILTERS,
    SET_SEARCH_CONTEXT,
    SET_SEARCH_STRING
} from '../actionTypes'

export const changeFilter = (filtername, searchString) => (dispatch) => {
    if (filtername === "all") dispatch({type:CHANGE_ALL_FILTERS, searchString})
    return dispatch({
        type: CHANGE_FILTER,
        filtername,
        searchString
    })
}

export const setSearchLocation = (context) => {
    return {
        type: SET_SEARCH_CONTEXT,
        value: context
    }
}
export const setSearchString = (value) => {
    return {
        type: SET_SEARCH_STRING,
        value: value
    }
}
