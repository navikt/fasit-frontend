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
            displayUsed: true,
            displayExposed: false,
            displayManifest: false
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
                    <CollapsibleMenu>
                        <CollapsibleMenuItem label="History">
                            <RevisionsView id={instance.id} component="instance"/>
                        </CollapsibleMenuItem>
                    </CollapsibleMenu>
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div className="col-xs-12">
                    <ul className="nav nav-tabs">
                        <li className={this.state.displayUsed ? "active" : ""}><a onClick={() => this.selectTab("used")}>Used
                            resources</a></li>
                        <li className={this.state.displayExposed ? "active" : ""}><a onClick={() => this.selectTab("exposed")}>Exposed
                            resources</a></li>
                        <li className={this.state.displayManifest ? "active" : ""}><a onClick={() => this.selectTab("manifest")}>Manifest</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {this.state.displayUsed ? <InstanceResources items={instance.usedresources}/> : ''}
                    {this.state.displayExposed ? <InstanceResources items={instance.exposedresources}/> : ''}
                    {this.state.displayManifest ? <Manifest /> : ''}
                </div>
            </div>
        )
    }

    selectTab(tab) {
        switch (tab) {
            case "used":
                this.setState({
                        displayUsed: true,
                        displayExposed: false,
                        displayManifest: false
                    }
                )
                return
            case "exposed":
                return this.setState({
                        displayUsed: false,
                        displayExposed: true,
                        displayManifest: false
                    }
                )
            case "manifest":
                return this.setState({
                        displayUsed: false,
                        displayExposed: false,
                        displayManifest: true
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
        id: ownProps.id
    }
}

export default connect(mapStateToProps)(Instance)
