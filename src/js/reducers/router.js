import history from '../history'

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
  location: history.location,
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
