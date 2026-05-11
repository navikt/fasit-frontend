const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
  location: typeof window !== "undefined"
    ? { pathname: window.location.pathname, search: window.location.search, hash: window.location.hash }
    : { pathname: "/", search: "", hash: "" },
  action: 'POP'
}

export function locationChange(location, action) {
  return { type: LOCATION_CHANGE, payload: { location, action } }
}

export default function router(state = initialState, action) {
  if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      location: action.payload.location,
      action: action.payload.action
    }
  }
  return state
}
