import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import MuiPopover from "@mui/material/Popover"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Login, AuraTools, NavSearch } from "../common/"
import ContextMenu from "./ContextMenu"
import {
  logOut,
  getUser,
  displayLogin
} from "../../actionCreators/authentication"
import { toggleHelp, displayModal } from "../../actionCreators/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  colors
} from "../../commonStyles/commonInlineStyles"

function TopNav({ dispatch, user, location }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeOverlay, setActiveOverlay] = useState(null)

  useEffect(() => {
    dispatch(getUser())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const openOverlay = (name, e) => {
    setAnchorEl(e.currentTarget)
    setActiveOverlay(name)
  }

  const closeOverlay = () => {
    setAnchorEl(null)
    setActiveOverlay(null)
  }

  const loginContent = () => {
    return (
      <div>
        <h5>Roles</h5>
        <ul className="topnav-menu">
          {user.roles.map((role, idx) => (
            <li key={idx}>{role.split("ROLE_")[1].toLowerCase()}</li>
          ))}
        </ul>
        <hr />
        <button
          style={{ outline: "none" }}
          type="button"
          className="btn btn-info btn-sm"
          onClick={() => dispatch(logOut())}
        >
          Log out
        </button>
      </div>
    )
  }

  const toolsContent = () => {
    return (
      <ul className="topnav-menu topnav-menu-selector">
        <li onClick={() => { dispatch(displayModal("resource", true)); closeOverlay() }}>
          <FontAwesomeIcon icon="cogs" fixedWidth /> &nbsp;&nbsp; Create
          resource
        </li>
        <li onClick={() => { dispatch(displayModal("application", true)); closeOverlay() }}>
          <FontAwesomeIcon icon="cube" fixedWidth /> &nbsp;&nbsp; Create
          application
        </li>
        <li onClick={() => { dispatch(displayModal("environment", true)); closeOverlay() }}>
          <FontAwesomeIcon icon="sitemap" fixedWidth /> &nbsp;&nbsp; Create
          environment
        </li>
        <li onClick={() => { dispatch(displayModal("node", true)); closeOverlay() }}>
          <FontAwesomeIcon icon="server" fixedWidth /> &nbsp;&nbsp;Create node
        </li>
        <li onClick={() => { dispatch(displayModal("cluster", true)); closeOverlay() }}>
          <FontAwesomeIcon icon="braille" fixedWidth />&nbsp;&nbsp; Create
          cluster
        </li>
      </ul>
    )
  }

  const showLogin = (root) => {
    return (
      <ul className="nav d-flex flex-row ms-auto" style={{listStyle: 'none'}}>
        {/* Nytt element*/}
        {user.authenticated ? (
          <li>
            <button
              type="button"
              onClick={(e) => openOverlay("tools", e)}
              className={
                root
                  ? "btn btn-sm  btn-link topnav-buttons-inverse"
                  : "btn btn-sm  btn-link topnav-buttons"
              }
              style={{ marginTop: 15, marginRight: 5, marginBottom: 8 }}
            >
              <AddCircleIcon style={{ color: colors.pink }} />
              New
            </button>
            <MuiPopover
              open={activeOverlay === "tools"}
              anchorEl={anchorEl}
              onClose={() => closeOverlay()}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <div style={{ padding: 16 }}>
                {toolsContent()}
              </div>
            </MuiPopover>
          </li>
        ) : null}

        {/* Logg inn eller brukermeny*/}
        {!user.authenticated ? (
          <li>
            <button
              type="button"
              className={
                root
                  ? "btn btn-sm  btn-link topnav-buttons-inverse"
                  : "btn btn-sm  btn-link topnav-buttons"
              }
              onClick={() => dispatch(displayLogin(true))}
              style={{ marginTop: 15, marginRight: 5, marginBottom: 8 }}
            >
              <AccountCircleIcon style={{ color: colors.pink }} />
              Log in
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              onClick={(e) => openOverlay("login", e)}
              className={
                root
                  ? "btn btn-sm  btn-link topnav-buttons-inverse"
                  : "btn btn-sm  btn-link topnav-buttons"
              }
              style={{ marginTop: 15, marginBottom: 8 }}
            >
              <AccountCircleIcon style={{ color: colors.pink }} />
              {user.displayname}
            </button>
            <MuiPopover
              open={activeOverlay === "login"}
              anchorEl={anchorEl}
              onClose={() => closeOverlay()}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <div style={{ padding: 16 }}>
                {loginContent()}
              </div>
            </MuiPopover>
          </li>
        )}

        {/* Aurabot */}
        <li>
          <img
            src="/images/aura-ikoner/aurabot.png"
            style={{
              width: 30,
              marginTop: 11,
              marginRight: 30,
              marginLeft: 12,
              cursor: "pointer"
            }}
            className="topnavIcon"
            onClick={(e) => openOverlay("aura", e)}
          />
          <MuiPopover
            open={activeOverlay === "aura"}
            anchorEl={anchorEl}
            onClose={() => closeOverlay()}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <div style={{ padding: 16 }}>
              <AuraTools />
            </div>
          </MuiPopover>
        </li>

        {/* Shortcuts */}
        <li>
          <button
            type="button"
            className={
              root
                ? "btn btn-sm  btn-link topnav-buttons-inverse"
                : "btn btn-sm  btn-link topnav-buttons"
            }
            onClick={() => dispatch(toggleHelp())}
            style={{ marginTop: 8 }}
          >
            <KeyboardIcon fontSize="medium" />
          </button>
        </li>
      </ul>
    )
  }

  return location.pathname !== "/" ? (
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

        <div className="col-7 col-sm-6 col-md-6">
          <NavSearch />
        </div>
        {showLogin()}
        <Login />
      </div>
      <ContextMenu />
    </div>
  ) : (
    <div className="topnav">
      {showLogin("root")}
      <Login />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.router.location
  }
}

export default connect(mapStateToProps)(TopNav)
