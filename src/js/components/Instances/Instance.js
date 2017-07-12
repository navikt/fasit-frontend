import React, {Component} from "react"
import {connect} from "react-redux"
import {FormString, FormLink} from "../common/Forms"
import {oldRevision} from '../../utils/'
import InstanceResources from "./InstanceResources"
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {styles} from '../../commonStyles/commonInlineStyles'
import {Link} from 'react-router'
import Avatar from 'material-ui/Avatar'
import LinkIcon from 'material-ui/svg-icons/content/link'
import ChangeHistory from 'material-ui/svg-icons/action/change-history'
import Manifest from "./Manifest"
import {CollapsibleMenu, CollapsibleMenuItem, CollapsibleList, CollapsibleListItem, RevisionsView, CurrentRevision, } from "../common/"
import {
    fetchInstance
} from "../../actionCreators/instance"

class Instance extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayClusters: true,
            displayNodes: false,
            displayInstances: false
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

    render() {
        const {instance, revisions, query, id} = this.props
        const showRevision = oldRevision(revisions, query.revision)
        const clusterName = instance.cluster ? instance.cluster.name : ""

        return (
            <div className="row">
                {showRevision ?
                    <CurrentRevision revisionId={query.revision} revisions={revisions}/> : null}
                <div className="col-xs-12" style={{height: 30 + "px"}}></div>
                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"}>
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

                {/*<CollapsibleMenu>
                 {instance.selftesturls && instance.selftesturls.length > 0  &&
                 <List>
                 <ListItem primaryText="Selftest links"  initiallyOpen={true} primaryTogglesNestedList={true} nestedItems={instance.selftesturls.map(
                 selftest => {
                 console.log("dada", selftest); return <ListItem key={selftest} primaryText={selftest.split("/")[2]}/>})}/>
                 </List>}
'
                 <CollapsibleMenuItem label="History" defaultExpanded={true}>
                 <RevisionsView id={id} currentRevision={query.revision} component="instance"/>
                 </CollapsibleMenuItem>
                 </CollapsibleMenu>*/}
                <div className="col-md-5">
                    {instance.selftesturls && <CollapsibleList
                     primaryText="Selftest links"
                     leftIcon={<LinkIcon/>}
                     initiallyOpen={false}
                     nestedItems={instance.selftesturls
                         .map((selftest, idx) => <CollapsibleListItem
                             key={idx}
                             primaryText={<a href={selftest} target="_blank">{selftest.split("/")[2]}</a>}
                             />
                    )} />
               }
               <CollapsibleList primaryText="History"
                                initiallyOpen={true}
                                leftIcon={<ChangeHistory/>}
                                nestedItems={<RevisionsView key={id} id={id} currentRevision={query.revision} component="instance"/>}/>
                </div>
                    {/*instance.selftesturls && instance.selftesturls.length > 0  && <List>
                        <ListItem primaryText="Selftest links"  initiallyOpen={true} primaryTogglesNestedList={true} nestedItems={instance.selftesturls.map(
                            selftest => <ListItem key={selftest} primaryText={selftest.split("/")[2]}/>)}/>
                    </List>*/}
                {/*<List>
                        <ListItem primaryText="History" initiallyOpen={true} primaryTogglesNestedList={true}
                                  nestedItems={[<ListItem key="1" children={<RevisionsView key={id} id={id}
                                                                                           currentRevision={query.revision}
                                                                                           component="instance"/>}/>]}/>
                    </List>
                </div>*/}
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className={this.state.displayClusters ? "active" : ""}><a
                            onClick={() => this.selectTab("used")}>Used
                            resources</a></li>
                        <li className={this.state.displayNodes ? "active" : ""}><a
                            onClick={() => this.selectTab("exposed")}>Exposed
                            resources</a></li>
                        <li className={this.state.displayInstances ? "active" : ""}><a
                            onClick={() => this.selectTab("manifest")}>Manifest</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {this.state.displayClusters ? <InstanceResources items={instance.usedresources}/> : ''}
                    {this.state.displayNodes ? <InstanceResources items={instance.exposedresources}/> : ''}
                    {this.state.displayInstances ? <Manifest /> : ''}
                </div>
            </div>
        )
    }

    selectTab(tab) {
        switch (tab) {
            case "used":
                this.setState({
                        displayClusters: true,
                        displayNodes: false,
                        displayInstances: false
                    }
                )
                return
            case "exposed":
                return this.setState({
                        displayClusters: false,
                        displayNodes: true,
                        displayInstances: false
                    }
                )
            case "manifest":
                return this.setState({
                        displayClusters: false,
                        displayNodes: false,
                        displayInstances: true
                    }
                )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        instance: state.instance_fasit.data,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
        config: state.configuration,
        id: ownProps.id,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

export default connect(mapStateToProps)(Instance)
