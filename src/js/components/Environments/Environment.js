import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {FormString} from "../common/Forms"
import {CollapsibleMenu, CollapsibleMenuItem, RevisionsView} from "../common/"
import {
    fetchEnvironment
} from "../../actionCreators/environment"

class Environment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayClusters: true,
            displayNodes: false,
            displayInstances: false
        }
    }

    componentDidMount() {
        const {dispatch, name} = this.props
        dispatch(fetchEnvironment(name))
    }

    render() {
        const {environment} = this.props
        // const environment = {name: "p", environmentclass: "p"}


        return (
            <div className="row">
                <div className="col-xs-12" style={{height: 30 + "px"}}></div>
                <div className="col-md-6">
                    <FormString
                        label="name"
                        value={environment.name}
                    />
                    <FormString
                        label="environment class"
                        value={environment.environmentclass}
                    />
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
                        <li className={this.state.displayClusters ? "active" : ""}><a
                            onClick={() => this.selectTab("clusters")}>Clusters</a></li>
                        <li className={this.state.displayNodes ? "active" : ""}><a
                            onClick={() => this.selectTab("nodes")}>Nodes</a></li>
                        <li className={this.state.displayInstances ? "active" : ""}><a
                            onClick={() => this.selectTab("instances")}>Instances</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {this.state.displayClusters ? '' : ''}
                    {this.state.displayNodes ? '' : ''}
                    {this.state.displayInstances ? '' : ''}
                </div>
            </div>
        )
    }

    selectTab(tab) {
        switch (tab) {
            case "clusters":
                this.setState({
                        displayClusters: true,
                        displayNodes: false,
                        displayInstances: false
                    }
                )
                return
            case "nodes":
                return this.setState({
                        displayClusters: false,
                        displayNodes: true,
                        displayInstances: false
                    }
                )
            case "instances":
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
        environment: state.environment_fasit.data,
    }
}

export default connect(mapStateToProps)(Environment)
