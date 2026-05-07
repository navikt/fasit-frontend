import React from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ContexMenu({ location }) {
  const isActive = (context) => {
    const currentLocation = location.pathname.split("/")[1]
    if (currentLocation === context) return "active"
  }

  return (
    <div className="context-menu">
      <div className="col-lg-11 offset-lg-1 col-md-11 offset-md-1 col-sm-12">
        <ul className="nav nav-tabs nav-tab-positioning">
          <li className={isActive("search")}>
            <Link to="/search">
              <FontAwesomeIcon icon="search" />&nbsp;&nbsp;Search
            </Link>
          </li>
          <li className={isActive("environments")}>
            <Link to="/environments">
              <FontAwesomeIcon icon="sitemap" />&nbsp;&nbsp;Environments
            </Link>
          </li>
          <li className={isActive("applications")}>
            <Link to="/applications">
              <FontAwesomeIcon icon="cube" />&nbsp;&nbsp;Applications
            </Link>
          </li>
          <li className={isActive("instances")}>
            <Link to="/instances">
              <FontAwesomeIcon icon="cubes" />&nbsp;&nbsp;Instances
            </Link>
          </li>
          <li className={isActive("nodes")}>
            <Link to="/nodes">
              <FontAwesomeIcon icon="server" />&nbsp;&nbsp;Nodes
            </Link>
          </li>
          <li className={isActive("resources")}>
            <Link to="/resources">
              <FontAwesomeIcon icon="cogs" />&nbsp;&nbsp;Resources
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
ContexMenu.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  location: state.router.location,
  nodes: state.nodes.headers,
  resources: state.resources.headers
})

export default connect(mapStateToProps)(ContexMenu)
