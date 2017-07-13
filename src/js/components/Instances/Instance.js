import React, {Component} from "react"
import {connect} from "react-redux"
import {FormString, FormLink} from "../common/Forms"
import {oldRevision} from '../../utils/'
import InstanceResources from "./InstanceResources"
import {icons} from '../../commonStyles/commonInlineStyles'
import Manifest from "./Manifest"
import {CollapsibleList, CurrentRevision, History} from "../common/"
import {
    fetchInstance
} from "../../actionCreators/instance"

class Instance extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usedResources: true,
            exposedResources: false,
            displayManifest: false
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

                <div className="col-md-4">
                    {instance.selftesturls && <CollapsibleList
                     primaryText="Selftests"
                     leftAvatar={icons.linkAvatar}
                     initiallyOpen={false}
                     nestedItems={<SelfTestLinks key={id} links={instance.selftesturls}/>}/>}
            <History id={id} revision={query.revision} component="instance"/>
                </div>
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className={this.state.usedResources ? "active" : ""}><a
                            onClick={() => this.selectTab("used")}>Used
                            resources</a></li>
                        <li className={this.state.exposedResources ? "active" : ""}><a
                            onClick={() => this.selectTab("exposed")}>Exposed
                            resources</a></li>
                        <li className={this.state.displayManifest ? "active" : ""}><a
                            onClick={() => this.selectTab("manifest")}>Manifest</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {this.state.usedResources ? <InstanceResources items={instance.usedresources}/> : ''}
                    {this.state.exposedResources ? <InstanceResources items={instance.exposedresources}/> : ''}
                    {this.state.displayManifest ? <Manifest /> : ''}
                </div>
            </div>
        )
    }

    selectTab(tab) {
        switch (tab) {
            case "used":
                this.setState({
                        usedResources: true,
                        exposedResources: false,
                        displayManifest: false
                    }
                )
                return
            case "exposed":
                return this.setState({
                        usedResources: false,
                        exposedResources: true,
                        displayManifest: false
                    }
                )
            case "manifest":
                return this.setState({
                        usedResources: false,
                        exposedResources: false,
                        displayManifest: true
                    }
                )
        }
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
        {props.links
            .map(link =>
                <li key={link}>
                    <a href={link} className="revisionListItem" target="_blank">{link.split("/")[2]}</a>
                </li>)}
    </ul>)
}

export default connect(mapStateToProps)(Instance)
