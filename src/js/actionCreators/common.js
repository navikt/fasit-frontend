import {
    SUBMIT_FORM,
    CLOSE_SUBMIT_FORM_STATUS,
    SET_ACTIVE_REVISION,
    REVISIONS_REQUEST,
    REVISION_REQUEST
} from '../actionTypes'

export const closeSubmitFormStatus = () => {return {type: CLOSE_SUBMIT_FORM_STATUS}}
export const submitForm = (key, form, comment, component) =>  {return {type:SUBMIT_FORM, key, form, comment, component}}
export const fetchRevisions = (hostname) => {return {type: REVISIONS_REQUEST, hostname}}
export const fetchRevision = (component, key, revision) => {return {type: REVISION_REQUEST, component, key, revision}}
