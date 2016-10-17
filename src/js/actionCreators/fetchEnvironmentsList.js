import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/environments/'

import {
    SET_ACTIVE_ENVIRONMENT,
    REQUEST_ENVIRONMENTS_LIST,
    RECEIVE_ENVIRONMENTS_LIST
} from '../actionTypes'

export const fetchEnvironmentsList = (filters) => {
    return (dispatch) => {
        dispatch(requestEnvironmentsList())
        return fetch(API_ROOT + buildFilterString(filters))
            .then(response => response.json())
            .then(json => filterResponse(json, filters))
            .then(filteredEnvironments => dispatch(receiveEnvironemntsData(filteredEnvironments)))
    }
}

export const setActiveEnvironment = (index) => {
    return {
        type: SET_ACTIVE_ENVIRONMENT,
        value: index
    }
}
const buildFilterString = (filters) => {
    let filterString = '?'
    if (filters['environmentclass'])
        filterString += "environmentclass=" + filters['environmentclass'] + "&"

    return filterString
}

const filterResponse = (json, filters) => {
    if (filters.environment) {
        return json.filter((environment) => {
            return environment.name.indexOf(filters.environment) !== -1
        })
    }
    return json
}
const requestEnvironmentsList = () => {
    return {
        type: REQUEST_ENVIRONMENTS_LIST,
    }
}
const receiveEnvironemntsData = (data) => {
    return {
        type: RECEIVE_ENVIRONMENTS_LIST,
        value: data
    }
}