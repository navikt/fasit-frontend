import React, {Component} from "react";
import {connect} from "react-redux";
import {validAuthorization, oldRevision} from "../../utils/";
import {fetchFasitData, fetchNodePassword, clearNodePassword} from "../../actionCreators/node";
import {
    AccessControl,
    CurrentRevision,
    CollapsibleList,
    FormString,
    FormLink,
    FormDropDown,
    FormSecret,
    Lifecycle,
    RescueElementForm,
    Security,
    History,
    SubmitForm,
    ToolButtons,
    DeleteElementForm
} from "../common/";
import {submitForm} from "../../actionCreators/common";
import NodeEventsView from "./NodeEventsView";
import NodeGraph from "./NodeGraph";
import NodeSeraView from "./NodeSeraView";
import {icons} from "../../commonStyles/commonInlineStyles";

class Node extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayRevisions: false,
            displaySecurity: false,
            displayEvents: false,
            displayPhysical: false,
            displayGraphs: false,
            secretVisible: false,
            displaySubmitForm: false,
            displayDeleteForm: false,
            displayRescueForm: false,
            displayAccessControlForm: false,
            adgroups: [],
            editMode: false,
            comment: ""
        }
    }

    componentDidMount() {
        const {dispatch, hostname, query} = this.props
        dispatch(fetchFasitData(hostname, query.revision))
    }

    componentWillUnmount() {
        this.props.dispatch(clearNodePassword())
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, hostname, query} = this.props
        this.setState({
            hostname: nextProps.fasit.data.hostname,
            username: nextProps.fasit.data.username,
            type: nextProps.fasit.data.type,
            password: nextProps.fasit.currentPassword,
            comment: ""
        })
        if (Object.keys(nextProps.fasit.data).length > 0) {
            this.setState({adgroups: nextProps.fasit.data.accesscontrol.adgroups})
        }

        if (nextProps.query.revision != query.revision) {
            dispatch(fetchFasitData(hostname, nextProps.query.revision))
        }

        // fetch new data from backend if hostname changes
        if (nextProps.hostname != hostname) {
            dispatch(fetchFasitData(nextProps.hostname, nextProps.revision))
        }
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props
        if (component == "node" && this.state.displaySubmitForm) {
            this.toggleComponentDisplay("displaySubmitForm")
            this.toggleComponentDisplay("editMode")
        } else if (component === "deleteNode") {
            this.toggleComponentDisplay("displayDeleteForm")
            this.setState({comment: ""})
        } else if (component === "node" && this.state.displayAccessControlForm) {
            this.toggleComponentDisplay("displayAccessControlForm")
        } else if (component === "node" && this.state.displayRescueForm) {
            this.toggleComponentDisplay("displayRescueForm")
        }
        dispatch(submitForm(key, form, comment, component))
    }

    resetLocalState() {
        const {fasit} = this.props
        this.setState({
            hostname: fasit.data.hostname,
            username: fasit.data.username,
            type: fasit.data.type,
            password: "",
            adgroups: [],
            comment: "",
        })
    }

    toggleDisplaySecret() {
        const {dispatch} = this.props
        if (!this.state.secretVisible)
            dispatch(fetchNodePassword())
        dispatch(clearNodePassword())
        this.setState({secretVisible: !this.state.secretVisible})
    }

    toggleComponentDisplay(component) {
        const {dispatch} = this.props
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode)
            this.resetLocalState()
        if (component === "editMode" && !this.state.editMode)
            dispatch(fetchNodePassword())
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    render() {
        const {hostname, config, user, fasit, nodeTypes, query, revisions} = this.props
        const {comment, editMode, username, password, type, adgroups} = this.state
        const showRevision = oldRevision(revisions, query.revision)

        let lifecycle = (Object.keys(fasit.data).length > 0) ? fasit.data.lifecycle : {}
        let authorized = (Object.keys(fasit.data).length > 0) ? validAuthorization(user, fasit.data.accesscontrol) : false

        return (
            <div className="row">
                {/*Heading*/}
                {showRevision ? <CurrentRevision revisionId={query.revision} revisions={this.props.revisions}/>
                    : <ToolButtons
                    disabled={!authorized}
                    onEditClick={() => this.toggleComponentDisplay("editMode")}
                    onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onCopyClick={() => console.log("Copy,copycopy!")}
                    editMode={this.state.editMode}
                    />
                }

                {/*Form*/}
                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    <FormString
                        label="hostname"
                        editMode={editMode}
                        value={this.state.hostname}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="username"
                        editMode={editMode}
                        value={username}
                        handleChange={this.handleChange.bind(this)}
                    />

                    <FormSecret
                        label="password"
                        editMode={editMode}
                        value={password}
                        handleChange={this.handleChange.bind(this)}
                        authorized={authorized}
                        toggleDisplaySecret={this.toggleDisplaySecret.bind(this)}
                    />

                    <FormDropDown
                        label="type"
                        editMode={editMode}
                        value={type}
                        handleChange={this.handleChange.bind(this)}
                        options={nodeTypes}
                    />
                    <FormString
                        label="env.class"
                        value={fasit.data.environmentclass}
                    />
                    <FormString
                        label="environment"
                        value={fasit.data.environment}
                    />
                    {fasit.data.cluster ?
                        <FormLink
                            label="cluster"
                            value={fasit.data.cluster.name}
                            linkTo={`/environments/${fasit.data.environment}/clusters/${fasit.data.cluster.name}`}
                        /> :
                        <FormString label="Cluster" value="Orphaned node" />}


                    {/*Submit / Cancel buttons*/}
                    <br />
                    {editMode ?
                        <div className="btn-block">
                            <button type="submit" className="btn btn-sm btn-primary pull-right"
                                    onClick={() => this.toggleComponentDisplay("displaySubmitForm")}>Submit
                            </button>
                            <button type="reset" className="btn btn-sm btn-default btn-space pull-right"
                                    onClick={() => this.toggleComponentDisplay("editMode")}>Cancel
                            </button>
                        </div>
                        : ""
                    }

                    {/*Lifecycle*/}
                    <div className="row">
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => this.toggleComponentDisplay("displayRescueForm")}
                                   authorized={authorized}/>
                    </div>
                </div>

                {/*Side menu*/}
                <div className="col-md-4">
                    <History id={hostname} currentRevision={query.revision} component="node"/>
                    <Security accesscontrol={fasit.data.accesscontrol}
                              displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                    <CollapsibleList
                        primaryText="Sensu status"
                        leftAvatar={icons.sensuStatusAvatar}
                        initiallyOpen={false}
                        nestedItems={<NodeEventsView key={hostname}/>}/>
                    <CollapsibleList
                        primaryText="Hardware"
                        leftAvatar={icons.hardwareAvatar}
                        initiallyOpen={false}
                        nestedItems={<NodeSeraView key={hostname} hostname={hostname}/>}/>
                    <CollapsibleList
                        primaryText="Grafana graph"
                        leftAvatar={icons.grafanaAvatar}
                        initiallyOpen={false}
                        nestedItems={<NodeGraph key={hostname} url={config.grafana} hostname={hostname}/>}/>
                </div>

                {/* Misc. modals*/}
                <AccessControl
                    displayAccessControlForm={this.state.displayAccessControlForm}
                    onClose={() => this.toggleComponentDisplay("displayAccessControlForm")}
                    onSubmit={() => this.handleSubmitForm(hostname, {
                            hostname: fasit.data.hostname,
                            username: fasit.data.username,
                            type: fasit.data.type,
                            environment: fasit.data.environment,
                            environmentclass: fasit.data.environmentclass,
                            accesscontrol: {adgroups}
                        }
                        , comment, "node")}
                    id={hostname}
                    value={adgroups}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}
                />
                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onSubmit={() => this.handleSubmitForm(hostname, null, comment, "deleteNode")}
                    hostname={hostname}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}

                />
                <RescueElementForm
                    displayRescueForm={this.state.displayRescueForm}
                    onClose={() => this.toggleComponentDisplay("displayRescueForm")}
                    onSubmit={() => this.handleSubmitForm(hostname, {
                            hostname: fasit.data.hostname,
                            username: fasit.data.username,
                            type: fasit.data.type,
                            environment: fasit.data.environment,
                            environmentclass: fasit.data.environmentclass,
                            lifecycle: {status: "rescued"}
                        }
                        , comment, "node")}
                    id={hostname}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}

                />
                <SubmitForm
                    display={this.state.displaySubmitForm}
                    component="node"
                    onSubmit={(key, form, comment, component) => this.handleSubmitForm(key, form, comment, component)}
                    onClose={() => this.toggleComponentDisplay("displaySubmitForm")}
                    newValues={{
                        hostname: this.state.hostname,
                        password: this.state.password,
                        username: this.state.username,
                        type: this.state.type,

                    }}
                    originalValues={{
                        hostname: fasit.data.hostname,
                        username: fasit.data.username,
                        type: fasit.data.type,
                        password: fasit.currentPassword,
                    }}
                    additionalValues={{
                        environment: fasit.data.environment,
                        environmentclass: fasit.data.environmentclass,
                    }}
                />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        fasit: state.node_fasit,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
        config: state.configuration,
        nodeTypes: state.nodes.nodeTypes,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

export default connect(mapStateToProps)(Node)
