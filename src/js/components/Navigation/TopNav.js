import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import classString from 'react-classset'
import {connect} from 'react-redux'
import Search from './Search'
import {toggleSidebar} from '../../actionCreators/navigation'
import {logOut, fetchUserData} from '../../actionCreators/authentication'


class TopNav extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchUserData())
    }

    handleSidebarToggle() {
        this.props.dispatch(toggleSidebar())
    }

    handleLogout(e) {
        e.preventDefault()
        this.props.dispatch(logOut())
    }


    arrowDirection() {
        return classString({
            'fa': true,
            'fa-angle-double-left': !this.props.sidebarMinimized,
            'fa-angle-double-right': this.props.sidebarMinimized,
            'cursor-pointer': true
        })
    }

    showLogin() {
        if (!this.props.user.authenticated)
            return <li><Link to="/login" className="log-button"><i className="fa fa-unlock-alt"></i>&nbsp;Log in</Link></li>
        return (
            <div>
                <li className="userName"><i className="fa fa-user"></i>&nbsp;{this.props.user.displayname}</li>
                <li className="log-button"><span className="log-button" onClick={this.handleLogout.bind(this)}><i
                    className="fa fa-sign-out"></i>&nbsp;Log out</span></li>
            </div>
        )
    }

    showLogout() {
        if (this.props.user.authenticated)
            return <li className="log-button"><a className="log-button" onClick={this.handleLogout.bind(this)}><i
                className="fa fa-sign-out"></i>&nbsp;Log out</a></li>
    }

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" onClick={this.handleSidebarToggle.bind(this)}> <i
                        className={this.arrowDirection()}></i></a>
                </div>
                <Search />

                <ul className="nav navbar-top-links navbar-right">
                    {this.showLogin()}
                </ul>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        sidebarMinimized: state.viewModes.sidebarMinimized,
        user: state.user
    }
}
/*const mapDispatchToProps = (dispatch) => {
 return {
 onClick: () => dispatch({type: 'TOGGLE_SIDEBAR'}),
 setUser: (data) => dispatch({type: 'SET_USER', value: data})
 }
 }*/
export default connect(mapStateToProps)(TopNav)
