import {
    RECEIVE_NODE_SECRET,
    SHOW_SUBMIT_EDIT_NODE_FORM,
    SHOW_NEW_NODE_FORM,
    SHOW_DELETE_NODE_FORM,
    SHOW_EDIT_NODE_FORM

} from '../actionTypes'
export default (state = {
    showSubmitEditNodeForm: false,
    showEditNodeForm: false,
    showNewNodeForm: false,
    showDeleteNodeForm: false,
}, action) => {

    switch (action.type) {

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

        default:
            return state
    }
}
