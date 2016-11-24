import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import BreadCrumbs from './BreadCrumbs'


class ContexMenu extends Component {
    constructor(props) {
        super(props)
    }

    isActive(context) {
        const {location} = this.props
        const currentLocation = location.pathname.split('/')[1]
        if (currentLocation === context ) return "active"
            }

    render() {
        return (
            <div className="context-menu row">
                <div className="col-lg-10 col-lg-offset-2 col-md-12">
                    <BreadCrumbs />
                    <ul className="nav nav-tabs nav-tab-positioning">
                        <li className={this.isActive("")}>
                            <Link to="/">
                                <i className="fa fa-search"/>&nbsp;&nbsp;Search</Link>
                        </li>
                        <li className={this.isActive("environments")}>
                            <Link to="/environments">
                                <i className="fa fa-sitemap"/>&nbsp;&nbsp;Environments</Link>
                        </li>
                        <li className={this.isActive("applications")}>
                            <Link to="/applications">
                                <i className="fa fa-home fa-cube"/>&nbsp;&nbsp;Applications</Link>
                        </li>
                        <li className={this.isActive("instances")}>
                            <Link to="/instances">
                                <i className="fa fa-home fa-cubes"/>&nbsp;&nbsp;Instances</Link>
                        </li>
                        <li >
                            <Link to="/nodes">
                                <i className="fa fa-home fa-laptop"/>&nbsp;&nbsp;Nodes</Link>

                        </li>
                        <li className={this.isActive("resources")}>
                            <Link to="/resources">
                                <i className="fa fa-home fa-cutlery"/>&nbsp;&nbsp;Resources</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
ContexMenu.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
})

export default connect(mapStateToProps)(ContexMenu)