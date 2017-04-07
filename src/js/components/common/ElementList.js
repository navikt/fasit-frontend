import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import {getResourceTypeName, resourceTypeIcon} from '../../utils/resourceTypes'
import {List, ListItem} from 'material-ui/List'
import {Card, CardHeader, CardActions, CardTitle, CardText} from 'material-ui/Card'
import {capitalize} from '../../utils/'


export default class ElementList extends Component {
    constructor(props) {
        super(props)
    }

    generateResourcesList() {
        const {data} = this.props

        return data.data.map((item, index)=> {
            const avatar = resourceTypeIcon(item.type)
            const title = `${getResourceTypeName(item.type)} - ${item.alias}`
            const scope = Object.keys(item.scope).map(k => `${item.scope[k]}`).join(' | ')
            const properties = Object.keys(item.properties).map(k => ({key: capitalize(k), property: item.properties[k]}))

            return (
                <div style={{paddingTop: 5 + "px"}} key={index}>
                    <Card>
                        <CardHeader title={title}
                                    titleStyle={{fontWeight: 'bold'}}
                                    subtitle={scope}
                                    avatar={avatar}
                                    style={{paddingBottom: '10px'}}
                        />

                        <CardText style={{paddingTop: '0px', paddingBottom: '0px'}}>
                            <List>
                                {properties.map((p, key) => p.key === 'ApplicationProperties' ?
                                    <ListItem key={key} style={{paddingTop: '0px', paddingBottom: '0px'}} disabled={true} className="text-overflow" primaryText={<pre><code>{p.property}</code></pre>}/> :
                                    <ListItem key={key} style={{paddingTop: '0px', paddingBottom: '0px'}} disabled={true} className="text-overflow" primaryText={p.key} secondaryText={p.property}  />
                                )}
                            </List>
                        </CardText>
                        <CardActions>

                            <Link key={index} to={'/resources/' + item.id} className="element-list-item"
                                  activeClassName='element-list-item-active'>View</Link>
                        </CardActions>
                    </Card>
                </div>
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