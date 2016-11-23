import React, {Component, PropTypes} from 'react'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Search from '../common/Search'
import Login from '../Home/Login'
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
        if (user.authenticated)
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
        const {searchString, location} = this.props
        console.log(location.pathname.split('/').length)
        if (searchString || location.pathname.split('/').length > 1) {
            return (
                <div className="row topnav topnav-active">
                    <div className="col-sm-1 hidden-xs">
                        <div className="topnav-brand-logo-container">
                            <img src="images/fasit-stempel.png" className="topnav-brand-logo"/>
                        </div>
                    </div>
                    <div className="col-md-1 hidden-sm hidden-xs">
                        <div className="topnav-brand-active">Fasit</div>
                    </div>
                    <div className="col-xs-7 col-sm-6 col-md-4">
                        <Search />
                    </div>
                    {this.showLogin()}
                    <Login />
                </div>
            )
        }
        return (
            <div className="row topnav">
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
