import {
    SUBMIT_FORM,
    CLOSE_SUBMIT_FORM_STATUS,
    SHOW_KEYBOARD_SHORTCUTS,
    SHOW_NEW_APPLICATION_FORM,
    SHOW_NEW_CLUSTER_FORM,
    SHOW_NEW_ENVIRONMENT_FORM,
    SHOW_NEW_NODE_FORM,
    SHOW_NEW_RESOURCE_FORM,
    REVISIONS_REQUEST,
    REVISION_REQUEST,
    SUBMIT_NAV_SEARCH
} from '../actionTypes'

export const closeSubmitFormStatus = () => {return {type: CLOSE_SUBMIT_FORM_STATUS}}
export const submitForm = (key, form, comment, component) =>  {return {type:SUBMIT_FORM, key, form, comment, component}}
export const fetchRevisions = (component, key) => {return {type: REVISIONS_REQUEST, component, key}}
export const fetchRevision = (component, key, revision) => {return {type: REVISION_REQUEST, component, key, revision}}
export const displayModal = (component, value) => {
    switch(component){
        case "shortcuts":
            return {type: SHOW_KEYBOARD_SHORTCUTS, value}
            break
        case "application":
            return {type: SHOW_NEW_APPLICATION_FORM, value}
            break
        case "cluster":
            return {type: SHOW_NEW_CLUSTER_FORM, value}
            break
        case "environment":
            return {type: SHOW_NEW_ENVIRONMENT_FORM, value}
            break
        case "node":
            return {type: SHOW_NEW_NODE_FORM, value}
            break
        case "resource":
            return {type: SHOW_NEW_RESOURCE_FORM, value}
            break
    }
}

export const submitNavSearch = (query) => {return {type: SUBMIT_NAV_SEARCH, query}}
