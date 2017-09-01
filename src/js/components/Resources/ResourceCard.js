import React from "react";
import {getResourceTypeName, resourceTypeIcon} from "../../utils/resourceTypes";
import {CardInfo, WebsphereManagementConsole} from "../common/";
import {List, ListItem} from "material-ui/List";
import FlatButton from "material-ui/FlatButton";
import {Link, browserHistory} from "react-router";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {styles} from "../../commonStyles/commonInlineStyles";
import {capitalize} from "../../utils/";

export  default  function ResourceCard(props) {
    const resource = props.resource
    const avatar = resourceTypeIcon(resource.type)
    const title = `${getResourceTypeName(resource.type)} - ${resource.alias}`
    const scope = Object.keys(resource.scope).map(k => `${resource.scope[k]}`).join(' | ')

    const properties = Object.keys(resource.properties).map(k => ({
        key: capitalize(k),
        property: resource.properties[k]
    }))

    const additionalCardInfo = (<CardInfo lastUpdated={resource.updated} lifecycle={resource.lifecycle}/>)

    const primaryText = (key, value) => key === 'ApplicationProperties' ? (<pre><code>{value}</code></pre>) : value

    return (
        <div style={styles.paddingTop5}>
            <Card>
                <CardHeader title={<Link to={`resources/${resource.id}`}>{title}</Link>}
                            subtitle={scope}
                            avatar={avatar}
                            style={{paddingBottom: '10px'}}
                            children={additionalCardInfo}
                            actAsExpander={true}
                />

                <CardText style={{paddingTop: '0px', paddingBottom: '0px'}} expandable={true}>
                    <List>
                        {properties.map((p, key) =>
                            <ListItem key={key} style={{paddingTop: '0px', paddingBottom: '14px'}}
                                      disabled={true} className="text-overflow"
                                      primaryText={primaryText(p.key, p.property)}
                                      secondaryText={p.key}/>)}
                    </List>
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => browserHistory.push(`resources/${resource.id}`)}
                        label="manage"
                        style={styles.flatButton}/>
                    {resource.type.toLowerCase() === 'deploymentmanager'
                    && (<WebsphereManagementConsole hostname={resource.properties.hostname}/>)}
                </CardActions>
            </Card>
        </div>
    )
}


