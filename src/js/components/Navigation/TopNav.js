import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import {connect} from 'react-redux'
import Login from '../common/Login'
import ContextMenu from './ContextMenu'
import {logOut, getUser, displayLogin} from '../../actionCreators/authentication'


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
                            className="btn btn-sm btn-info pull-right"
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
                        <button type="button" className="btn btn-link topnav-button"><i
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
                        <button type="button" className="btn btn-link topnav-button"><i
                            className="fa fa-cog fa-2x"/>
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
                        <button type="button"
                                className="btn topnav-user-icon"
                        >
                            <i className="fa fa-user"/>
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
                <dl className="text-right">
                    <dt>Roles</dt>
                    <dd>Selfservice</dd>
                    <dd>Superuser</dd>
                    <dd>User</dd>
                    <dd>Prod Operations</dd>
                </dl>
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
            <Popover title="Tools" id="tools">
                <dl className="text-right">
                    <dt>+ new node</dt>
                    <dd>+ cluster</dd>
                    <dd>+ application</dd>
                </dl>

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
        const {location, dispatch, searchString} = this.props
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
                                value={searchString}
                                onChange={(e) => dispatch(submitSearchString(location, e.target.value))}
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
        searchString: state.search.searchString

    }
}

export default connect(mapStateToProps)(TopNav)
