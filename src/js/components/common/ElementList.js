import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import {ResourcesList} from '../Resources/ResourcesList'


export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }

    generateNodesList() {
        const {data} = this.props
        return data.data.map((item, index)=> {
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

    generateEnvironmentsList() {
        const {data} = this.props
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/environments/' + item.name} className="element-list-item"
                      activeClassName='element-list-item-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.name}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.environmentclass} <b> | </b>
                        {moment(item.created).format('ll')}
                    </div>
                </Link>
            )
        })
    }

    generateApplicationsList() {
        const {data} = this.props
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/applications/' + item.name} className="element-list-item"
                      activeClassName='element-list-item-active'>
                    <div>
                        <h4><i className="fa fa-cube fa-fw"/>&emsp;{item.name}</h4>
                        <i className="fa fa-id-card-o fa-fw"/>&emsp;{item.groupid} &emsp;|&emsp;
                        <i className="fa fa-id-badge fa-fw"/>&emsp;{item.artifactid} <br />
                        <i className="fa fa-birthday-cake fa-fw"/>&emsp;{moment(item.created).format('L HH:mm')}&emsp;
                        |&emsp;
                        <i className="fa fa-recycle fa-fw"/>&emsp;{moment(item.updated).format('L  HH:mm')}

                    </div>
                </Link>
            )
        })
    }

    generateInstancesList() {
        const {data} = this.props
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/instances/' + item.id}
                      className="element-list-item"
                      activeClassName='element-list-item-active'>
                    <div className="element-list-item">
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.application}</h5>
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
                    return <div className="element-list">{this.generateEnvironmentsList()}</div>
                case "applications":
                    return <div className="element-list">{this.generateApplicationsList()}</div>
                case "instances":
                    return <div className="element-list">{this.generateInstancesList()}</div>
            }
        }
    }
}