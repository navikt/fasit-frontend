import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import moment from 'moment'

export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }

    generateResourcesList() {
        const {data} = this.props
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/resources/' + item.alias} className="element-list-item"
                      activeClassName='element-list-item-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.alias}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.scope.environment} <b> | </b>
                    </div>
                </Link>
            )
        })
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
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.name}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.groupid} <b> | </b>
                    </div>
                </Link>
            )
        })
    }

    generateInstancesList() {
        const {data} = this.props
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/instances/' + item.application}
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
                    return <div className="element-list">{this.generateResourcesList()}</div>
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