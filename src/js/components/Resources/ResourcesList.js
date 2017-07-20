import React from 'react'
import {getResourceTypeName, resourceTypeIcon} from '../../utils/resourceTypes'
import {LifecycleStatus, WebsphereManagementConsole} from '../common/'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import {browserHistory} from "react-router";
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card'
import {styles}  from '../../commonStyles/commonInlineStyles'
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

function navigateToResource(id) {
    browserHistory.push('/resources/' + id)
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
        <div style={styles.paddingTop5} >
            <Card>
                <CardHeader title={title}
                            titleStyle={styles.bold}
                            subtitle={scope}
                            avatar={avatar}
                            style={{paddingBottom: '10px'}}
                            children={additionalCardInfo}
                            onClick={() => navigateToResource(resource.id)}
                />

                <CardText style={{paddingTop: '0px', paddingBottom: '0px'}} onClick={() => navigateToResource(resource.id)}>
                    <List>
                        {properties.map((p, key) =>
                            <ListItem key={key} style={{paddingTop: '0px', paddingBottom: '14px'}}
                                      disabled={true} className="text-overflow"
                                      primaryText={primaryText(p.key, p.property)}
                                        secondaryText={p.key}/>)}
                    </List>
                </CardText>
                <CardActions>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => navigateToResource(resource.id)}
                        label="manage"
                        style={styles.flatButton}/>
                    {resource.type.toLowerCase() === 'deploymentmanager'
                    && (<WebsphereManagementConsole hostname={resource.properties.hostname}/>)}
                </CardActions>
            </Card>
        </div>
    )
}


