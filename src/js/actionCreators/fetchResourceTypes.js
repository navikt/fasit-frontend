import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/resources/types'

import {
    RECEIVE_RESOURCE_TYPES
} from '../actionTypes'

export const fetchResourceTypes = () => {
    return (dispatch) => {
        return fetch(API_ROOT)
            .then(response => response.json())
            .then(json => reduceToArrayOfNames(json))
            .then(resourceTypes => dispatch(receiveResourceTypes(resourceTypes)))
    }
}
const reduceToArrayOfNames = (resourceTypes) => {
    return resourceTypes.map(resourceType => {
        return resourceType.type
    })

}

const receiveResourceTypes = (data) => {
    return {
        type: RECEIVE_RESOURCE_TYPES,
        value: data
    }
}