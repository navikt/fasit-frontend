import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import BreadCrumbs from './BreadCrumbs'
import Filters from './Filters'

const TopNav = React.createClass({


    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top navbar-filter" role="navigation">
                <BreadCrumbs />
                <Filters />
            </nav>
        )
    }
})
const mapStateToProps = (state) => {
    return {
        sidebarMinimized: state.viewModes.sidebarMinimized,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch({type: 'TOGGLE_SIDEBAR'})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
