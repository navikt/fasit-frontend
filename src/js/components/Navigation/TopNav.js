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
            return <button
                type="button"
                className="btn btn-sm btn-info pull-right"
                style={{margin: 10 + "px"}}
                onClick={() => dispatch(displayLogin(true))}
            >
                <i className="fa fa-unlock-alt"/>&nbsp;Log in
            </button>
        return (
            <div>
                <OverlayTrigger
                    trigger="click"
                    rootClose={true}
                    placement="bottom"
                    overlay={this.showTools()}
                >
                    <button type="button" className="btn btn-link tools-button">Tools&nbsp;&nbsp;<i
                        className="fa fa-cog"/>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger
                    trigger="click"
                    rootClose={true}
                    placement="bottom"
                    overlay={this.showLoginInformation()}
                >
                    <button type="button"
                            className="btn pull-right topnav-user-icon"
                    >
                        <i className="fa fa-user"/>
                    </button>

                </OverlayTrigger>
            </div>
        )
    }

    showLoginInformation() {
        const {dispatch} = this.props
        return (
            <Popover title="Frode Sundby">
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

    showTools() {
        const {dispatch} = this.props
        return (
            <Popover title="Tools">
                <dl className="text-right">
                    <dt>Roles</dt>
                    <dd>Selfservice</dd>
                    <dd>Superuser</dd>
                    <dd>User</dd>
                    <dd>Prod Operations</dd>
                </dl>
                <hr />
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    onClick={() => dispatch(logOut())}
                >Log out
                </button>

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
