import React from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"

// Compatibility HOC for class components that need router props
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const match = { params }
    // Provide history-like object for backward compat with props.history.push
    const history = { push: navigate, replace: (to) => navigate(to, { replace: true }) }
    return <Component {...props} match={match} location={location} navigate={navigate} history={history} />
  }
  ComponentWithRouterProp.displayName = `withRouter(${Component.displayName || Component.name || "Component"})`
  return ComponentWithRouterProp
}

// Wrapper component that injects match/location props into children
export function WithParams({ children }) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const match = { params }
  return React.cloneElement(children, { match, location, navigate })
}
