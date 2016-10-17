import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/resources/'

import {
    SET_ACTIVE_RESOURCE,
    REQUEST_RESOURCES_LIST,
    RECEIVE_RESOURCES_LIST
} from '../actionTypes'

export const fetchResourcesList = (filters) => {
    return (dispatch) => {
        dispatch(requestResourcesList())
        return fetch(API_ROOT + buildFilterString(filters))
            .then(response => response.json())
            .then(json => dispatch(receiveFasitData(json)))
    }
}

export const setActiveResource = (index) => {
    return {
        type: SET_ACTIVE_RESOURCE,
        value: index
    }
}
const buildFilterString = (filters) => {
    let filterString = '?'
    let filterTypes = ["alias", "environment", "environmentclass", "zone", "application"]
    for (let filter in filters) {
        if (filterTypes.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    if (filters['resourcetype'])
        filterString += "type=" + filters['resourcetype'] + "&"
    return filterString
}
const requestResourcesList = () => {
    return {
        type: REQUEST_RESOURCES_LIST,
    }
}
const receiveFasitData = (data) => {
    return {
        type: RECEIVE_RESOURCES_LIST,
        value: data
    }
}