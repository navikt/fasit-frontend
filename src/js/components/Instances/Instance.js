import React, {Component} from "react";
import {connect} from "react-redux";
import {FormString, FormLink} from "../common/Forms";
import {Tab, Tabs} from "material-ui/Tabs";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import Manifest from "./Manifest";
import {CollapsibleList, CurrentRevision, History} from "../common/";
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
                <CurrentRevision revisionId={query.revision} revisions={revisions}/>
                <div className="col-xs-12" style={{height: 30 + "px"}}></div>
                <div className= "col-md-6">
                    <FormLink
                        label="Application"
                        value={instance.application}
                        linkTo={`/applications/${instance.application}`}/>
                    <FormString
                        label="version"
                        value={instance.version}
                    />
                    <FormLink
                        label="Environment"
                        value={instance.environment}
                        linkTo={`/environments/${instance.environment}`}
                    />
                    <FormLink
                        label="Cluster"
                        value={clusterName}
                        linkTo={`/environments/${instance.environment}/clusters/${clusterName}`}
                    />
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
                            label={`Exposed resources ${instance.exposedresources.length}` }
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
        editMode: state.nodes.showEditNodeForm,
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
