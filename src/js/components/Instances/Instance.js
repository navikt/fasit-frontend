import React, {Component} from "react";
import {connect} from "react-redux";
import {Tab, Tabs} from "material-ui/Tabs";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import {Link} from "react-router";
import Manifest from "./Manifest";
import {CollapsibleList, CurrentRevision, History} from "../common/";
import {Card, CardText, CardHeader} from "material-ui/Card"
import {List, ListItem} from "material-ui/List"
import SortableResourceTable from "../Resources/SortableResourcesTable";
import {fetchInstance} from "../../actionCreators/instance";

class Instance extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, id, query} = this.props
        dispatch(fetchInstance(id, query.revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, id, query} = this.props
        // Fetch data from backend if revision changes
        if (nextProps.query.revision != query.revision) {
            dispatch(fetchInstance(id, nextProps.query.revision))
        }
        // Fetch data from backend if id changes
        if (nextProps.id != id) {
            dispatch(fetchInstance(nextProps.id, nextProps.query.revision))
        }
    }

    render() {
        const {instance, revisions, query, id} = this.props
        const clusterName = instance.cluster ? instance.cluster.name : ""

        return (
            <div className="row">
                <div className="col-md-8" style={styles.cardPadding}>
                    <CurrentRevision revisionId={query.revision} revisions={revisions}/>

                    <Card>
                        <CardHeader
                            avatar={icons.instance}
                            titleStyle={styles.bold}
                            title={<Link to={`/application/${instance.application}`}>{instance.application}</Link>}
                            style={styles.paddingBottom0}
                            subtitle={instance.version}
                        />
                        <CardText>
                            <List>
                                <ListItem
                                    key='environment'
                                    disabled={true}
                                    primaryText={<Link
                                        to={`/environment/${instance.environment}`}>{instance.environment}</Link>}
                                    secondaryText="Environment"
                                />
                                <ListItem
                                    key="cluster"
                                    disabled={true}
                                    primaryText={<Link
                                        to={`/environments/${instance.environment}/clusters/${clusterName}`}>{clusterName}</Link>}
                                    secondaryText="Cluster"
                                />
                            </List>
                        </CardText>

                    </Card>
                </div>

                <div className="col-md-4">
                    {instance.selftesturls && <CollapsibleList
                        primaryText="Selftests"
                        leftAvatar={icons.linkAvatar}
                        initiallyOpen={true}
                        nestedItems={<SelfTestLinks key={id} links={instance.selftesturls}/>}/>}
                    <History id={id} revision={query.revision} component="instance"/>
                </div>

                {instance.usedresources && <div className="row col-md-10">
                    <Tabs tabItemContainerStyle={styles.tabItem} inkBarStyle={styles.inkBar}>
                        <Tab
                            label={`Used resources ${instance.usedresources.length}`}
                            disableTouchRipple={true}>
                            <SortableResourceTable resources={instance.usedresources}/>
                        </Tab>
                        <Tab
                            label={`Exposed resources ${instance.exposedresources.length}`}
                            disableTouchRipple={true}
                            disabled={instance.exposedresources.length === 0}>
                            <SortableResourceTable resources={instance.exposedresources}/>
                        </Tab>
                        <Tab
                            label="Manifest"
                            disableTouchRipple={true}>
                            <Manifest/>
                        </Tab>
                    </Tabs>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        instance: state.instance_fasit.data,
        user: state.user,
        config: state.configuration,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

function SelfTestLinks(props) {
    return (<ul key="1" className="revisionList">
        {props.links.sort()
            .map(link =>
                <li key={link}>
                    <a href={link} className="revisionListItem" target="_blank">{link.split("/")[2]}</a>
                </li>)}
    </ul>)
}

export default connect(mapStateToProps)(Instance)
