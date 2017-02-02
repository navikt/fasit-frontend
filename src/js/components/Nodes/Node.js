import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils/'
import {
    fetchFasitData,
    rescueNode,
    fetchNodePassword,
    clearNodePassword,
} from '../../actionCreators/node'

import classString from 'react-classset'
import {FormString, FormList, FormSecret} from '../common/Forms'
import {CollapsibleMenu, CollapsibleMenuItem, Lifecycle, RevisionsView, SubmitForm} from '../common/'
import {submitForm} from '../../actionCreators/common'
import NodeTypeImage from './NodeTypeImage'
import NodeEventsView from './NodeEventsView'
import NodeGraph from './NodeGraph'
import NodeSecurityView from './NodeSecurityView'
import NodeSeraView from './NodeSeraView'
import DeleteNodeForm from './DeleteNodeForm'

class Node extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayRevisions: false,
            displaySecurity: false,
            displayEvents: false,
            displayPhysical: false,
            displayGraphs: false,
            displaySecret: false,
            displaySubmitForm: false,
            displayDeleteNode: false,
            editMode: false,
            comment: ""
        }
    }

    componentDidMount() {
        const {dispatch, hostname, revision} = this.props
        dispatch(fetchFasitData(hostname, revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, hostname, query} = this.props
        this.setState({
            hostname: nextProps.fasit.data.hostname,
            username: nextProps.fasit.data.username,
            type: nextProps.fasit.data.type,
            password: nextProps.fasit.currentPassword,
            comment:""
        })
        if (nextProps.query.revision != query.revision){
            dispatch(fetchFasitData(hostname, nextProps.query.revision))
        }
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props
        if (component == "node") {
            this.toggleComponentDisplay("displaySubmitForm")
            this.toggleComponentDisplay("editMode")
        } else if (component === "deleteNode"){
            this.toggleComponentDisplay("displayDeleteNode")
            this.setState({comment:""})
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
            comment: "",
        })
    }

    toggleDisplaySecret() {
        const {dispatch} = this.props
        if (this.state.displaySecret)
            dispatch(fetchNodePassword())
        dispatch(clearNodePassword())
        this.setState({displaySecret: !this.state.displaySecret})
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


    buttonClasses(authenticated, edit) {
        return classString({
            "btn": true,
            "btn-link": true,
            "topnav-button": true,
            "topnav-button-active": this.state.editMode && edit,
            "disabled": !authenticated
        })
    }

    render() {
        const {hostname, config, user, fasit, dispatch, nodeTypes, revisions} = this.props
        const {comment} = this.state
        let authenticated = false
        let lifecycle = {}
        if (Object.keys(fasit.data).length > 0) {
            authenticated = checkAuthentication(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }
        return (
            <div className="row">
                <div className="col-xs-12 row main-data-container">

                    {/*Heading*/}
                    <div className="col-sm-1 hidden-xs">
                        <NodeTypeImage type={fasit.data.type}/>
                    </div>
                    <div className="col-sm-3 hidden-xs FormLabel main-data-title text-overflow">
                        <strong>{hostname} {/*(fasit.data.revision != revisions.data[0].revision)? "(Old shit)" : ""*/}</strong></div>

                    <div className="col-sm-2 nopadding">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated, "edit")}
                                        onClick={authenticated ? () => this.toggleComponentDisplay("editMode") : () => {
                                            }}
                                >
                                    <i className="fa fa-wrench fa-2x"/>
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated)}
                                        onClick={authenticated ? () => this.toggleComponentDisplay("displayDeleteNode") : () => {
                                            }}
                                >
                                    <i className="fa fa-trash fa-2x"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/*Form*/}
                <div className="col-md-6">
                    <FormString
                        label="hostname"
                        editMode={this.state.editMode}
                        value={this.state.hostname}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="username"
                        editMode={this.state.editMode}
                        value={this.state.username}
                        handleChange={this.handleChange.bind(this)}
                    />

                    <FormSecret
                        label="password"
                        editMode={this.state.editMode}
                        value={this.state.password}
                        handleChange={this.handleChange.bind(this)}
                        authenticated={user.authenticated}
                        toggleDisplaySecret={this.toggleDisplaySecret.bind(this)}
                    />

                    <FormList
                        label="type"
                        editMode={this.state.editMode}
                        value={this.state.type}
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
                    <FormString
                        label="cluster"
                        value={fasit.data.cluster ? fasit.data.cluster.name : "Orphaned node"}
                    />

                    {/*Submit / Cancel buttons*/}
                    <br />
                    {this.state.editMode ?
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
                                   rescueAction={() => dispatch(rescueNode(hostname))}/>
                    </div>
                </div>

                {/*Side menu*/}

                <CollapsibleMenu>
                    <CollapsibleMenuItem label="Revisions">
                        <RevisionsView hostname={hostname} type="node"/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Security">
                        <NodeSecurityView authenticated={authenticated}
                                          requirements={fasit.data.accesscontrol}/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Events">
                        <NodeEventsView />
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Physical">
                        <NodeSeraView hostname={hostname}/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Graphs">
                        <NodeGraph url={config.grafana} hostname={hostname}/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>

                {/* Misc. modals*/}
                <DeleteNodeForm
                    displayDeleteNode={this.state.displayDeleteNode}
                    onClose={() => this.toggleComponentDisplay("displayDeleteNode")}
                    onSubmit={() => this.handleSubmitForm(hostname, null, comment, "deleteNode")}
                    hostname={hostname}
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
                        environmentclass: fasit.data.environmentclass
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
