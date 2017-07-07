import React, {Component}from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

class BreadCrumbs extends Component {
    getBreadCrumbs() {
        const crumbs = [];
        const locations = this.props.location.pathname.split('/')
        let path = "/"
        for (let i = 1; i < locations.length; i++) {
            let crumb = {};
            if (locations[i]) {
                if (i == locations.length - 1)
                    crumb.last = true

                crumb.path = path += locations[i]
                crumb.name = decodeURIComponent(locations[i])
                crumbs.push(crumb)
                path += '/'
            }
        }
        return crumbs
    }


    render() {
        const {location} = this.props
        return (
            <ol className="breadcrumb">
                <li><Link to="/"><i className="fa fa-home fa-fw"/></Link></li>
                {location.pathname === "/" ? <li>search</li>:""}

                {this.getBreadCrumbs().map(function (crumb) {
                    if (crumb.last)
                        return <li key={crumb.name}>{crumb.name}</li>
                    return <li key={crumb.name}><Link to={crumb.path}>{crumb.name}</Link></li>
                })}

            </ol>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        location: state.routing.locationBeforeTransitions
    }
}

export default connect(mapStateToProps)(BreadCrumbs)