import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Search from './Search'
import {logOut, getUser} from '../../actionCreators/authentication'


class TopNav extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(getUser())
    }

    handleLogout(e) {
        e.preventDefault()
        this.props.dispatch(logOut())
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
        sidebarMinimized: state.configuration.sidebarMinimized,
        user: state.user
    }
}

export default connect(mapStateToProps)(TopNav)
