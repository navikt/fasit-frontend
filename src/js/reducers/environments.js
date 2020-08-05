import {
  ENVIRONMENTS_LIST_FAILED,
  ENVIRONMENTS_LIST_FETCHING,
  ENVIRONMENTS_LIST_RECEIVED,
  ENVIRONMENTS_RECEIVED,
} from "../actionTypes"
import { sortEnvironmentsNaturally } from "../utils"

export const initialState = {
  isFetching: false,
  requestFailed: false,
  data: [],
  zones: ["fss", "sbs"],
  environmentClasses: ["u", "t", "q", "p"],
  headers: {},
  environments: [],
  mode: "new",
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ENVIRONMENTS_RECEIVED:
      return Object.assign({}, state, {
        environments: action.value.sort(sortEnvironmentsNaturally),
      })
    case ENVIRONMENTS_LIST_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        requestFailed: false,
        data: [],
      })
    case ENVIRONMENTS_LIST_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.page.data.sort(sortEnvironmentsNaturally),
        headers: action.page.headers,
      })
    case ENVIRONMENTS_LIST_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        requestFailed: action.value,
      })

    default:
      return state
  }
}
