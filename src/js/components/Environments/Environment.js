import React, {Component, PropTypes} from "react"
import {Link} from 'react-router'
import {connect} from "react-redux"
import {
    AccessControl,
    CollapsibleMenu,
    CurrentRevision,
    CollapsibleMenuItem,
    RevisionsView,
    Lifecycle,
    FormString,
    FormDropDown,
    SecurityView,
    SubmitForm,
    DeleteElementForm,
    ToolButtons
} from "../common/"
import {submitForm} from '../../actionCreators/common'
import {validAuthorization, oldRevision} from '../../utils/'
import EnvironmentClusters from './EnvironmentClusters'
import EnvironmentNodes from './EnvironmentNodes'
import EnvironmentInstances from './EnvironmentInstances'
import {fetchEnvironment} from "../../actionCreators/environment"
import * as browserhistory from "react-router";

class Environment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayClusters: true,
            displayNodes: false,
            displayInstances: false,
            displaySubmitForm: false,
            displayDeleteForm: false,
            displayAccessControlForm: false,
            editMode: false,
            comment: "",
            environmentclass: "",
            adgroups: [],
            name: ""
        }
    }

    resetLocalState() {
        const {environment} = this.props
        this.setState({
            name: environment.name,
            environmentclass: environment.environmentclass,
            environment: environment.environment,
            adgroups: [],
            comment: ""

        })
    }

    toggleComponentDisplay(component) {
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode)
            this.resetLocalState()
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmitForm(id, form, comment, component) {
        const {dispatch} = this.props
        if (component == "environment" && this.state.displaySubmitForm) {
            this.toggleComponentDisplay("displaySubmitForm")
            this.toggleComponentDisplay("editMode")
        } else if (component === "deleteEnvironment") {
            this.toggleComponentDisplay("displayDeleteForm")
            this.setState({comment: ""})
        } else if (component === "environment" && this.state.displayAccessControlForm) {
            this.toggleComponentDisplay("displayAccessControlForm")
        }
        dispatch(submitForm(id, form, comment, component))
        if (component === "deleteEnvironment") {
            browserhistory.push("/environments")
        }
    }

    componentDidMount() {
        const {dispatch, name, query} = this.props
        dispatch(fetchEnvironment(name, query.revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, name, query} = this.props
        this.setState({
            name: nextProps.environment.name,
            environmentclass: nextProps.environment.environmentclass,
            comment: ""
        })
        if (Object.keys(nextProps.environment).length > 0) {
            this.setState({adgroups: nextProps.environment.accesscontrol.adgroups})
        }
        if (nextProps.query.revision != query.revision) {
            dispatch(fetchEnvironment(name, nextProps.query.revision))
        }
        if (nextProps.name != name) {
            dispatch(fetchEnvironment(nextProps.name, nextProps.query.revision))
        }
    }

    render() {
        const {environment, user, query, environmentClasses, revisions} = this.props
        const {displayClusters, displayInstances, displayNodes, name, environmentclass, comment, adgroups} = this.state
        let lifecycle = {}
        const showRevision = oldRevision(revisions, query.revision)
        let authorized = false
        if (Object.keys(environment).length > 0) {
            authorized = validAuthorization(user, environment.accesscontrol)
            lifecycle = environment.lifecycle
        }

        return (
            <div className="row">
                {/*Heading*/}
                {showRevision ?
                    <CurrentRevision revisionId={query.revision} revisions={revisions}/> :
                    <ToolButtons
                        authorized={authorized}
                        onEditClick={() => this.toggleComponentDisplay("editMode")}
                        onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                        onCopyClick={() => console.log("Copy,copycopy!")}
                    />
                }
                {/*Form*/}
                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    <FormString
                        label="name"
                        editMode={this.state.editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={this.state.name}
                    />
                    <FormDropDown
                        label="environmentclass"
                        editMode={this.state.editMode}
                        value={environmentclass}
                        handleChange={this.handleChange.bind(this)}
                        options={environmentClasses}
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
                    <div className="col-xs-12" style={{height: 30 + "px"}}></div>

                    <div className="row">
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => console.log("you need to do something about this, dude!")}/>
                    </div>
                </div>


                {/*Side menu*/}
                <CollapsibleMenu>
                    <CollapsibleMenuItem label="History" defaultExpanded={true}>
                        <RevisionsView id={this.props.name} currentRevision={query.revision} component="environment"/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Security">
                        <SecurityView accesscontrol={environment.accesscontrol}
                                      displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>

                {/*Content view*/}
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div className="col-xs-12">
                    <ul className="nav nav-tabs">
                        <li className={displayClusters ? "active" : ""}>
                            <Link to={`/environments/${environment.name}/clusters`}
                                  onClick={() => this.selectTab("clusters")}>Clusters</Link></li>
                        <li className={displayNodes ? "active" : ""}>
                            <Link to={`/environments/${environment.name}/nodes`}
                                  onClick={() => this.selectTab("nodes")}>Nodes</Link></li>
                        <li className={displayInstances ? "active" : ""}>
                            <Link to={`/environments/${environment.name}/instances`}
                                  onClick={() => this.selectTab("instances")}>Instances</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {displayClusters ? <EnvironmentClusters environment={environment.name}/> : null}
                    {displayNodes ? <EnvironmentNodes environment={environment.name}/> : ''}
                    {displayInstances ? <EnvironmentInstances environment={environment.name}/> : ''}
                </div>

                {/* Misc. modals*/}
                <AccessControl
                    displayAccessControlForm={this.state.displayAccessControlForm}
                    onClose={() => this.toggleComponentDisplay("displayAccessControlForm")}
                    onSubmit={() => this.handleSubmitForm(name, {
                            name: environment.name,
                            environmentclass: environment.environmentclass,
                            accesscontrol: {adgroups}
                        }
                        , comment, "environment")}
                    id={name}
                    value={adgroups}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}
                />
                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onSubmit={() => this.handleSubmitForm(name, null, comment, "deleteEnvironment")}
                    id={name}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}

                />
                <SubmitForm
                    display={this.state.displaySubmitForm}
                    component="environment"
                    onSubmit={(id, form, comment, component) => this.handleSubmitForm(id, form, comment, component)}
                    onClose={() => this.toggleComponentDisplay("displaySubmitForm")}
                    newValues={{
                        name: this.state.name,
                        environmentclass: this.state.environmentclass,

                    }}
                    originalValues={{
                        name: environment.name,
                        environmentclass: environment.environmentclass,
                    }}
                />
            </div>

        )
    }

    selectTab(tab) {
        switch (tab) {
            case "clusters":
                this.setState({
                        displayClusters: true,
                        displayNodes: false,
                        displayInstances: false
                    }
                )
                return
            case "nodes":
                return this.setState({
                        displayClusters: false,
                        displayNodes: true,
                        displayInstances: false
                    }
                )
            case "instances":
                return this.setState({
                        displayClusters: false,
                        displayNodes: false,
                        displayInstances: true
                    }
                )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        environment: state.environment_fasit.data,
        environmentClasses: state.environments.environmentClasses,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

export default connect(mapStateToProps)(Environment)
