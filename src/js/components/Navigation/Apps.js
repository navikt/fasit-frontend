import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import {connect} from 'react-redux'
import Login from '../common/Login'
import ContextMenu from './ContextMenu'
import {logOut, getUser, displayLogin} from '../../actionCreators/authentication'
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
        if (user.authenticated)
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <OverlayTrigger
                            trigger="click"
                            rootClose={true}
                            placement="bottom"
                            overlay={this.appsOverlay()}
                        >
                            <button type="button" className="btn btn-link topnav-button"><i
                                className="fa fa-th fa-2x"/>
                            </button>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="btn btn-sm btn-info topnav-button"
                            style={{margin: 10 + "px"}}
                            onClick={() => dispatch(displayLogin(true))}
                        >
                            <i className="fa fa-unlock-alt"/>&nbsp;Log in
                        </button>
                    </li>
                </ul>
            )
        return (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <OverlayTrigger
                        trigger="click"
                        rootClose={true}
                        placement="bottom"
                        id="appsOverlay"
                        overlay={this.appsOverlay()}
                    >
                        <button type="button" className="btn  btn-link topnav-button apps-topnav-button"><i
                            className="fa fa-th fa-2x"/>
                        </button>
                    </OverlayTrigger>
                </li>
                <li>
                    <OverlayTrigger
                        trigger="click"
                        rootClose={true}
                        placement="bottom"
                        id="toolsOverlay"
                        overlay={this.toolsOverlay()}
                    >
                        <button type="button" className="btn  btn-link topnav-button tools-topnav-button"><i
                            className="fa fa-wrench fa-2x"/>
                        </button>
                    </OverlayTrigger>
                </li>
                <li>
                    <OverlayTrigger
                        trigger="click"
                        id="loginINformationOverlay"
                        rootClose={true}
                        placement="bottom"
                        overlay={this.loginInformationOverlay()}
                    >
                        <button type="button" className="btn  btn-link topnav-button">
                            <span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"/><i
                                className="fa fa-user fa-stack-1x fa-inverse"/></span>
                        </button>
                    </OverlayTrigger>
                </li>

            </ul>
        )
    }

    loginInformationOverlay() {
        const {dispatch} = this.props
        return (
            <Popover title="Frode Sundby" id="login">
                <strong>Roles</strong>
                <ul className="topnav-menu">
                    <li>Selfservice</li>
                    <li>Superuser</li>
                    <li>User</li>
                    <li>Prod Operations</li>
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
        return (
            <Popover id="tools">
                <ul className="topnav-menu topnav-menu-selector">
                    <li><i className="fa fa-server" /> &nbsp;&nbsp; Create node</li>
                    <li><i className="fa fa-braille" /> &nbsp;&nbsp; Create cluster</li>
                    <li><i className="fa fa-cube" /> &nbsp;&nbsp; Create application</li>
                    <li><i className="fa fa-sitemap" /> &nbsp;&nbsp; Create environment</li>
                    <li><i className="fa fa-cogs" /> &nbsp;&nbsp; Create resource</li>
                </ul>
            </Popover>
        )
    }

    appsOverlay() {
        return (
            <Popover title="Applications" id="apps">
                <dl className="text-right">
                    <dt>Vera</dt>
                    <dd>Sera</dd>
                    <dd>Nora</dd>
                    <dd>Coca</dd>
                    <dd>Visa</dd>
                    <dd>Visa</dd>
                </dl>
            </Popover>
        )
    }

    render() {
        const {location, search} = this.props
        const pathname = this.props.location.pathname.split('/')[1]
        const context = pathname === "search" ? "anything" : pathname
        if (location.pathname !== "/") {
            return (
                <div>
                    <div className="topnav topnav-active">
                        <div className="col-sm-1 hidden-xs">
                            <div className="topnav-brand-logo-container">
                                <Link to="/">
                                    <img src="images/fasit-stempel.png" className="topnav-brand-logo"/>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-1 hidden-sm hidden-xs">
                            <div className="topnav-brand-active">Fasit</div>
                        </div>
                        <div className="col-xs-7 col-sm-6 col-md-4">
                            <input
                                type="text"
                                className="form-control search-field-text-input-in-topnav"
                                ref="searchField"
                                placeholder={'Search for ' + context}
                                value={search.searchString}
                                onChange={(e) => submitSearchString(location, e.target.value, search.activePage)}
                            />
                        </div>
                        {this.showLogin()}
                        <Login />
                    </div>
                    <ContextMenu />
                </div>
            )
        }
        return (
            <div className="topnav">
                <div className="col-md-1 hidden-sm hidden-xs">
                    <div className="topnav-brand">Fasit</div>
                </div>
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
