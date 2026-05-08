import { useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import history from "../../history"
import { locationChange } from "../../reducers/router"
import { SET_FILTER_CONTEXT } from "../../actionTypes"

// Syncs external history.push/replace calls (from sagas, keyboard shortcuts)
// to React Router's internal navigation, and syncs router location to Redux
export default function NavigationSync() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigateRef = useRef(navigate)

  // Keep ref current without re-subscribing to history
  useEffect(() => {
    navigateRef.current = navigate
  })

  // Sync external history → React Router (subscribe once)
  useEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      const path = location.pathname + location.search + location.hash
      if (action === "PUSH") {
        navigateRef.current(path)
      } else if (action === "REPLACE") {
        navigateRef.current(path, { replace: true })
      }
    })
    return unlisten
  }, [])

  // Sync React Router location → Redux
  useEffect(() => {
    dispatch(locationChange(location, "PUSH"))
    dispatch({
      type: SET_FILTER_CONTEXT,
      value: location.pathname.replace(/^\//g, "").split("/")[0]
    })
  }, [location, dispatch])

  return null
}
