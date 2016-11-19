import {
    CHANGE_FILTER,
    SET_SEARCH_CONTEXT,
    SET_SEARCH_STRING
} from '../actionTypes'

export const changeFilter = (filtername, searchString) => (dispatch) => dispatch({
        type: CHANGE_FILTER,
        filtername,
        searchString
    })

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
