import React, { Component } from "react"
import { Link } from "react-router-dom"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { connect } from "react-redux"
import { Login, NavSearch } from "../common/"
import ContextMenu from "./ContextMenu"
import {
  logOut,
  getUser,
  displayLogin,
} from "../../actionCreators/authentication"

class TopNav extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getUser())
  }

  showLogin() {
    const { user, dispatch } = this.props
    return (
      <ul className="nav  navbar-right">
        {/* Nytt element*/}
        {user.authenticated ? this.toolsOverlay() : null}

        {/* Logg inn eller brukermeny*/}
        {!user.authenticated ? (
          <li>
            <button
              type="button"
              className={"btn btn-sm  btn-link topnav-buttons"}
              onClick={() => dispatch(displayLogin(true))}
              style={{ marginTop: 19, marginRight: 5 }}
            >
              Log in
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <div className="username">{user.displayname}</div>
            </li>
            <li>
              <button
                type="button"
                className={"btn btn-sm  btn-link topnav-buttons"}
                onClick={() => dispatch(logOut())}
                style={{ marginTop: 19, marginRight: 5 }}
              >
                Log out
              </button>
            </li>
          </React.Fragment>
        )}
      </ul>
    )
  }

  toolsOverlay() {
    return (
      <li>
        <DropdownButton
          id="dropdown-basic-button"
          title="New... "
          style={{ marginTop: 19, marginRight: 5 }}
        >
          <Dropdown.Item href="/new/application">Application</Dropdown.Item>
          <Dropdown.Item href="/new/resource">Resource</Dropdown.Item>
        </DropdownButton>
      </li>
    )
  }

  render() {
    const { location } = this.props
    return (
      <div>
        <div className="topnav topnav-active">
          <div className="col-sm-1 col-md-2 hidden-xs">
            <div className="topnav-brand-logo-container">
              <Link to="/" className="topnav-brand-logo">
                Fasit
              </Link>
            </div>
          </div>

          <div className="col-xs-7 col-sm-6 col-md-6">
            <NavSearch location={location} />
          </div>
          {this.showLogin()}
          <Login />
        </div>
        <ContextMenu location={location} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(TopNav)
