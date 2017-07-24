import React, {Component} from "react";
import {Link} from "react-router";
import moment from "moment";
import {ResourcesList} from "../Resources/ResourcesList";
import {EnvironmentsList} from "../Environments/EnvironmentsList";
import {ApplicationsList} from "../Applications/ApplicationsList";
import {InstancesList} from "../Instances/InstancesList";


export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }

    generateNodesList() {
        const {data} = this.props
        return data.data.map((item, index) => {
            return (
                <Link key={index} to={'/nodes/' + item.hostname} className="element-list-item"
                      activeClassName='element-list-item-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.hostname}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.environment} <b> | </b>
                        {item.cluster ? item.cluster.name : ""}
                    </div>
                </Link>
            )
        })
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
                    return <div className="element-list">{this.generateNodesList()}</div>
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