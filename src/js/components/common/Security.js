import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { validAuthorization } from "../../utils/"
import { CollapsibleList } from "../common/"
import { icons } from "../../commonStyles/commonInlineStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Security extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CollapsibleList
        primaryText="Security"
        initiallyOpen={false}
        leftAvatar={icons.securityAvatar}
        nestedItems={<SecurityView key="1" {...this.props} />}
      />
    )
  }
}

function SecurityView(props) {
  const { accesscontrol, user } = props
  const authorized = validAuthorization(user, accesscontrol)
  return typeof accesscontrol !== "undefined" ? (
    <div className="collapsible-menu-content-container">
      {authorized ? (
        <h3 style={{ marginTop: 1 + "px" }}>
          <small>
            <FontAwesomeIcon icon="unlock" className="text-success" fixedWidth />

            {"You've got access"}
          </small>
        </h3>
      ) : (
        <h3 style={{ marginTop: 1 + "px" }}>
          <small>
            <FontAwesomeIcon icon="lock" className="text-danger" fixedWidth />
            {"You're not authorized"}
          </small>
        </h3>
      )}
      <pre style={{ marginTop: 15 + "px", width: 80 + "%" }}>
        <b>Requirements</b>
        <ul>
          <li>
            Environment class: <b>{accesscontrol.environmentclass}</b>
          </li>
          {accesscontrol.adgroups.length > 0
            ? accesscontrol.adgroups.map((g, i) => (
                <li key={i}>
                  AD-group: <b>{g}</b>
                </li>
              ))
            : null}
        </ul>
      </pre>
    </div>
  ) : null
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

Security.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Security)
