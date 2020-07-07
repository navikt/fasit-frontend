import React, { Component } from "react"
import { Link } from "react-router-dom"
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import { connect } from "react-redux"
import { Login, NavSearch } from "../common/"
import ContextMenu from "./ContextMenu"
import {
  logOut,
  getUser,
  displayLogin,
} from "../../actionCreators/authentication"
import { displayModal } from "../../actionCreators/common"

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
        {user.authenticated ? (
          <li>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              id="toolsOverlay"
              overlay={this.toolsOverlay()}
            >
              <button
                variant="success"
                type="button"
                className="btn btn-sm  btn-link topnav-buttons"
                style={{ marginTop: 19, marginRight: 5 }}
              >
                New
              </button>
            </OverlayTrigger>
          </li>
        ) : null}

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
              <button
                type="button"
                className={"btn btn-sm  btn-link topnav-buttons"}
                onClick={() => dispatch(logOut())}
                style={{ marginTop: 19, marginRight: 5 }}
              >
                Log out
              </button>
            </li>
            <li>
              <div className="username">{user.displayname}</div>
            </li>
          </React.Fragment>
        )}
      </ul>
    )
  }

  toolsOverlay() {
    const { dispatch } = this.props
    return (
      <Popover id="tools" style={{ opacity: 1 }}>
        <Popover.Content>
          <ul className="topnav-menu topnav-menu-selector">
            <li onClick={() => dispatch(displayModal("resource", true))}>
              Create resource
            </li>
            <li onClick={() => dispatch(displayModal("application", true))}>
              Create application
            </li>
          </ul>
        </Popover.Content>
      </Popover>
    )
  }

  render() {
    const { location } = this.props
    return (
      <div>
        <div className="topnav topnav-active">
          <div className="col-sm-1 col-md-2 hidden-xs">
            <div className="topnav-brand-logo-container">
              <Link to="/">
                <img
                  src="/images/aura-ikoner/fasit-white.png"
                  className="topnav-brand-logo"
                />
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
