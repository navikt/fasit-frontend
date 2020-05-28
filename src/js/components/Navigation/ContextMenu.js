import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styles } from "../../commonStyles/commonInlineStyles";

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
              <Link to="/search" style={styles.bold}>
                Search
              </Link>
            </li>
            <li className={this.isActive("environments")}>
              <Link to="/environments" style={styles.bold}>
                Environments
              </Link>
            </li>
            <li className={this.isActive("applications")}>
              <Link to="/applications" style={styles.bold}>
                Applications
              </Link>
            </li>
            <li className={this.isActive("instances")}>
              <Link to="/instances" style={styles.bold}>
                Instances
              </Link>
            </li>
            <li className={this.isActive("nodes")}>
              <Link to="/nodes" style={styles.bold}>
                Nodes
              </Link>
            </li>
            <li className={this.isActive("resources")}>
              <Link to="/resources" style={styles.bold}>
                Resources
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
