import {
    NODES_LIST_FETCHING,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
    RECEIVE_NODE_SECRET,
    SHOW_SUBMIT_EDIT_NODE_FORM,
    DELETED_CURRENT_NODE,
    SHOW_NEW_NODE_FORM,
    SHOW_DELETE_NODE_FORM,
    SHOW_EDIT_NODE_FORM,
} from '../actionTypes'

export default (state = {
    isFetching: false,
    requestFailed: false,
    data: []
}, action) => {
    switch (action.type) {

        case 'NODES_LIST_FETCHING':
            return Object.assign({}, state, {
                isFetching: true,
                requestFailed: false,
                data: [],
                showSubmitEditNodeForm: false,
                showEditNodeForm: false,
                showNewNodeForm: false,
                showDeleteNodeForm: false,
            })

        case 'NODES_LIST_RECEIVED':
            return Object.assign({}, state, {
                isFetching: false,
                data: action.value
            })


        case 'NODES_LIST_FAILED':
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case RECEIVE_NODE_SECRET:
            return Object.assign({}, state, {
                currentNodeSecret: action.value
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

        case DELETED_CURRENT_NODE:
            return Object.assign({}, state, {
                    deleted: action.value
                }
            )

        default:
            return state
    }
}
