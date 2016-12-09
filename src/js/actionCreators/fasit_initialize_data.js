import {
    ENVIRONMENTS_REQUEST,
    APPLICATION_NAMES_REQUEST,
    RESOURCE_TYPES_REQUEST,
    NODE_TYPES_REQUEST
} from '../actionTypes'


export const fetchResourceTypes = () => (dispatch) => dispatch({type: RESOURCE_TYPES_REQUEST})
export const fetchEnvironments = () => (dispatch) => dispatch({type: ENVIRONMENTS_REQUEST})
export const fetchApplicationNames = () => (dispatch) => dispatch({type: APPLICATION_NAMES_REQUEST})
export const fetchNodeTypes = () => (dispatch) => dispatch({type: NODE_TYPES_REQUEST})
