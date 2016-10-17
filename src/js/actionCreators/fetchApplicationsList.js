import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/applications/'

import {
    SET_ACTIVE_APPLICATION,
    REQUEST_APPLICATIONS_LIST,
    RECEIVE_APPLICATIONS_LIST
} from '../actionTypes'

export const fetchApplicationsList = (filters) => {
    return (dispatch) => {
        dispatch(requestApplicationsList())
        return fetch(API_ROOT + buildFilterString(filters))
            .then(response => response.json())
            .then(json => dispatch(receiveFasitData(json)))
    }
}
export const setActiveApplication = (index) => {
    return {
        type: SET_ACTIVE_APPLICATION,
        value: index
    }
}
const buildFilterString = (filters) => {
    let filterString = '?'
    if (filters['application'])
        filterString += "name=" + filters['application'] + "&"

    return filterString
}
const requestApplicationsList = () => {
    return {
        type: REQUEST_APPLICATIONS_LIST,
    }
}
const receiveFasitData = (data) => {
    return {
        type: RECEIVE_APPLICATIONS_LIST,
        value: data
    }
}