import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {FormString} from "../common/Forms"
import InstanceResources from "./InstanceResources"
import Manifest from "./Manifest"
import {CollapsibleMenu, CollapsibleMenuItem, RevisionsView} from "../common/"
import {
    fetchInstance
} from "../../actionCreators/instance"

class Instance extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayClusters: true,
            displayNodes: false,
            displayInstances: false
        }
    }

    componentDidMount() {
        const {dispatch, id, revision} = this.props
        dispatch(fetchInstance(id, revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, id, query} = this.props
        // Fetch data from backend if revision changes
        if (nextProps.query.revision != query.revision) {
            dispatch(fetchInstance(id, nextProps.query.revision))
        }
        // Fetch data from backend if id changes
        if (nextProps.id != id) {
            dispatch(fetchInstance(nextProps.id, nextProps.query.revision))
        }
    }

    render() {
        const {instance} = this.props

        const clusterName = instance.cluster ? instance.cluster.name : ""

        return (
            <div className="row">
                <div className="col-xs-12" style={{height: 30 + "px"}}></div>
                <div className={this.oldRevision() ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    <FormString
                        label="application"
                        value={instance.application}
                    />
                    <FormString
                        label="version"
                        value={instance.version}
                    />
                    <FormString
                        label="environment"
                        value={instance.environment}
                    />
                    <div className="row">
                        <div className="col-md-4 FormLabel"><b>Cluster</b></div>
                        <div className="col-md-8">
                            <Link
                                to={`/environments/${instance.environment}/clusters/${clusterName}`}>{clusterName}</Link>
                        </div>
                    </div>
                </div>
                <CollapsibleMenu>
                    <CollapsibleMenuItem label="History">
                        <RevisionsView id={instance.id} component="instance"/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div className="col-xs-12">
                    <ul className="nav nav-tabs">
                        <li className={this.state.displayClusters ? "active" : ""}><a
                            onClick={() => this.selectTab("used")}>Used
                            resources</a></li>
                        <li className={this.state.displayNodes ? "active" : ""}><a onClick={() => this.selectTab("exposed")}>Exposed
                            resources</a></li>
                        <li className={this.state.displayInstances ? "active" : ""}><a onClick={() => this.selectTab("manifest")}>Manifest</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {this.state.displayClusters ? <InstanceResources items={instance.usedresources}/> : ''}
                    {this.state.displayNodes ? <InstanceResources items={instance.exposedresources}/> : ''}
                    {this.state.displayInstances ? <Manifest /> : ''}
                </div>
            </div>
        )
    }

    oldRevision() {
        const {revisions, query} = this.props
        if (!query.revision) {
            return false
        } else if (revisions.data[0]) {
            if (revisions.data[0].revision != query.revision) {
                return true
            }
        }
    }

    selectTab(tab) {
        switch (tab) {
            case "used":
                this.setState({
                        displayClusters: true,
                        displayNodes: false,
                        displayInstances: false
                    }
                )
                return
            case "exposed":
                return this.setState({
                        displayClusters: false,
                        displayNodes: true,
                        displayInstances: false
                    }
                )
            case "manifest":
                return this.setState({
                        displayClusters: false,
                        displayNodes: false,
                        displayInstances: true
                    }
                )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        instance: state.instance_fasit.data,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
        config: state.configuration,
        id: ownProps.id,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

export default connect(mapStateToProps)(Instance)
