import React, {Component, PropTypes} from "react"
import {Link} from 'react-router'
import {connect} from "react-redux"
import {
    CollapsibleMenu,
    CollapsibleMenuItem,
    RevisionsView,
    Lifecycle,
    FormString,
    FormList,
    SubmitForm,
    DeleteElementForm,
    ToolButtons
} from "../common/"
import {submitForm} from '../../actionCreators/common'
import {validAuthorization} from '../../utils/'
import EnvironmentClusters from './EnvironmentClusters'
import EnvironmentNodes from './EnvironmentNodes'
import EnvironmentInstances from './EnvironmentInstances'
import {fetchEnvironment} from "../../actionCreators/environment"

class Environment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayClusters: true,
            displayNodes: false,
            displayInstances: false,
            displaySubmitForm: false,
            displayDeleteForm: false,
            editMode: false,
            comment:"",
            environmentclass: "",
            name: ""
        }
    }
    resetLocalState() {
        const {environment} = this.props
        this.setState({
            name: environment.name,
            environmentclass: environment.environmentclass,
            environment: environment.environment,
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
        console.log("key",id, "form",form,"comment", comment,"component", component)
        if (component == "environment") {
            this.toggleComponentDisplay("displaySubmitForm")
            this.toggleComponentDisplay("editMode")
        } else if (component === "deleteEnvironment") {
            this.toggleComponentDisplay("displayDeleteForm")
            this.setState({comment: ""})
        }
        dispatch(submitForm(id, form, comment, component))
    }

    componentDidMount() {
        const {dispatch, name, revision} = this.props
        dispatch(fetchEnvironment(name, revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, name, query} = this.props
        this.setState({
            name: nextProps.environment.name,
            environmentclass: nextProps.environment.environmentclass,
            environment: nextProps.environment.environment,
            comment: ""
        })

        if (nextProps.query.revision != query.revision) {
            dispatch(fetchEnvironment(name, nextProps.query.revision))
        }
    }

    render() {
        const {environment, user, query, environmentClasses} = this.props
        const {displayClusters, displayInstances, displayNodes, name, environmentclass, comment} = this.state
        let lifecycle = {}
        let authorized = false
        if (Object.keys(environment).length > 0) {
            authorized = validAuthorization(user, environment.accesscontrol)
            lifecycle = environment.lifecycle
        }

        return (
            <div className="row">
                    {/*Heading*/}
                {this.oldRevision() ? <div className="col-md-12" style={{paddingTop:10, paddingBottom:10}}><h4>Revision #{query.revision}</h4></div> :
                        <ToolButtons
                            authorized={authorized}
                            onEditClick={() => this.toggleComponentDisplay("editMode")}
                            onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                            onCopyClick={() => console.log("Copy,copycopy!")}
                        />
                    }
                {/*Form*/}
                <div className={this.oldRevision() ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    <FormString
                        label="name"
                        editMode={this.state.editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={this.state.name}
                    />
                    <FormList
                        label="environmentclass"
                        editMode={this.state.editMode}
                        value={this.state.environmentclass}
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
                    <CollapsibleMenuItem label="History">
                        <RevisionsView id={environment.name} component="environment"/>
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
                    additionalValues={{
                        environment: environment.environment,
                        environmentclass: environment.environmentclass
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

    oldRevision() {
        const {revisions, query} = this.props
        if (!query.revision) {
            return false
        } else if (revisions.data[0]) {
            if (revisions.data[0].revision != query.revision) {
                return true
            }
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
