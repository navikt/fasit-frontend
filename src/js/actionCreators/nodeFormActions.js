
import {
    SHOW_NEW_NODE_FORM,
    SHOW_DELETE_NODE_FORM,
    SHOW_EDIT_NODE_FORM,
    SHOW_SUBMIT_EDIT_NODE_FORM,

} from '../actionTypes'

export const showNewNodeForm = (value) => (dispatch) => dispatch({type: SHOW_NEW_NODE_FORM, value})
export const showDeleteNodeForm = (value) => (dispatch) => dispatch({type: SHOW_DELETE_NODE_FORM, value})
export const showEditNodeForm = (value) => (dispatch) => dispatch({type: SHOW_EDIT_NODE_FORM, value: value})
export const showSubmitEditNodeForm = (value) => (dispatch) => dispatch({type: SHOW_SUBMIT_EDIT_NODE_FORM, value: value})


