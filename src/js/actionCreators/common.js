import {
    SUBMIT_FORM,
    SET_NAVSEARCH_QUERY,
    CLOSE_SUBMIT_FORM_STATUS,
    SHOW_KEYBOARD_SHORTCUTS,
    SHOW_NEW_APPLICATION_FORM,
    SHOW_NEW_CLUSTER_FORM,
    SHOW_NEW_ENVIRONMENT_FORM,
    SHOW_NEW_NODE_FORM,
    SHOW_NEW_RESOURCE_FORM,
    REVISIONS_REQUEST,
    SUBMIT_NAV_SEARCH,
    SUBMIT_SEARCH

} from '../actionTypes'

export const closeSubmitFormStatus = () => {return {type: CLOSE_SUBMIT_FORM_STATUS}}
export const submitForm = (key, form, comment, component) =>  {return {type:SUBMIT_FORM, key, form, comment, component}}
export const fetchRevisions = (component, key) => {return {type: REVISIONS_REQUEST, component, key}}
export const displayModal = (component, value, copy) => {
    switch(component){
        case "application":
            return {type: SHOW_NEW_APPLICATION_FORM, value, copy}
            break
        case "cluster":
            return {type: SHOW_NEW_CLUSTER_FORM, value, copy}
            break
        case "environment":
            return {type: SHOW_NEW_ENVIRONMENT_FORM, value, copy}
            break
        case "node":
            return {type: SHOW_NEW_NODE_FORM, value, copy}
            break
        case "resource":
            return {type: SHOW_NEW_RESOURCE_FORM, value, copy}
            break
    }
}
export const submitNavSearch = (query) => {return {type: SUBMIT_NAV_SEARCH, query}}
export const setSearchString = (query) => {return {type: SET_NAVSEARCH_QUERY , value: query}}
export const submitSearch = (query, typeFilter) => {return {type: SUBMIT_SEARCH, query, typeFilter}}
export const toggleHelp = () => {return {type: SHOW_KEYBOARD_SHORTCUTS}}
