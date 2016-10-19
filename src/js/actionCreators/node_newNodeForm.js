import {
    CLEAR_NEW_NODE_FORM,
    CLOSE_SUBMIT_NEW_NODE_FORM_STATUS,
    SET_NEW_NODE_FORM_HOSTNAME,
    SET_NEW_NODE_FORM_ENVIRONMENTCLASS,
    SET_NEW_NODE_FORM_ENVIRONMENT,
    SET_NEW_NODE_FORM_ZONE,
    SET_NEW_NODE_FORM_TYPE,
    SET_NEW_NODE_FORM_USERNAME,
    SET_NEW_NODE_FORM_PASSWORD,
    SUBMIT_NEW_NODE_FORM,
} from '../actionTypes'

export const clearNewNodeForm = () => (dispatch) => dispatch({type: CLEAR_NEW_NODE_FORM})
export const closeSubmitNewNodeFormStatus = () => (dispatch) => dispatch({type: CLOSE_SUBMIT_NEW_NODE_FORM_STATUS})
export const submitNewNodeForm = (value) => (dispatch) => dispatch({type: SUBMIT_NEW_NODE_FORM, value})

// export const submitNewNodeForm = (form) => {
//     return (dispatch) => {
//         return fetch(`/api/nodes/`, {
//             headers: {"Content-Type": "application/json"},
//             credentials: 'same-origin',
//             method: 'POST',
//             body: JSON.stringify(form)
//         })
//             .then(response => handleSubmitErrors(response))
//             .then(() => dispatch(clearFasitNodeNewForm()))
//             .then(() => dispatch(openFasitNodeNewForm(false)))
//             .catch(error => console.log(error))
//     }
// }

export const setNewNodeFormValue = (type, value) => {
    switch(type) {
        case "hostname":
            return {
                type: SET_NEW_NODE_FORM_HOSTNAME,
                value
            }
        case "environmentclass":
            return {
                type: SET_NEW_NODE_FORM_ENVIRONMENTCLASS,
                value
            }
        case "environment":
            return {
                type: SET_NEW_NODE_FORM_ENVIRONMENT,
                value
            }
        case "zone":
            return {
                type: SET_NEW_NODE_FORM_ZONE,
                value
            }
        case "type":
            return {
                type: SET_NEW_NODE_FORM_TYPE,
                value
            }
        case "username":
            return {
                type: SET_NEW_NODE_FORM_USERNAME,
                value
            }
        case "password":
            return {
                type: SET_NEW_NODE_FORM_PASSWORD,
                value
            }
    }
}
