import {
    NODE_TYPES_REQUEST
} from '../actionTypes'

export const fetchNodeTypes = () => (dispatch) => dispatch({type: NODE_TYPES_REQUEST})
