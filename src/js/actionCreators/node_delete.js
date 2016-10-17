import {
    SUBMIT_DELETE_NODE,
    CLOSE_SUBMIT_DELETE_NODE_STATUS
} from '../actionTypes'

export const deleteNode = (hostname) => (dispatch) =>  dispatch({type: SUBMIT_DELETE_NODE, url:`/api/nodes/${hostname}`})
export const closeSubmitDeleteNodeStatus = () => (dispatch) => dispatch({type: CLOSE_SUBMIT_DELETE_NODE_STATUS})
