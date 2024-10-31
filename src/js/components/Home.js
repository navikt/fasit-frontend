import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import { NavSearch } from "./common/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="col-md-6 col-md-offset-2 col-sm-8 col-sm-offset-2 hidden-xs text-center">
          <div className="home-brand-logo-container">
            <img
              src="images/aura-ikoner/fasit.png"
              className="home-brand-logo"
            />
          </div>
        </div>
        <div className="col-md-6 col-md-offset-2 col-sm-8 col-sm-offset-2">
          <NavSearch />
          <br />
        </div>
        <div className="col-md-9 col-md-offset-2 col-sm-8 col-sm-offset-2">
          <ul className="nav nav-pills search-entity-types">
            <li className="">
              <Link to="/environments">
                <FontAwesomeIcon icon="sitemap" />&nbsp;&nbsp;Environments&nbsp;&nbsp;
              </Link>
            </li>
            <li>
              <Link to="/applications">
                <FontAwesomeIcon icon="cube" />&nbsp;&nbsp;Applications
              </Link>
            </li>
            <li>
              <Link to="/instances">
                <FontAwesomeIcon icon="cubes" />&nbsp;&nbsp;Instances
              </Link>
            </li>
            <li>
              <Link to="/nodes">
                <FontAwesomeIcon icon="server" />&nbsp;&nbsp;Nodes
              </Link>
            </li>
            <li>
              <Link to="/resources">
                <FontAwesomeIcon icon="cogs" />&nbsp;&nbsp;Resources
              </Link>
            </li>
          </ul>
          <br />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.routing.locationBeforeTransitions,
    searchString: state.navsearch.query
  }
}

export default connect(mapStateToProps)(Home)
