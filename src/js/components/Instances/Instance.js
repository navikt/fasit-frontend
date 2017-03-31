import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
//import {Link} from "react-router"
import {FormString, FormLink} from "../common/Forms"
import {oldRevision} from '../../utils/'
import InstanceResources from "./InstanceResources"
import Manifest from "./Manifest"
import {CollapsibleMenu, CollapsibleMenuItem, RevisionsView, CurrentRevision} from "../common/"
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
        const {dispatch, id, query} = this.props
        dispatch(fetchInstance(id, query.revision))
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
        const {instance, revisions, query, id} = this.props
        const showRevision = oldRevision(revisions, query.revision)

        const clusterName = instance.cluster ? instance.cluster.name : ""

        return (
            <div className="row">
                {showRevision ?
                    <CurrentRevision revisionId={query.revision} revisions={revisions}/> : null}
                <div className="col-xs-12" style={{height: 30 + "px"}}></div>
                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    <FormLink
                        label="Application"
                        value={instance.application}
                        linkTo={`/applications/${instance.application}`} />
                    <FormString
                        label="version"
                        value={instance.version}
                    />
                    <FormLink
                        label="Environment"
                        value={instance.environment}
                        linkTo={`/environments/${instance.environment}`}
                    />

                    <FormLink
                        label="Cluster"
                        value={clusterName}
                        linkTo={`/environments/${instance.environment}/clusters/${clusterName}`}
                    />
                </div>
                <CollapsibleMenu>
                    <CollapsibleMenuItem label="History" defaultExpanded={true}>
                        <RevisionsView id={id} currentRevision={query.revision} component="instance"/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div className="col-xs-12">
                    <ul className="nav nav-tabs">
                        <li className={this.state.displayClusters ? "active" : ""}><a
                            onClick={() => this.selectTab("used")}>Used
                            resources</a></li>
                        <li className={this.state.displayNodes ? "active" : ""}><a
                            onClick={() => this.selectTab("exposed")}>Exposed
                            resources</a></li>
                        <li className={this.state.displayInstances ? "active" : ""}><a
                            onClick={() => this.selectTab("manifest")}>Manifest</a>
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
