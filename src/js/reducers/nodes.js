import {
    NODE_TYPES_RECEIVED,
    NODES_LIST_FETCHING,
    NODES_LIST_RECEIVED,
    NODES_LIST_FAILED,
    SHOW_NEW_NODE_FORM,
} from '../actionTypes'

export const initialState = {
    isFetching: true,
    requestFailed: false,
    data: [],
    headers: {},
    nodeTypes: [],
    showSubmitEditNodeForm: false,
    showEditNodeForm: false,
    showNewNodeForm: false,
    showDeleteNodeForm: false,
    mode: "new",
}
export default (state = initialState, action) => {
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
                data: action.page.data,
                headers: action.page.headers
            })


        case NODES_LIST_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                requestFailed: action.value
            })

        case SHOW_NEW_NODE_FORM:
            if (action.copy) {
                return Object.assign({}, state, {
                        showNewNodeForm: action.value,
                        copy: action.copy,
                    }
                )
            }
            return Object.assign({}, state, {
                    showNewNodeForm: action.value,
                    mode: action.mode || 'new',
                }
            )


        default:
            return state
    }
}
