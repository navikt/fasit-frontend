import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Login, AuraTools} from '../common/'
import ContextMenu from './ContextMenu'
import {logOut, getUser, displayLogin} from '../../actionCreators/authentication'
import {showNewComponentForm} from '../../actionCreators/common'
import {submitSearchString} from '../../actionCreators/element_lists'


class TopNav extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(getUser())
    }


    showLogin() {
        const {user, dispatch} = this.props
        return (
            <ul className="nav navbar-nav navbar-right">
                {user.authenticated ? (
                        <li>
                            <OverlayTrigger
                                trigger="click"
                                rootClose={true}
                                placement="bottom"
                                id="toolsOverlay"
                                overlay={this.toolsOverlay()}
                            >
                                <button type="button" className="btn  btn-link topnav-button tools-topnav-button topnavIcon"><i
                                    className="fa fa-wrench fa-2x"/>
                                </button>
                            </OverlayTrigger>
                        </li>
                    ) : null
                }
                {!user.authenticated ? (
                        <li>
                            <button
                                type="button"
                                className="btn btn-sm topnav-button btn-link topnav-login-button"
                                onClick={() => dispatch(displayLogin(true))}
                            >
                                <i className="fa fa-unlock-alt"/>&nbsp;Log in
                            </button>
                        </li>
                    ) : (
                        <li>
                            <OverlayTrigger
                                trigger="click"
                                id="loginINformationOverlay"
                                rootClose={true}
                                placement="bottom"
                                overlay={this.loginInformationOverlay()}
                            >
                                <button type="button" className="btn  btn-link topnav-button topnavIcon">
                            <span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"/><i
                                className="fa fa-user fa-stack-1x fa-inverse"/></span>
                                </button>
                            </OverlayTrigger>
                        </li>
                    )}
                <li>
                    <OverlayTrigger
                        trigger="click"
                        rootClose={true}
                        placement="bottom"
                        overlay={AuraTools()}
                    >
                        <img
                            src="/images/aura-ikoner/aurabot.png"
                            style={{width:30, marginTop:10, marginRight:20, marginLeft:10, cursor:"pointer"}}
                            className="topnavIcon"/>

                    </OverlayTrigger>
                </li>
            </ul>
        )
    }

    loginInformationOverlay() {
        const {dispatch, user} = this.props
        return (
            <Popover title={user.displayname} id="login">
                <h5>Roles</h5>
                <ul className="topnav-menu">
                    {user.roles.map((role, idx) => <li key={idx}>{role.split("ROLE_")[1].toLowerCase()}</li>)}
                </ul>
                <hr />
                <button
                    style={{outline: "none"}}
                    type="button"
                    className="btn btn-info btn-sm"
                    onClick={() => dispatch(logOut())}
                >Log out
                </button>

            </Popover>
        )
    }

    toolsOverlay() {
        const {dispatch} = this.props
        return (
            <Popover id="tools">
                <ul className="topnav-menu topnav-menu-selector">
                    <li onClick={() => dispatch(showNewComponentForm("node", true))}><i
                        className="fa fa-server"/> &nbsp;&nbsp;Create node
                    </li>
                    <li onClick={() => dispatch(showNewComponentForm("cluster", true))}><i
                        className="fa fa-braille"/> &nbsp;&nbsp; Create cluster
                    </li>
                    <li onClick={() => dispatch(showNewComponentForm("application", true))}><i
                        className="fa fa-cube"/> &nbsp;&nbsp; Create application
                    </li>
                    <li onClick={() => dispatch(showNewComponentForm("environment", true))}><i
                        className="fa fa-sitemap"/> &nbsp;&nbsp; Create environment
                    </li>
                    <li onClick={() => dispatch(showNewComponentForm("resource", true))}><i
                        className="fa fa-cogs"/> &nbsp;&nbsp; Create resource
                    </li>
                </ul>
            </Popover>
        )
    }

    render() {
        const {location, search, dispatch} = this.props
        const pathname = this.props.location.pathname.split('/')[1]
        const context = pathname === "search" ? "anything" : pathname
        return (location.pathname !== "/") ?
            (
                <div>
                    <div className="topnav topnav-active">
                        <div className="col-sm-1 col-md-2 hidden-xs">
                            <div className="topnav-brand-logo-container">
                                <Link to="/">
                                    <img src="/images/aura-ikoner/fasit-small.png" className="topnav-brand-logo"/>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xs-7 col-sm-6 col-md-4">
                            <input
                                type="text"
                                className="form-control search-field-text-input-in-topnav"
                                ref="searchField"
                                placeholder={'Search for ' + context}
                                value={search.searchString}
                                onChange={(e) => dispatch(submitSearchString(context, e.target.value, 0))}
                            />
                        </div>
                        {this.showLogin()}
                        <Login />
                    </div>
                    <ContextMenu />
                </div>
            ) : (
                <div className="topnav">
                    {this.showLogin()}
                    <Login />
                </div>)

    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        location: state.routing.locationBeforeTransitions,
        search: state.search

    }
}

export default connect(mapStateToProps)(TopNav)
