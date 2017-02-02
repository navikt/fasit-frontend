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
        const {dispatch, id} = this.props
        dispatch(fetchInstance(id))
    }

    render() {
        const {instance} = this.props

        const clusterName = instance.cluster ? instance.cluster.name : ""

        return (
            <div className="row">
                <div className="col-xs-12" style={{height: 30 + "px"}}></div>
                <div className="col-md-6">
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
                            <Link to={`/environments/${instance.environment}/clusters/${clusterName}`}>{clusterName}</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <CollapsibleMenu>
                        <CollapsibleMenuItem label="Revisions">
                        </CollapsibleMenuItem>
                    </CollapsibleMenu>
                </div>
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div className="col-xs-12">
                    <ul className="nav nav-tabs">
                        <li className={this.state.displayClusters ? "active" : ""}><a onClick={() => this.selectTab("used")}>Used
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

const mapStateToProps = (state) => {
    return {
        instance: state.instance_fasit.data
    }
}

export default connect(mapStateToProps)(Instance)
