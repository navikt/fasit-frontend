import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/applicationinstances/'

import {
    SET_ACTIVE_INSTANCE,
    REQUEST_INSTANCES_LIST,
    RECEIVE_INSTANCES_LIST
} from '../actionTypes'

export const fetchInstancesList = (filters) => {
    return (dispatch) => {
        dispatch(requestInstancesList())
        return fetch(API_ROOT + buildFilterString(filters))
            .then(response => response.json())
            .then(json => dispatch(receiveFasitData(json)))
    }
}

export const setActiveInstance = (index) => {
    return {
        type: SET_ACTIVE_INSTANCE,
        value: index
    }
}
const buildFilterString = (filters) => {
    let filterString = '?'
    let filterTypes = ["environment", "environmentclass", "application"]
    for (let filter in filters) {
        if (filterTypes.indexOf(filter) !== -1) {
            if (filters[filter])
                filterString += filter + "=" + filters[filter] + "&"
        }
    }
    return filterString
}
const requestInstancesList = () => {
    return {
        type: REQUEST_INSTANCES_LIST,
    }
}
const receiveFasitData = (data) => {
    return {
        type: RECEIVE_INSTANCES_LIST,
        value: data
    }
}