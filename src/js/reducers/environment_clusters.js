import {
  CLEAR_ENVIRONMENT_CLUSTERS,
  ENVIRONMENT_CLUSTERS_FETCHING,
  ENVIRONMENT_CLUSTERS_RECEIVED,
  ENVIRONMENT_CLUSTERS_REQUEST_FAILED
} from "../actionTypes"

export default (
  state = {
    data: [],
    isFetching: false,
    requestFailed: false,
    showNewClusterForm: false,
    mode: "new"
  },
  action
) => {
  switch (action.type) {
    case CLEAR_ENVIRONMENT_CLUSTERS:
      return Object.assign({}, state, {
        data: [],
        isFetching: false,
        requestFailed: false
      })
    case ENVIRONMENT_CLUSTERS_FETCHING:
      return Object.assign({}, state, {
        data: [],
        isFetching: true,
        requestFailed: false
      })
    case ENVIRONMENT_CLUSTERS_RECEIVED:
      return Object.assign({}, state, {
        data: action.value,
        isFetching: false,
        requestFailed: false
      })
    case ENVIRONMENT_CLUSTERS_REQUEST_FAILED:
      return Object.assign({}, state, {
        requestFailed: action.error.message,
        data: [],
        isFetching: false
      })
    default:
      return state
  }
}
