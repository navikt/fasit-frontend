import React from "react";
import {CardInfo} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory, Link} from "react-router";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import SortableResourceTable from "../Resources/SortableResourcesTable";
import {Tab, Tabs} from "material-ui/Tabs";
import {icons, styles} from "../../commonStyles/commonInlineStyles";

export default function InstanceCard(props) {


    const instance = props.instance
    const avatar = icons.instance
    const id = instance.id
    const environment = instance.environment
    const usedResources = instance.usedresources
    const exposedResources = instance.exposedresources

    const hasUsedResources = usedResources.length > 0
    const cluster = instance.cluster
    const additionalCardInfo = (<CardInfo lastUpdated={instance.updated} lifecycle={instance.lifecycle}/>)

    return (
        <div style={styles.cardPadding}>
            <Card expandable={hasUsedResources} initiallyExpanded={false}>
                <CardHeader title={<Link to={`/instances/` + id}>{`${instance.application} ${instance.version}`}</Link>}
                            subtitle={environment}
                            showExpandableButton={false}
                            actAsExpander={true}
                            avatar={avatar}
                            children={additionalCardInfo}
                />
                <CardText expandable={true} actAsExpander={false}>
                    <Tabs tabItemContainerStyle={styles.tabItem} inkBarStyle={styles.inkBar}>
                        <Tab label={`Used resources ${usedResources.length}`} disableTouchRipple={true}>
                            <SortableResourceTable resources={usedResources}/>
                        </Tab>
                        <Tab label={`Exposed resources ${exposedResources.length}` } disableTouchRipple={true}
                             disabled={exposedResources.length === 0}>
                            <SortableResourceTable resources={exposedResources}/>
                        </Tab>
                    </Tabs>
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => browserHistory.push('/instances/' + id)}
                        label="details"
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

