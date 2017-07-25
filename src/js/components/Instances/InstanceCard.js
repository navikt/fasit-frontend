import React from "react";
import {LifecycleStatus} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory, Link} from "react-router";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import {Tab, Tabs} from "material-ui/Tabs";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import moment from "moment";
import {capitalize} from "../../utils/";

export default function InstanceCard(props) {
    moment.locale("en")
    const instance =  props.instance
    const avatar = icons.instance
    const id = instance.id
    const environment = instance.environment
    const usedResources = instance.usedresources
    const exposedResources = instance.exposedresources
    const hasUsedResources = usedResources.length > 0
    const cluster = instance.cluster
    const additionalCardInfo = (<div className="pull-right">
        <div className="text-muted">Changed {moment(instance.updated).fromNow()}</div>
        <br/>
        <LifecycleStatus status={instance.lifecycle.status}/>
    </div>)

    return (
        <div style={styles.cardPadding} >
            <Card expandable={hasUsedResources} initiallyExpanded={false}>
                <CardHeader title={`${instance.application} ${instance.version}`}
                            titleStyle={styles.bold}
                            subtitle={environment}
                            showExpandableButton={false}
                            actAsExpander={true}
                            avatar={avatar}
                            children={additionalCardInfo}
                />
                <CardText expandable={true} actAsExpander={false}>
                <Tabs tabItemContainerStyle={styles.tabItem} inkBarStyle={styles.inkBar}>
                    <Tab label={`Used resources ${usedResources.length}`} disableTouchRipple={true} >
                      <ResourceTable resources={usedResources} />
                    </Tab>
                    <Tab label={`Exposed resources ${exposedResources.length}` } disableTouchRipple={true} disabled={exposedResources.length === 0}>
                        <ResourceTable resources={exposedResources}/>
                    </Tab>
                </Tabs>
                </CardText>
                <CardActions>
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

function ResourceTable(props) {
    const {resources} = props
    return (
        <Table>
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Type</TableHeaderColumn>
                    <TableHeaderColumn>Alias</TableHeaderColumn>
                    <TableHeaderColumn>Last change</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {resources
                    .map((resource) => {
                        return (
                            <TableRow key={resource.id} >
                                <TableRowColumn style={styles.tableCellPadding}
                                                className={"col-sm-3"}>
                                    {capitalize(resource.type)}
                                </TableRowColumn>
                                <TableRowColumn style={styles.tableCellPadding} className="text-overflow">
                                    <Link to={`/resources/${resource.id}?revision=${resource.revision}`}>{resource.alias}</Link>
                                </TableRowColumn>
                                <TableRowColumn style={styles.tableCellPadding} className="text-overflow">
                                    {moment(resource.lastchange).fromNow()} by {resource.lastupdateby}
                                </TableRowColumn>
                            </TableRow>)
                    })}
            </TableBody>
        </Table>
    )
}