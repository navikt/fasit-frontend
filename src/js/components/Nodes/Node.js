import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils/'
import {fetchFasitData, rescueNode} from '../../actionCreators/node_fasit'
import {showDeleteNodeForm} from '../../actionCreators/node_formActions'

import classString from 'react-classset'
import {FormString, FormList, FormSecret} from '../common/Forms'
import {fetchNodePassword, clearNodePassword} from '../../actionCreators/node_fasit'
import NodeSeraView from './NodeSeraView'
import NodeTypeImage from './NodeTypeImage'
import NodeEventsView from './NodeEventsView'
import NodeGraph from './NodeGraph'
import NodeLifecycle from './NodeLifecycle'
import NodeSecurityView from './NodeSecurityView'
import NodeRevisionsView from './NodeRevisionsView'
import NodeFasitViewPreviewMode from './NodeFasitViewPreviewMode'
import NodeFasitViewEditMode from './NodeFasitViewEditMode'
import NodeFasitViewNewNodeForm from './NodeFasitViewNewNodeForm'
import NodeFasitViewDeleteNodeForm from './NodeFasitViewDeleteNodeForm'
import NodeFasitViewSubmitDeleteStatus from './NodeFasitViewSubmitDeleteStatus'
import NodeFasitViewSubmitNewNodeStatus from './NodeFasitViewSubmitNewNodeStatus'

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
            editMode: false,
        }
    }

    componentDidMount() {
        const {dispatch, hostname} = this.props
        dispatch(fetchFasitData(hostname))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hostname: nextProps.fasit.data.hostname,
            username: nextProps.fasit.data.username,
            type: nextProps.fasit.data.type,
            password: nextProps.fasit.currentPassword
        })
    }

    resetLocalState() {
        const {fasit} = this.props
        this.setState({
            hostname: fasit.data.hostname,
            username: fasit.data.username,
            type: fasit.data.type,
            password: ""
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


    showFasitData(authenticated) {
        const {fasit, editMode}= this.props
        if (fasit.isFetching || !fasit.data)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>

        else if (fasit.requestFailed)
            return (
                <div>Retrieving Fasit-data failed:
                    <br />
                    <br />
                    <pre><i>{fasit.requestFailed}</i></pre>
                </div>
            )

        else if (editMode) {
            return <NodeFasitViewEditMode />
        } else {
            return <NodeFasitViewPreviewMode authenticated={authenticated}/>
        }
    }


    arrowDirection(component) {
        return classString({
            "fa": true,
            "fa-angle-right": !this.state[component],
            "fa-angle-down": this.state[component]
        })
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
        const {hostname, config, user, fasit, dispatch, nodeTypes} = this.props
        let authenticated = false
        let lifecycle = {}
        if (Object.keys(fasit.data).length > 0) {
            authenticated = checkAuthentication(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }
        return (
            <div className="row">
                <div className="col-xs-12 row main-data-container">
                    <div className="col-sm-1 hidden-xs">
                        <NodeTypeImage type={fasit.data.type}/>
                    </div>
                    <div className="col-sm-3 hidden-xs FormLabel main-data-title text-overflow">
                        <strong>{hostname}</strong></div>
                    <div className="col-sm-2 nopadding">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated, "edit")}
                                        onClick={() => this.toggleComponentDisplay("editMode")}
                                >
                                    <i className="fa fa-wrench fa-2x"/>
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated)}
                                        onClick={() => dispatch(showDeleteNodeForm(true))}
                                >
                                    <i className="fa fa-trash fa-2x"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    {/*this.showFasitData(authenticated)*/}


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
                        label="cluster"
                        value={fasit.data.cluster ? fasit.data.cluster.name : "Orphaned node"}
                    />

                    <br />
                    {this.state.editMode ?
                        <div className="btn-block">
                            <button type="submit" className="btn btn-sm btn-primary pull-right"
                                    onClick={(e) => {
                                    }}>Submit
                            </button>
                            <button type="reset" className="btn btn-sm btn-default btn-space pull-right"
                                    onClick={() => this.toggleComponentDisplay("editMode")}>Cancel
                            </button>
                        </div>
                        : ""
                    }


                    <div className="row">
                        <NodeLifecycle lifecycle={lifecycle}
                                       rescueAction={()=>dispatch(rescueNode(hostname))}/>
                    </div>
                </div>
                <div className="col-md-5 col-md-offset-1">
                    <div className="list-group">
                        <a className="list-group-item node-list-item"
                           onClick={() => this.toggleComponentDisplay("displayRevisions")}>
                            <i className={this.arrowDirection("displayRevisions")}/>&nbsp;&nbsp;&nbsp;&nbsp;
                            Revisions
                        </a>
                        {this.state.displayRevisions ? <NodeRevisionsView hostname={hostname}/> : <div />}
                        <a className="list-group-item node-list-item"
                           onClick={() => this.toggleComponentDisplay("displaySecurity")}><i
                            className={this.arrowDirection("displaySecurity")}/>&nbsp;&nbsp;&nbsp;&nbsp;Security</a>
                        {this.state.displaySecurity ? <NodeSecurityView authenticated={authenticated}
                                                                        requirements={fasit.data.accesscontrol}/> :
                            <div />}
                        <a className="list-group-item node-list-item"
                           onClick={() => this.toggleComponentDisplay("displayEvents")}><i
                            className={this.arrowDirection("displayEvents")}/>&nbsp;&nbsp;&nbsp;&nbsp;Events</a>
                        {this.state.displayEvents ? <NodeEventsView /> : <div />}
                        <a className="list-group-item node-list-item"
                           onClick={() => this.toggleComponentDisplay("displayPhysical")}><i
                            className={this.arrowDirection("displayPhysical")}/>&nbsp;&nbsp;&nbsp;&nbsp;Physical</a>
                        <a className="list-group-item node-list-item"
                           onClick={() => this.toggleComponentDisplay("displayGraphs")}><i
                            className={this.arrowDirection("displayGraphs")}/>&nbsp;&nbsp;&nbsp;&nbsp;Graphs</a>
                        {this.state.displayGraphs ? <NodeGraph url={config.grafana} hostname={hostname}/> : <div />}
                    </div>
                    {/*                        <div className="row">
                     <NodeRevisionsView hostname={hostname}/>
                     </div>
                     {(Object.keys(lifecycle).length > 0) ? <div className="row"><NodeLifecycle lifecycle={lifecycle}
                     rescueAction={()=>dispatch(rescueNode(hostname))}/>
                     </div> : <div></div> }
                     <div className="row">
                     </div>
                     <div className="row">
                     <iframe src={grafanaSrc}
                     width="100%"
                     height="200"
                     frameBorder="1">
                     </iframe>
                     </div>
                     <NodeFasitViewSubmitNewNodeStatus />
                     <NodeFasitViewNewNodeForm />*/}
                    <NodeFasitViewDeleteNodeForm hostname={hostname}/>
                    <NodeFasitViewSubmitDeleteStatus />
                </div>
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
        nodeTypes: state.nodes.nodeTypes
    }
}

export default connect(mapStateToProps)(Node)
