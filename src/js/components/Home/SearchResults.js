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
                        <h3 className="text-left">{nodes.headers.total_count} nodes</h3>
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
                    <div className="text-left">
                        <div className="col-md-1" />
                        {environments.data.length > 0 ?
                            <div className="col-md-2">
                                <div className={this.elementListClasses(environments)}>
                                    <h4>{environments.headers.total_count} environments</h4>
                                    <ElementList type="environments" data={environments}/>
                                </div>
                            </div> :
                            <div />
                        }
                        {applications.data.length > 0 ?
                            <div className="col-md-2">
                                <div className={this.elementListClasses(applications)}>
                                    <h4>{applications.headers.total_count} applications</h4>
                                    <ElementList type="applications" data={applications}/>
                                </div>
                            </div> :
                            <div />
                        }
                        {instances.data.length > 0 ?
                            <div className="col-md-2">
                                <div className={this.elementListClasses(instances)}>
                                    <h4>{instances.headers.total_count} instances</h4>
                                    <ElementList type="instances" data={instances}/>
                                </div>
                            </div> :
                            <div />
                        }
                        {nodes.data.length > 0 ?
                            <div className="col-md-2">
                                <div className={this.elementListClasses(nodes)}>
                                    <h4>{nodes.headers.total_count} nodes</h4>
                                    <ElementList type="nodes" data={nodes}/>
                                </div>
                            </div> :
                            <div />
                        }
                        {resources.data.length > 0 ?
                            <div className="col-md-2">
                                <div className={this.elementListClasses(resources)}>
                                    <h4>{resources.headers.total_count} resources</h4>

                                    <ElementList type="resources" data={resources}/>
                                </div>
                            </div> :
                            <div />
                        }
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
