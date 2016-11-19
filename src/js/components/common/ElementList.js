import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }
    generateResourcesList(){
        const { data } = this.props
        if (data.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (data.requestFailed)
            return <pre>{data.requestFailed}</pre>
        return data.data.map((item, index)=> {
            return (
                <Link key={index} to={'/resources/'+item.alias} className="element-list-item" activeClassName='element-list-item-active'>
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
        if (data.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (data.requestFailed)
            return <pre>{data.requestFailed}</pre>
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

    render() {
        const {type} = this.props
        switch (type) {
            case "nodes":
                return <div className="element-list">{this.generateNodesList()}</div>
            case "resources":
                return <div className="element-list">{this.generateResourcesList()}</div>
        }
    }
}
