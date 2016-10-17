import {
    NODE_REVISIONS_FETCHING,
    NODE_REVISIONS_RECEIVED,
    NODE_REVISIONS_REQUEST_FAILED,
    NODE_REVISION_FETCHING,
    NODE_REVISION_RECEIVED,
    NODE_REVISION_REQUEST_FAILED,
    SHOW_ALL_NODE_REVISIONS
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: [],
    showAllRevisions: false
}, action) => {
    switch (action.type) {
        case NODE_REVISIONS_RECEIVED:
            return Object.assign({}, state, {
                data: action.value,
                isFetching: false,
                requestFailed: false
            })

        case NODE_REVISIONS_FETCHING:
            return Object.assign({}, state, {
                data: [],
                isFetching: true,
                requestFailed: false
            })

        case NODE_REVISIONS_REQUEST_FAILED:
            return Object.assign({}, state, {
                requestFailed: action.error.message,
                data: [],
                isFetching:false
            })

        case NODE_REVISION_RECEIVED:
            return Object.assign({}, state, {
                activeRevisionData: action.value,
                activeRevisionIsFetching: false,
                activeRevisionRequestFailed: false
            })

        case NODE_REVISION_FETCHING:
            return Object.assign({}, state, {
                activeRevisionData: {},
                activeRevisionIsFetching: true,
                revisionRequestFailed: false
            })

        case NODE_REVISION_REQUEST_FAILED:
            return Object.assign({}, state, {
                activeRevisionRequestFailed: action.error.message,
                activeRevisionData: {},
                activeRevisionIsFetching:false
            })

        case SHOW_ALL_NODE_REVISIONS:
            return Object.assign({}, state,
                {showAllRevisions: action.value}
            )

        default:
            return state
    }
}