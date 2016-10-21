import React from 'react'
import classString from 'react-classset'
import {Link} from 'react-router'
import {NavLink} from './NavLink'
import {connect} from 'react-redux'


const SidebarNav = React.createClass({
    hidden() {
        return classString({
            "hidden": this.props.sidebarMinimized,
        })
    },
    active(location){
        return classString({
            "sidebar-menu-letter": true,
            "sidebar-menu-active": this.props.location.pathname.split("/")[1] === location

        })
    },
    render() {
        return (
            <div className="navbar navbar-inverse sidebar">
                <div className="sidebar-header"><img src="/images/fasit.png" className="sidebar-brand"/><span
                    className={this.hidden()}>&nbsp;&nbsp;<b className="">Fasit</b></span></div>
                <ul className="nav sidebar" id="side-menu">
                    <li className={this.active("")}>
                        <Link to="/" onlyActiveOnIndex><i className="fa fa-home"></i><span
                            className={this.hidden()}>&nbsp;&nbsp; Home</span></Link>
                    </li>
                    <li className={this.active("environments")}>
                        <Link to="/environments"><i className="fa fa-sitemap"></i><span
                            className={this.hidden()}>&nbsp;&nbsp; Environments</span></Link>
                    </li>
                    <li className={this.active("applications")}>
                        <Link to="/applications"><i className="fa fa-home fa-cube"></i><span
                            className={this.hidden()}>&nbsp;&nbsp; Applications</span></Link>
                    </li>
                    <li className={this.active("instances")}>
                        <Link to="/instances"><i className="fa fa-home fa-cubes"></i><span
                            className={this.hidden()}>&nbsp;&nbsp; Instances</span></Link>
                    </li>
                    <li className={this.active("nodes")}>
                        <Link to="/nodes"><i className="fa fa-home fa-laptop"></i><span
                            className={this.hidden()}>&nbsp;&nbsp; Nodes</span></Link>
                    </li>
                    <li className={this.active("resources")}>
                        <Link to="/resources"><i className="fa fa-home fa-cutlery"></i><span
                            className={this.hidden()}>&nbsp;&nbsp; Resources</span></Link>
                    </li>
                </ul>
            </div>
        )
    }
})
const mapStateToProps = (state) => {
    return {
        sidebarMinimized: state.configuration.sidebarMinimized,
        location: state.routing.locationBeforeTransitions
    }

}
export default connect(mapStateToProps)(SidebarNav)
