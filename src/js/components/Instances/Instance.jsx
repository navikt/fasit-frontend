import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { parseQuery } from "../../utils/queryParser";
import { Tabs, Tab } from "@mui/material";
import { icons, styles } from "../../commonStyles/commonInlineStyles";
import { Link } from "react-router-dom";
import Manifest from "./Manifest";
import { CollapsibleList, CurrentRevision, History, Lifecycle } from "../common/";
import NotFound from "../NotFound";
import { Card, CardHeader, CardContent, List, ListItem, ListItemText } from "@mui/material";
import SortableResourceTable from "../Resources/SortableResourcesTable";
import { fetchInstance } from "../../actionCreators/instance";
import { validAuthorization } from "../../utils/";

function Instance({ instance, revisions, query, id, user, dispatch, requestFailed }) {
    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        dispatch(fetchInstance(id, query.revision))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(fetchInstance(id, query.revision))
    }, [id, query.revision]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue)
    }

    const clusterName = instance.cluster ? instance.cluster.name : ""
    let lifecycle = {}
    let authorized = false

    if (requestFailed) {
        if (requestFailed.startsWith("404")) {
            return <NotFound />
        }
        return (
            <div>
                Retrieving instance {id} failed with the following message:
                <br />
                <pre><i>{requestFailed}</i></pre>
            </div>
        )
    }

    if (Object.keys(instance).length > 0) {
        let accesscontrol = instance.accesscontrol.adgroups
        if (!accesscontrol) accesscontrol = ({...instance.accesscontrol, "adgroups": {}})
        authorized = validAuthorization(user, accesscontrol)
        lifecycle = instance.lifecycle
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <CurrentRevision revisionId={query.revision} revisions={revisions}/>
                <Card style={styles.cardPadding}>
                    <CardHeader
                        avatar={icons.instance}
                        slotProps={{title: {style: styles.bold}}}
                        title={<Link to={`/applications/${instance.application}`}>{`${instance.application}`}</Link>}
                        style={styles.paddingBottom0}
                        subheader={`${instance.application}:${instance.version}`}
                    />
                    <CardContent>
                        <div>
                            <div>
                                <List>
                                    <ListItem
                                        key='environment'
                                    >
                                        <ListItemText
                                            primary={<Link
                                                to={`/environments/${instance.environment}`}>{instance.environment}</Link>}
                                            secondary="Environment"
                                        />
                                    </ListItem>
                                    <ListItem
                                        key="cluster"
                                    >
                                        <ListItemText
                                            primary={<Link
                                                to={`/environments/${instance.environment}/clusters/${clusterName}`}>{clusterName}</Link>}
                                            secondary="Cluster"
                                        />
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Lifecycle lifecycle={lifecycle}/>
                <Card style={styles.cardPadding}>
                    <CardContent>
                        {instance.usedresources &&
                        <div>
                            <Tabs 
                                value={tabIndex}
                                onChange={handleTabChange}
                                style={styles.tabItem}
                                variant="fullWidth"
                                role="navigation"
                                sx={{
                                    '.MuiTab-root': { color: 'rgba(255, 255, 255, 0.5)' },
                                    '.MuiTab-root.Mui-selected': { color: '#ffffff' }
                                }}>
                                <Tab
                                    label={`Used resources ${instance.usedresources.length}`}
                                    disableRipple />
                                <Tab
                                    label={`Exposed resources ${instance.exposedresources.length}`}
                                    disableRipple
                                    disabled={instance.exposedresources.length === 0} />
                                <Tab
                                    label="Manifest"
                                    disableRipple />
                            </Tabs>
                            {tabIndex === 0 && <SortableResourceTable resources={instance.usedresources} instanceLastChanged={instance.updated}/>}
                            {tabIndex === 1 && <SortableResourceTable resources={instance.exposedresources}/>}
                            {tabIndex === 2 && <Manifest/>}
                        </div>
                        }

                    </CardContent>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        instance: state.instance_fasit.data,
        requestFailed: state.instance_fasit.requestFailed,
        user: state.user,
        config: state.configuration,
        revisions: state.revisions,
        query: parseQuery(state.router.location.search)
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
