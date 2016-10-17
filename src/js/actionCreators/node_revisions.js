import {
    NODE_REVISIONS_REQUEST,
    NODE_REVISION_REQUEST,
    SHOW_ALL_NODE_REVISIONS,
} from '../actionTypes'

export const fetchRevisions = (hostname) => {
        const url = `/api/v2/nodes/${hostname}/revisions`
        return (dispatch) => {
        dispatch({type: NODE_REVISIONS_REQUEST, url})
    }
}

export const fetchRevision = (revision) => {
    const url = `/api/v2/nodes/${revision}`
    return (dispatch) => dispatch({type: NODE_REVISION_REQUEST, url})
    }

export const showAllRevisions = (value) => (dispatch) => dispatch({type: SHOW_ALL_NODE_REVISIONS, value})