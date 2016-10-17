import fetch from 'isomorphic-fetch'
const API_ROOT = '/api/v2/nodes/types'

import {
    RECEIVE_NODE_TYPES
} from '../actionTypes'

export const fetchNodeTypes = () => {
    return (dispatch) => {
        return fetch(API_ROOT)
            .then(response => response.json())
            .then(json => dispatch(receiveNodeTypes(json)))
    }
}

const receiveNodeTypes = (data) => {
    return {
        type: RECEIVE_NODE_TYPES,
        value: data
    }
}