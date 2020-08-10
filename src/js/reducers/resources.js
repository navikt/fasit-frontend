import {
  RESOURCE_TYPES_RECEIVED,
  RESOURCES_LIST_FETCHING,
  RESOURCES_LIST_RECEIVED,
  RESOURCES_LIST_FAILED,
} from "../actionTypes"

export const initialState = {
  isFetching: true,
  requestFailed: false,
  data: [],
  headers: {},
  resourceTypes: [],
  showNewResourceForm: false,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case RESOURCE_TYPES_RECEIVED:
      return Object.assign({}, state, {
        resourceTypes: action.value,
      })

    case RESOURCES_LIST_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        requestFailed: false,
        data: [],
      })

    case RESOURCES_LIST_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.page.data,
        headers: action.page.headers,
      })

    case RESOURCES_LIST_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        requestFailed: action.value,
      })

    default:
      return state
  }
}
