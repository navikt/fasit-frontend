import React, {Component} from "react";
import {browserHistory}  from "react-router";
import {Link} from "react-router";
import {connect} from "react-redux";
import {
    AccessControl,
    CurrentRevision,
    History,
    Lifecycle,
    Security,
    DeleteElementForm,
    ToolButtons
} from "../common/";
import {submitForm, displayModal} from "../../actionCreators/common";
import {validAuthorization, oldRevision} from "../../utils/";
import EnvironmentClusters from "./EnvironmentClusters";
import EnvironmentNodes from "./EnvironmentNodes";
import EnvironmentInstances from "./EnvironmentInstances";
import {fetchEnvironment} from "../../actionCreators/environment";
import {icons} from "../../commonStyles/commonInlineStyles"
import {Card, CardActions, CardHeader} from 'material-ui/Card'

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
            adgroups: [],
        }
    }

    resetLocalState() {
        this.setState({
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

        if (component === "deleteEnvironment") {
            this.toggleComponentDisplay("displayDeleteForm")
            this.setState({comment: ""})
        } else if (component === "environment" && this.state.displayAccessControlForm) {
            this.toggleComponentDisplay("displayAccessControlForm")
        }
        dispatch(submitForm(id, form, comment, component))
        if (component === "deleteEnvironment") {
            browserHistory.push("/environments")
        }
    }

    componentDidMount() {
        const {dispatch, name, query} = this.props
        dispatch(fetchEnvironment(name, query.revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, name, query} = this.props
        this.setState({
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
        const {environment, user, query, revisions, dispatch} = this.props
        const {displayClusters, displayInstances, displayNodes, comment, adgroups, editMode} = this.state
        const envName = environment.name
        const envClass = environment.environmentclass
        let lifecycle = {}
        const showRevision = oldRevision(revisions, query.revision)
        let authorized = false
        if (Object.keys(environment).length > 0) {
            authorized = validAuthorization(user, environment.accesscontrol)
            lifecycle = environment.lifecycle
        }

        return (
            <div className="row">
                {showRevision && <CurrentRevision revisionId={query.revision} revisions={revisions}/>}
                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"} style={{paddingTop: '20px'}}>
                    <Card>
                        <CardHeader avatar={icons.environment} title={`Environment ${envName}`} subtitle={`Environment class: ${envClass} `}/>
                        <CardActions>
                            <ToolButtons
                                disabled={showRevision || !authorized}
                                onEditClick={() => dispatch(displayModal("environment", true, "edit"))}
                                onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                                onCopyClick={() => dispatch(displayModal("environment", true, "copy"))}
                                editMode={editMode}
                            />
                        </CardActions>
                    </Card>

                    <div className="row">
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => console.log("you need to do something about this, dude!")}
                                   authorized={authorized}/>
                    </div>
                </div>


                <div className="col-md-4">
                    <History id={this.props.name} currentRevision={query.revision} component="environment"/>
                    <Security accesscontrol={environment.accesscontrol} displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                </div>

                {/*Content view*/}
                <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                <div className="col-xs-12">
                    <ul className="nav nav-tabs">
                        <li className={displayClusters ? "active" : ""}>
                            <Link to={`/environments/${envName}/clusters`}
                                  onClick={() => this.selectTab("clusters")}>Clusters</Link></li>
                        <li className={displayNodes ? "active" : ""}>
                            <Link to={`/environments/${envName}/nodes`}
                                  onClick={() => this.selectTab("nodes")}>Nodes</Link></li>
                        <li className={displayInstances ? "active" : ""}>
                            <Link to={`/environments/${envName}/instances`}
                                  onClick={() => this.selectTab("instances")}>Instances</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-12" style={{height: 20 + "px"}}></div>
                    {displayClusters ? <EnvironmentClusters environment={envName}/> : null}
                    {displayNodes ? <EnvironmentNodes environment={envName}/> : ''}
                    {displayInstances ? <EnvironmentInstances environment={envName}/> : ''}
                </div>

                {/* Misc. modals*/}
                <AccessControl
                    displayAccessControlForm={this.state.displayAccessControlForm}
                    onClose={() => this.toggleComponentDisplay("displayAccessControlForm")}
                    onSubmit={() => this.handleSubmitForm(name, {
                            name: envName,
                            environmentclass: envClass,
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
                    id={envName}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}
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
