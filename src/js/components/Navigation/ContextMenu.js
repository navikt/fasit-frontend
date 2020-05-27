import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ContexMenu extends Component {
  constructor(props) {
    super(props);
  }

  isActive(context) {
    const location = this.props.location.pathname;
    const currentLocation = location.split("/")[1];

    if (currentLocation === context) {
      return "active";
    }
  }

  render() {
    return (
      <div className="context-menu">
        <div>
          <ul className="nav nav-tabs nav-tab-positioning">
            <li className={this.isActive("search")}>
              <Link to="/search">
                <FontAwesomeIcon icon="search" />
                &nbsp;&nbsp;Search
              </Link>
            </li>
            <li className={this.isActive("environments")}>
              <Link to="/environments">
                <FontAwesomeIcon icon="sitemap" />
                &nbsp;&nbsp;Environments
              </Link>
            </li>
            <li className={this.isActive("applications")}>
              <Link to="/applications">
                <FontAwesomeIcon icon="cube" />
                &nbsp;&nbsp;Applications
              </Link>
            </li>
            <li className={this.isActive("instances")}>
              <Link to="/instances">
                <FontAwesomeIcon icon="cubes" />
                &nbsp;&nbsp;Instances
              </Link>
            </li>
            <li className={this.isActive("nodes")}>
              <Link to="/nodes">
                <FontAwesomeIcon icon="server" />
                &nbsp;&nbsp;Nodes
              </Link>
            </li>
            <li className={this.isActive("resources")}>
              <Link to="/resources">
                <FontAwesomeIcon icon="cogs" />
                &nbsp;&nbsp;Resources
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
ContexMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  nodes: state.nodes.headers,
  resources: state.resources.headers,
});

export default connect(mapStateToProps)(ContexMenu);
