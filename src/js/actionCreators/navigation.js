import {
    TOGGLE_SIDEBAR,
    CHANGE_FILTER,
    SET_SEARCH_CONTEXT,
    SET_SEARCH_STRING
} from '../actionTypes'

export const toggleSidebar = () => {
        return {
        type: TOGGLE_SIDEBAR,
    }
}
export const changeFilter = (filtername, event) => {
    return {
        type: CHANGE_FILTER,
        value: {filtername: filtername, filtervalue: event.value}
    }
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
