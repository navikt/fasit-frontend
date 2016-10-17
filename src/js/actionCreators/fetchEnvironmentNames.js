import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/environments/'


import {
    RECEIVE_ENVIRONMENT_NAMES
} from '../actionTypes'


export const fetchEnvironmentNames = (filters) => {
    return (dispatch) => {
        return fetch(API_ROOT + buildFilterString(filters))
            .then(response => response.json())
            .then(json => reduceToArrayOfNames(json))
            .then(environmentNames => dispatch(receiveEnvironmentNames(environmentNames)))
    }
}
const reduceToArrayOfNames = (environments) => {
    return environments.map(environment => {
        return environment.name
    })

}

const buildFilterString = (filters) => {
    let filterString = '?'
    if (filters['environmentclass'])
        filterString += "environmentclass=" + filters['environmentclass'] + "&"
    return filterString
}

const receiveEnvironmentNames = (data) => {
    return {
        type: RECEIVE_ENVIRONMENT_NAMES,
        value: data
    }
}