import {
  CLEAR_FORM_ERROR,
  CLEAR_FORM_STATUS,
  REVISIONS_REQUEST,
  SET_NAVSEARCH_QUERY,
  SHOW_NEW_APPLICATION_FORM,
  SHOW_NEW_CLUSTER_FORM,
  SHOW_NEW_ENVIRONMENT_FORM,
  SHOW_NEW_NODE_FORM,
  SHOW_NEW_RESOURCE_FORM,
  SUBMIT_FORM,
  DELETE_ELEMENT,
  SUBMIT_NAV_SEARCH,
  SUBMIT_SEARCH,
  UPDATE_CLUSTER_DRAFT,
} from "../actionTypes"

export const submitForm = (key, form, comment, component) => {
  return { type: SUBMIT_FORM, key, form, comment, component }
}

export const deleteElement = (id, elementType) => {
  return { type: DELETE_ELEMENT, id, elementType }
}

export const resetFormStatus = () => {
  return { type: CLEAR_FORM_STATUS }
}

export const clearFormError = () => {
  return { type: CLEAR_FORM_ERROR }
}
export const fetchRevisions = (component, key) => {
  return { type: REVISIONS_REQUEST, component, key }
}
export const displayModal = (component, value, mode, existingData) => {
  switch (component) {
    case "application":
      return { type: SHOW_NEW_APPLICATION_FORM, value, mode }
      break
    case "cluster":
      return { type: SHOW_NEW_CLUSTER_FORM, value, mode, existingData }
      break
    case "environment":
      return { type: SHOW_NEW_ENVIRONMENT_FORM, value, mode }
      break
    case "node":
      return { type: SHOW_NEW_NODE_FORM, value, mode }
      break
    case "resource":
      return { type: SHOW_NEW_RESOURCE_FORM, value, mode }
      break
  }
}
export const submitNavSearch = (query) => {
  return { type: SUBMIT_NAV_SEARCH, query }
}

export const updateClusterDraft = (field, value) => {
  return { type: UPDATE_CLUSTER_DRAFT, field, value }
}

export const setSearchString = (query) => {
  return { type: SET_NAVSEARCH_QUERY, value: query }
}
export const submitSearch = (query, typeFilter) => {
  return { type: SUBMIT_SEARCH, query, typeFilter }
}
