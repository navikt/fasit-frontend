import {
  RESOURCE_FASIT_RECEIVED,
  RESOURCE_FASIT_FETCHING,
  RESOURCE_FASIT_REQUEST_FAILED,
  RESOURCE_FASIT_SECRET_RECEIVED,
} from "../actionTypes"

export default (
  state = {
    data: {},
    isFetching: false,
    requestFailed: false,
    currentSecrets: {},
  },
  action
) => {
  switch (action.type) {
    case RESOURCE_FASIT_RECEIVED:
      return Object.assign({}, state, {
        data: action.value,
        isFetching: false,
        requestFailed: false,
      })

    case RESOURCE_FASIT_FETCHING:
      return Object.assign({}, state, {
        data: {},
        isFetching: true,
        requestFailed: false,
      })

    case RESOURCE_FASIT_SECRET_RECEIVED:
      return Object.assign({}, state, {
        currentSecrets: action.secrets,
      })

    case RESOURCE_FASIT_REQUEST_FAILED:
      return Object.assign({}, state, {
        requestFailed: action.error.message,
        data: {},
        isFetching: false,
      })
    default:
      return state
  }
}
