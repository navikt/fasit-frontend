import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classString from 'react-classset'

import ElementList from '../common/ElementList'


class SearchRestuls extends Component {
    constructor(props) {
        super(props)
    }

    elementListClasses(data) {
        return classString({
            'element-list-container': true,
            'element-list-container-selected': !data.isFetching || data.data.length === 0
        })
    }

    render() {
        const location = this.props.location.pathname.split('/')[1] || "anything"
        const {nodes, resources, environments, applications, instances} = this.props

        switch (location) {

            case "environments":
                return (
                    <div className="col-md-4 col-md-offset-3">
                        <h3 className="text-left">Environments</h3>
                        <ElementList type="environments" data={environments}/>
                    </div>
                )
            case "applications":
                return (
                    <div className="col-md-4 col-md-offset-3">
                        <h3 className="text-left">Applications</h3>
                        <ElementList type="applications" data={applications}/>
                    </div>
                )
            case "instances":
                return (
                    <div className="col-md-4 col-md-offset-3">
                        <h3 className="text-left">Instances</h3>
                        <ElementList type="instances" data={instances}/>
                    </div>
                )
            case "nodes":
                return (
                    <div className="col-md-4 col-md-offset-3">
                        <h3 className="text-left">Nodes</h3>
                        <ElementList type="nodes" data={nodes}/>
                    </div>
                )
            case "resources":
                return (
                    <div className="col-md-4 col-md-offset-3">
                        <h3 className="text-left">Applications</h3>
                        <ElementList type="resources" data={resources}/>
                    </div>
                )
            default:
                return (
                    <div>
                        <div className="col-md-1"/>
                        <div className="col-md-2">
                            <div className={this.elementListClasses(environments)}>
                                <h3>Environments</h3>
                                <ElementList type="environments" data={environments}/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={this.elementListClasses(applications)}>
                                <h3>Applications</h3>
                                <ElementList type="applications" data={applications}/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={this.elementListClasses(instances)}>
                                <h3>Instances</h3>
                                <ElementList type="instances" data={instances}/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={this.elementListClasses(nodes)}>

                                <h3>Nodes</h3>
                                <ElementList type="nodes" data={nodes}/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={this.elementListClasses(resources)}>
                                <h3>Resources</h3>
                                <ElementList type="resources" data={resources}/>
                            </div>
                        </div>
                    </div>
                )
        }


    }
}
SearchRestuls.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
    nodes: state.nodes,
    resources: state.resources,
    instances: state.instances,
    applications: state.applications,
    environments: state.environments
})

export default connect(mapStateToProps)(SearchRestuls)
