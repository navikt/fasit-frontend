import {
    NODE_TYPES_RECEIVED,
    NODES_LIST_FETCHING,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
    SHOW_SUBMIT_EDIT_NODE_FORM,
    SHOW_NEW_NODE_FORM,
    SHOW_DELETE_NODE_FORM,
    SHOW_EDIT_NODE_FORM,
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: [],
    nodeTypes: [],
    showSubmitEditNodeForm: false,
    showEditNodeForm: false,
    showNewNodeForm: false,
    showDeleteNodeForm: false,
}, action) => {
    switch (action.type) {

        case NODE_TYPES_RECEIVED:
            return Object.assign({}, state, {
                nodeTypes: action.value
            })

        case NODES_LIST_FETCHING:
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: [],
                showSubmitEditNodeForm: false,
                showEditNodeForm: false,
                showNewNodeForm: false,
                showDeleteNodeForm: false,
            })

        case NODES_LIST_RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value
            })


        case NODES_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case SHOW_SUBMIT_EDIT_NODE_FORM:
            return Object.assign({}, state, {
                showSubmitEditFasitNodeForm: action.value
            })

        case SHOW_DELETE_NODE_FORM:
            return Object.assign({}, state, {
                    showDeleteFasitNodeForm: action.value
                }
            )
        case SHOW_EDIT_NODE_FORM:
            return Object.assign({}, state, {
                    showEditNodeForm: action.value
                }
            )
        case SHOW_NEW_NODE_FORM:
            return Object.assign({}, state, {
                    showNewNodeForm: action.value
                }
            )


        default:
            return state
    }
}
