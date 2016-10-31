import {
    CLEAR_EDIT_NODE_FORM,
    CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS,
    SET_EDIT_NODE_FORM_VALUES,
    SET_EDIT_NODE_FORM_HOSTNAME,
    SET_EDIT_NODE_FORM_TYPE,
    SET_EDIT_NODE_FORM_USERNAME,
    SET_EDIT_NODE_FORM_PASSWORD,
    SUBMIT_EDIT_NODE_FORM,

} from '../actionTypes'

export const clearEditNodeForm = () => (dispatch) => dispatch({type: CLEAR_EDIT_NODE_FORM})
export const closeSubmitEditNodeFormStatus = () => (dispatch) => dispatch({type: CLOSE_SUBMIT_EDIT_NODE_FORM_STATUS})
export const submitEditNodeForm = (hostname, value) => (dispatch) => dispatch({type: SUBMIT_EDIT_NODE_FORM, value, hostname})

export const setEditNodeFormValues = (type, value) => {
    switch (type) {
        case "hostname":
            return {
                type: SET_EDIT_NODE_FORM_HOSTNAME,
                value
            }
        case "type":
            return {
                type: SET_EDIT_NODE_FORM_TYPE,
                value
            }
        case "username":
            return {
                type: SET_EDIT_NODE_FORM_USERNAME,
                value
            }
        case "password":
            return {
                type: SET_EDIT_NODE_FORM_PASSWORD,
                value
            }
        case "all":
            return {
                type: SET_EDIT_NODE_FORM_VALUES,
            }
    }
}