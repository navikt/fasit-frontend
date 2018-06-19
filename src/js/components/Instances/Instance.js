import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "material-ui/Tabs";
import { icons, styles } from "../../commonStyles/commonInlineStyles";
import { Link } from "react-router";
import Manifest from "./Manifest";
import { CollapsibleList, CurrentRevision, History, Lifecycle, RescueElementForm } from "../common/";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import SortableResourceTable from "../Resources/SortableResourcesTable";
import { fetchInstance } from "../../actionCreators/instance";
import { validAuthorization } from "../../utils/";
import { rescueElement } from "../../actionCreators/common";

class Instance extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayRescueForm: false,
            comment: ""
        }
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

    toggleComponentDisplay(component) {
        this.setState({[component]: !this.state[component]})
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    rescue() {
        const {dispatch, instance} = this.props
        const {comment} = this.state
        this.toggleComponentDisplay("displayRescueForm")
        dispatch(rescueElement(instance.id, "applicationinstance"))
    }

    render() {
        const {instance, revisions, query, id, user} = this.props
        const clusterName = instance.cluster ? instance.cluster.name : ""
        let lifecycle = {}
        let authorized = false

        if (Object.keys(instance).length > 0) {
            let accesscontrol = instance.accesscontrol.adgroups
            if (!accesscontrol) accesscontrol = ({...instance.accesscontrol, "adgroups": {}})
            authorized = validAuthorization(user, accesscontrol)
            lifecycle = instance.lifecycle
        }

        return (
            <div>
                <div className="col-md-9">
                    <CurrentRevision revisionId={query.revision} revisions={revisions}/>
                    <Card style={styles.cardPadding}>
                        <CardHeader
                            avatar={icons.instance}
                            titleStyle={styles.bold}
                            title={<Link to={`/applications/${instance.application}`}>{`${instance.application}`}</Link>}
                            style={styles.paddingBottom0}
                            subtitle={`${instance.application}:${instance.version}`}
                        />
                        <CardText>
                            <div>
                                <div>
                                    <List>
                                        <ListItem
                                            key='environment'
                                            disabled={true}
                                            primaryText={<Link
                                                to={`/environments/${instance.environment}`}>{instance.environment}</Link>}
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
                                </div>
                            </div>
                        </CardText>
                    </Card>
                    <Lifecycle lifecycle={lifecycle}
                               rescueAction={() => this.toggleComponentDisplay("displayRescueForm")}
                               authorized={authorized}/>
                    <Card style={styles.cardPadding}>
                        <CardText>
                            {instance.usedresources &&
                            <Tabs tabItemContainerStyle={styles.tabItem} inkBarStyle={styles.inkBar}>
                                <Tab
                                    label={`Used resources ${instance.usedresources.length}`}
                                    disableTouchRipple={true}>
                                    <SortableResourceTable resources={instance.usedresources} instanceLastChanged={instance.updated}/>
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
                            }

                        </CardText>
                    </Card>

                </div>
                <div className="col-md-3">
                    {instance.selftesturls && <CollapsibleList
                        primaryText="Selftests"
                        leftAvatar={icons.linkAvatar}
                        initiallyOpen={true}
                        nestedItems={<SelfTestLinks key={id} links={instance.selftesturls}/>}/>}
                    <History id={id} revision={query.revision} component="instance"/>
                </div>
                <RescueElementForm
                    displayRescueForm={this.state.displayRescueForm}
                    onClose={() => this.toggleComponentDisplay("displayRescueForm")}
                    onSubmit={() => this.rescue()}
                    id={instance.application}
                    handleChange={this.handleChange.bind(this)}
                />
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
