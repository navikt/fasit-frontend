import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'


import BreadCrumbs from './BreadCrumbs'
import Filters from './Filters'

class ContexMenu extends Component {


    render() {
        const {location} = this.props
        return (
            <nav className="navbar navbar-default navbar-static-top navbar-filter" role="navigation">
                <BreadCrumbs />
                {location.pathname.split('/').length > 2 ? <Filters />: <div />}
            </nav>
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