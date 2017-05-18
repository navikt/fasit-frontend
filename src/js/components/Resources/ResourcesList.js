import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {getResourceTypeName, resourceTypeIcon} from '../../utils/resourceTypes'
import {LifecycleStatus} from '../common/'
import {List, ListItem} from 'material-ui/List'
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card'
import {capitalize} from '../../utils/'
import moment from 'moment'

export function ResourcesList(props) {
    const resources = props.resources.data
    return (
        <div>{
            resources.map((item, index)=> {
                return <ResourceListElement resource={item} key={index}/>
            })
        }   </div>
    )
}

function ResourceListElement(props) {
    moment.locale("en")
    const resource =  props.resource
    const avatar = resourceTypeIcon(resource.type)
    const title = `${getResourceTypeName(resource.type)} - ${resource.alias}`
    const scope = Object.keys(resource.scope).map(k => `${resource.scope[k]}`).join(' | ')

    const properties = Object.keys(resource.properties).map(k => ({
        key: capitalize(k),
        property: resource.properties[k]
    }))


       const additionalCardInfo = (<div className="pull-right">
           <div className="text-muted">Changed {moment(resource.updated).fromNow()}</div>
           <br/>
           <LifecycleStatus status={resource.lifecyclestatus}/>
       </div>)

    const primaryText = (key, value) => key === 'ApplicationProperties' ? (<pre><code>{value}</code></pre>) : value


    return (
        <div style={{paddingTop: '5px'}} >
            <Card >
                <CardHeader title={title}
                            titleStyle={{fontWeight: 'bold'}}
                            subtitle={scope}
                            avatar={avatar}
                            style={{paddingBottom: '10px'}}
                            children={additionalCardInfo}
                />

                <CardText style={{paddingTop: '0px', paddingBottom: '0px'}}>
                    <List>
                        {properties.map((p, key) =>
                            <ListItem key={key} style={{paddingTop: '0px', paddingBottom: '14px'}}
                                      disabled={true} className="text-overflow"
                                      primaryText={primaryText(p.key, p.property)}
                                        secondaryText={p.key}/>)}
                    </List>
                </CardText>
                <CardActions>
                    <Link to={'/resources/' + resource.id} className="element-list-item"
                          activeClassName='element-list-item-active'>View</Link>
                </CardActions>
            </Card>
        </div>
    )
}


