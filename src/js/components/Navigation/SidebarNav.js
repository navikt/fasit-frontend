import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import classString from 'react-classset'
import Nodes from '../Nodes/Nodes'
import Resources from '../Resources/Resources'
import Instances from '../Instances/Instances'
import Applications from '../Applications/Applications'
import Environments from '../Environments/Environments'
import ElementList from '../common/ElementList'

class SidebarNav extends Component {
    constructor(props) {
        super(props)
    }

    selectPagingResource(location) {
        switch (location[1]) {
            case "nodes":
                return <Nodes />
            case "resources":
                return <Resources />
            case "instances":
                return <Instances />
            case "applications":
                return <Applications />
            case "environments":
                return <Environments />
            default:
                return <div />
        }
    }

    elementListClasses(location, item) {
        return classString({
            'element-list-container': true,
            'element-list-container-selected': (location[1] === item && location.length > 2)
        })
    }
    displayElementList(location, item){
        return (location[1] === item && location.length > 2)
    }

    render() {
        const location = this.props.location.pathname.split('/')
        const {nodes, resources, environments, applications, instances} = this.props
        return (
            <div className="col-md-2 nopadding side-menu-container">
                <ul className="nav sidebar">
                    <li>
                        <Link to="/" onlyActiveOnIndex className="btn btn-default text-left sidebarNav-link"
                              activeClassName="sidebarNav-link-active">
                            <i className="fa fa-home"/>&nbsp;&nbsp;&nbsp;&nbsp;Home</Link>
                    </li>
                    <li >
                        <Link to="/environments" className="btn btn-default text-left sidebarNav-link"
                              activeClassName="sidebarNav-link-active">
                            <i className="fa fa-sitemap"/>&nbsp;&nbsp;&nbsp;&nbsp;Environments</Link>
                        <div className={this.elementListClasses(location, "environments")}>

                            { this.displayElementList(location, "environments") ? <ElementList type="environments" data={environments}/> :
                                <div />}
                        </div>
                    </li>
                    <li >
                        <Link to="/applications" className="btn btn-default text-left sidebarNav-link"
                              activeClassName="sidebarNav-link-active">
                            <i className="fa fa-home fa-cube"/>&nbsp;&nbsp;&nbsp;&nbsp;Applications</Link>
                        <div className={this.elementListClasses(location, "applications")}>

                            { this.displayElementList(location, "applications") ? <ElementList type="applications" data={applications}/> :
                                <div />}
                        </div>
                    </li>
                    <li >
                        <Link to="/instances" className="btn btn-default text-left sidebarNav-link"
                              activeClassName="sidebarNav-link-active">
                            <i className="fa fa-home fa-cubes"/>&nbsp;&nbsp;&nbsp;&nbsp;Instances</Link>
                        <div className={this.elementListClasses(location, "instances")}>

                            { this.displayElementList(location, "instances") ? <ElementList type="instances" data={instances}/> : <div />}
                        </div>
                    </li>
                    <li >
                        <Link to="/nodes" className="btn btn-default text-left sidebarNav-link"
                              activeClassName="sidebarNav-link-active">
                            <i className="fa fa-home fa-laptop"/>&nbsp;&nbsp;&nbsp;&nbsp;Nodes</Link>
                        <div className={this.elementListClasses(location, "nodes")}>
                            { this.displayElementList(location, "nodes") ? <ElementList type="nodes" data={nodes}/> : <div />}
                        </div>
                    </li>
                    <li >
                        <Link to="/resources" className="btn btn-default text-left sidebarNav-link"
                              activeClassName="sidebarNav-link-active">
                            <i className="fa fa-home fa-cutlery"/>&nbsp;&nbsp;&nbsp;&nbsp;Resources</Link>
                        <div className={this.elementListClasses(location, "resources")}>

                            { this.displayElementList(location, "resources") ? <ElementList type="resources" data={resources}/> : <div />}
                        </div>
                    </li>
                </ul>
                {this.selectPagingResource(location)}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        location: state.routing.locationBeforeTransitions,
        nodes: state.nodes,
        resources: state.resources,
        instances: state.instances,
        applications: state.applications,
        environments: state.environments
    }

}
export default connect(mapStateToProps)(SidebarNav)
