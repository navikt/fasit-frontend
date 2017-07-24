import React, {Component} from "react";
import moment from "moment";
import {ResourcesList} from "../Resources/ResourcesList";
import {EnvironmentsList} from "../Environments/EnvironmentsList";
import {ApplicationsList} from "../Applications/ApplicationsList";
import {InstancesList} from "../Instances/InstancesList";
import {NodesList} from "../Nodes/NodesList";


export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        moment.locale('nb')

        const {type, data} = this.props
        if (data.isFetching)
            return <div className="element-list"><i className="fa fa-spinner fa-pulse fa-2x"></i></div>
        else if (data.requestFailed)
            return <div className="element-list">
                <pre>{data.requestFailed}</pre>
            </div>
        else {
            switch (type) {
                case "nodes":
                    return <NodesList nodes={this.props.data}/>
                case "resources":
                    return <ResourcesList resources={this.props.data}/>
                case "environments":
                    return <EnvironmentsList environments={this.props.data}/>
                case "applications":
                    return <ApplicationsList applications={this.props.data}/>
                case "instances":
                    return <InstancesList instances={this.props.data}/>
            }
        }
    }
}