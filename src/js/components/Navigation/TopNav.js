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
        if (!user.authenticated)
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <OverlayTrigger
                            trigger="click"
                            rootClose={true}
                            placement="bottom"
                            overlay={AuraTools()}
                        >
                            <button type="button" className="btn btn-link topnav-button apps-topnav-button"><i
                                className="fa fa-th fa-2x"/>
                            </button>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="btn btn-sm topnav-button btn-link topnav-login-button"
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
                        overlay={AuraTools()}
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

    appsOverlay() {
        return (
            <Popover title="AURA tools" id="apps">
                <a href="https://fasit.adeo.no" target="Fasit">

                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/fasit.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Fasit
                        </div>
                    </div>
                </a>
                <a href="https://basta.adeo.no" target="Basta">

                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/basta.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Basta
                        </div>
                    </div>
                </a>
                <a href="https://vera.adeo.no" target="Vera">
                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/vera.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Vera
                        </div>
                    </div>
                </a>
                <a href="https://sera.adeo.no" target="Sera">

                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/sera.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Sera
                        </div>
                    </div>
                </a>
                <a href="https://nora.adeo.no" target="Nora">

                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/nora.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Nora
                        </div>
                    </div>
                </a>
                <a href="https://coca.adeo.no" target="Coca">

                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/coca.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Coca
                        </div>
                    </div>
                </a>
                <a href="https://visa.adeo.no" target="Visa">
                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/visa.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Visa
                        </div>
                    </div>
                </a>
                <a href="https://plaster.adeo.no" target="Plaster">
                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/plaster.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Plaster
                        </div>
                    </div>
                </a>
                <a href="https://confluence.adeo.no/display/AURA" target="confluence">
                    <div className="app-container">
                        <div className="app-icon">
                            <img src="/images/aura-ikoner/confluence.png" className="app-icon"/>
                        </div>
                        <div className="app-label">
                            Docs
                        </div>
                    </div>
                </a>
            </Popover>
        )
    }

    toolsOverlay() {
        const {dispatch} = this.props
        return (
            <Popover id="tools">
                <ul className="topnav-menu topnav-menu-selector">
                    <li onClick={() => dispatch(showNewComponentForm("node", true))}><i className="fa fa-server"/> &nbsp;&nbsp;Create node</li>
                    <li onClick={() => dispatch(showNewComponentForm("cluster", true))}><i className="fa fa-braille"/> &nbsp;&nbsp; Create cluster</li>
                    <li onClick={() => dispatch(showNewComponentForm("application", true))}><i className="fa fa-cube"/> &nbsp;&nbsp; Create application</li>
                    <li onClick={() => dispatch(showNewComponentForm("environment", true))}><i className="fa fa-sitemap"/> &nbsp;&nbsp; Create environment</li>
                    <li onClick={() => dispatch(showNewComponentForm("resource", true))}><i className="fa fa-cogs"/> &nbsp;&nbsp; Create resource</li>
                </ul>
            </Popover>
        )
    }

    render() {
        const {location, search, dispatch} = this.props
        const pathname = this.props.location.pathname.split('/')[1]
        const context = pathname === "search" ? "anything" : pathname
        if (location.pathname !== "/") {
            return (
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
                    {/*-- Misc. modal components --*/}

                </div>
            )
        }
        return (
            <div className="topnav">
                <div className="col-md-1 hidden-sm hidden-xs">
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
