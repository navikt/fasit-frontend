import {
    SUBMIT_FORM,
    CLOSE_SUBMIT_FORM_STATUS
} from '../actionTypes'

export const closeSubmitFormStatus = () => {return {type: CLOSE_SUBMIT_FORM_STATUS}}
export const submitForm = (key, form, comment, component) =>  {return {type:SUBMIT_FORM, key, form, comment, component}}
//export const submitForm = (key, form, component) => (dispatch) => dispatch({type: SUBMIT_FORM, key, form, component})
