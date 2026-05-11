import {
  CLEAR_FORM_ERROR,
  REVISIONS_REQUEST,
  SET_NAVSEARCH_QUERY,
  SHOW_KEYBOARD_SHORTCUTS,
  SHOW_NEW_APPLICATION_FORM,
  SHOW_NEW_CLUSTER_FORM,
  SHOW_NEW_ENVIRONMENT_FORM,
  SHOW_NEW_NODE_FORM,
  SHOW_NEW_RESOURCE_FORM,
  SUBMIT_FORM,
  SUBMIT_NAV_SEARCH,
  SUBMIT_SEARCH,
  SET_FILTER_CONTEXT,
  UPDATE_CLUSTER_DRAFT
} from "../actionTypes"

export function submitForm(key, form, comment, component) {
  return { type: SUBMIT_FORM, key, form, comment, component }
}
export function clearFormError() {
  return { type: CLEAR_FORM_ERROR }
}
export function fetchRevisions(component, key) {
  return { type: REVISIONS_REQUEST, component, key }
}
export function displayModal(component, value, mode, existingData) {
  switch (component) {
    case "application":
      return { type: SHOW_NEW_APPLICATION_FORM, value, mode }
    case "cluster":
      return { type: SHOW_NEW_CLUSTER_FORM, value, mode, existingData }
    case "environment":
      return { type: SHOW_NEW_ENVIRONMENT_FORM, value, mode }
    case "node":
      return { type: SHOW_NEW_NODE_FORM, value, mode }
    case "resource":
      return { type: SHOW_NEW_RESOURCE_FORM, value, mode }
  }
}
export function submitNavSearch(query) {
  return { type: SUBMIT_NAV_SEARCH, query }
}

export function updateClusterDraft(field, value) {
  return { type: UPDATE_CLUSTER_DRAFT, field, value }
}

export function setSearchString(query) {
  return { type: SET_NAVSEARCH_QUERY, value: query }
}
export function submitSearch(query, typeFilter) {
  return { type: SUBMIT_SEARCH, query, typeFilter }
}
export function toggleHelp() {
  return { type: SHOW_KEYBOARD_SHORTCUTS }
}
