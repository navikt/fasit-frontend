import React from "react";
import {CardInfo} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory, Link} from "react-router";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {List, ListItem} from "material-ui/List";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import {capitalize} from "../../utils/";

export default function NodeCard(props) {
    const node = props.node
    const avatar = icons.node
    const environment = node.environment
    const cluster = node.cluster

    const additionalCardInfo = (<CardInfo lastUpdated={node.updated} lifecycle={node.lifecycle}/>)

    return (
        <div style={styles.cardPadding}>
            <Card>
                <CardHeader title={<Link to={`/nodes/${node.hostname}`}>{node.hostname}</Link>}
                            subtitle={`${node.environment} ${capitalize(node.type)}`}
                            avatar={avatar}
                            children={additionalCardInfo}
                            actAsExpander={true}
                />
                <CardText expandable={true} actAsExpander={false}>
                    <List >
                        <Subheader>Applications</Subheader>
                        <Divider/>
                        {node.applications
                            .map(application => <ListItem key={application}
                                                          primaryText={application}
                                                          onTouchTap={() => browserHistory.push(`/applications/${application}`)}></ListItem>
                            )}
                    </List>

                </CardText>
                <CardActions expandable={true}>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => browserHistory.push(`/nodes/${node.hostname}`)}
                        label="manage"
                        style={styles.flatButton}/>
                    {cluster && <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => browserHistory.push(`environments/${environment}/clusters/${cluster.name}`)}
                        label="cluster"
                        style={styles.flatButton}/>}
                </CardActions>
            </Card>
        </div>
    )
}