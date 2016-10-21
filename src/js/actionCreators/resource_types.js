import {
    RESOURCE_TYPES_REQUEST
} from '../actionTypes'

export const fetchResourceTypes = () => (dispatch) => dispatch({type: RESOURCE_TYPES_REQUEST})
