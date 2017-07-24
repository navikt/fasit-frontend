import React from "react";
import {LifecycleStatus} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory} from "react-router";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {List, ListItem} from "material-ui/List";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import moment from "moment";
import {capitalize} from "../../utils/";

export default function NodeCard(props) {
    moment.locale("en")
    const node =  props.node
    const avatar = icons.node
    const environment = node.environment
    const cluster = node.cluster

    const additionalCardInfo = (<div className="pull-right">
        <div className="text-muted">Changed {moment(node.updated).fromNow()}</div>
        <br/>
        <LifecycleStatus status={node.lifecycle.status}/>
    </div>)

    return (
        <div style={styles.cardPadding} >
            <Card>
                <CardHeader title={`${node.hostname}`}
                            titleStyle={styles.bold}
                            subtitle={`${node.environment} ${capitalize(node.type)}`}
                            avatar={avatar}
                            children={additionalCardInfo}
                            actAsExpander={true}
                />
                <CardText expandable={true} actAsExpander={false}>
                    <List>
                        {node.applications
                            .map(application => <ListItem key={application}
                                primaryText={application}
                                onTouchTap={() => browserHistory.push(`/applications/${application}`)}></ListItem>
                        )}
                    </List>

                </CardText>
                <CardActions>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => browserHistory.push(`/nodes/${node.hostname}`)}
                        label="manage"
                        style={styles.flatButton}/>
                    {cluster.name && <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => browserHistory.push(`environments/${environment}/clusters/${cluster.name}`)}
                        label="cluster"
                        style={styles.flatButton}/>}
                </CardActions>
            </Card>
        </div>
    )
}