import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {validAuthorization, oldRevision} from "../../utils";
import {fetchFasitData, fetchResourceSecret, clearResourceSecret} from "../../actionCreators/resource";
import {submitForm} from "../../actionCreators/common";
import {resourceTypes} from "../../utils/resourceTypes";
import {ResourceInstances} from "./ResourceInstances";
import RaisedButton from "material-ui/RaisedButton";
import NotFound from "../NotFound";
import {
    AccessControl,
    CurrentRevision,
    FormString,
    FormDropDown,
    FormLink,
    FormSecret,
    FormTextArea,
    Lifecycle,
    RescueElementForm,
    Security,
    History,
    DeleteElementForm,
    ToolButtons
} from "../common/";
import Scope from "./Scope";

const initialState = {
    secretVisible: false,
     editMode: false,
    deleteMode: false,
    displaySubmitForm: false,
    displayDeleteForm: false,
    displayRescueForm: false,
    adgroups: [],
    comment: ""
}


class Resource extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    componentDidMount() {
        const {dispatch, id, query} = this.props
        if (query) {
            dispatch(fetchFasitData(id, query.revision))
        } else {
            dispatch(fetchFasitData(id))
        }

    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, id, query} = this.props
        this.setNewState(nextProps.fasit)

        if (nextProps.id != id) {
            dispatch(fetchFasitData(nextProps.id))
        }
        if (nextProps.query.revision != query.revision) {
            dispatch(fetchFasitData(id, nextProps.query.revision))
        }

    }

    componentWillUnmount() {
        this.props.dispatch(clearResourceSecret())
    }


    setNewState(newState) {
        // TODO, make generic?

        const adgroups = newState.accesscontrol ? newState.accesscontrol.adgroups : []

        this.setState({
            alias: newState.data.alias,
            type: newState.data.type,
            scope: newState.data.scope,
            properties: newState.data.properties,
            secrets: newState.data.secrets,
            files: newState.data.files,
            dodgy: newState.data.dodgy,
            created: newState.data.created,
            updated: newState.data.updated,
            currentSecret: newState.currentSecret,
            adgroups: adgroups,
            comment: ""
        })
    }

    buildFormData() {
        const {alias, type, properties, scope, currentSecret, files} = this.state

        const form = {
            alias,
            type,
            properties,
            scope
        }

        if (currentSecret && currentSecret.length > 0) {
            form.secrets = {}

            const secretKey = this.getResourceType(type).properties.filter(p => p.type === "secret")[0].name
            form.secrets[secretKey] = {value: currentSecret}

        }

        if (Object.keys(files).length > 0) {
            form.files = files
        }

        return form
    }

    rescueResource() {
        const {dispatch} = this.props
        const {comment} = this.state
        const form = this.buildFormData()

        form.lifecycle = {status: "rescued"}
        this.toggleComponentDisplay("displayRescueForm")
        dispatch(submitForm(this.props.id, form, comment, "resource"))
    }

    saveResource() {
        const {dispatch} = this.props
        const {comment} = this.state
        const form = this.buildFormData()

        this.toggleComponentDisplay("editMode")
        this.toggleComponentDisplay("displaySubmitForm")
        dispatch(submitForm(this.props.id, form, comment, "resource"))
    }

    deleteResource(key, comment) {
        const {dispatch} = this.props
        this.toggleComponentDisplay("displayDeleteForm")
        dispatch(submitForm(key, null, comment, "deleteResource"))
    }

    updateAccessControl() {
        const {dispatch} = this.props
        const comment = "Changed accesscontrol rules"
        const form = this.buildFormData()
        form.accesscontrol = {adgroups: this.state.adgroups}
        this.toggleComponentDisplay("displayAccessControlForm")
        dispatch(submitForm(this.props.id, form, comment, "resource"))
    }


    toggleComponentDisplay(component) {
        const {dispatch} = this.props
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode) {
            this.setNewState(this.props.fasit)
        }
        if (component === "editMode" && !this.state.editMode && Object.keys(this.state.secrets).length) {
            dispatch(fetchResourceSecret())
        }
    }

    toggleDisplaySecret() {
        const {dispatch} = this.props
        if (this.state.secretVisible) {
            dispatch(clearResourceSecret())
        }
        else {
            dispatch(fetchResourceSecret())
        }

        this.setState({secretVisible: !this.state.secretVisible})
    }


    handleChange(field, value, parent) {

        if (parent) {
            const parentState = this.state[parent]
            parentState[field] = value
            this.setState({parent: parentState})
        } else {
            this.setState({[field]: value})
        }
    }

    renderResourceProperties() {
        if (this.state.type) { // nødvendig??
            const type = this.getResourceType(this.state.type)
            return (
                <div>
                    {type.properties.map(this.renderProperty.bind(this))}
                </div>
            )
        }
    }

    renderProperty(property) {
        const {user}  = this.props
        const key = property.name
        const label = `${property.displayName}${property.required === true ? " *" : ""}`
        const field = property.name

        switch (property.type) {
            case "textbox":
                return <FormString key={key}
                                   label={label}
                                   field={field}
                                   editMode={this.state.editMode}
                                   value={this.state.properties[property.name]}
                                   parent="properties"
                                   handleChange={this.handleChange.bind(this)}/>

            case "textarea":
                return <FormTextArea key={key}
                                     label={label}
                                     field={field}
                                     editMode={this.state.editMode}
                                     value={this.state.properties[property.name]}
                                     parent="properties"
                                     handleChange={this.handleChange.bind(this)}/>
            case "dropdown":
                return <FormDropDown key={key}
                                     label={label}
                                     field={field}
                                     value={this.state.properties[property.name]}
                                     editMode={this.state.editMode}
                                     handleChange={this.handleChange.bind(this)}
                                     options={property.options}/>
            case "secret":
                const authorized = validAuthorization(user, this.props.fasit.data.accesscontrol)
                return <FormSecret key={key}
                                   label={label}
                                   field="currentSecret"
                                   editMode={this.state.editMode}
                                   value={this.state.currentSecret}
                                   authorized={authorized}
                                   handleChange={this.handleChange.bind(this)}
                                   toggleDisplaySecret={this.toggleDisplaySecret.bind(this)}/>
            case "file":
                break

        }
    }

    exposedByApplication() {
        const exposedBy = this.props.fasit.data.exposedby
        if (exposedBy) {
            const displayString = `${exposedBy.application} (${exposedBy.version}) in ${exposedBy.environment}`
            return <FormLink
                label="Exposed by"
                value={displayString}
                linkTo={'/instances/' + exposedBy.id}/>
        }
    }

    formStringElement(label, value, editMode) {
        return <FormString label={label} value={value} editMode={editMode} handleChange={this.handleChange.bind(this)}/>
    }

    render() {
        // handle isvalid() alt som er required
        // Fikse resource types slik at vi slipper å håndtere casing. For eksempel lage felt for display name
        // Sortere miljøer riktig i utils
        // sortere resource types i filter på ressurser
        // I resources element list hvis ressurstypen med riktig casing
        // Få enter til å funke skikkelig i formene både ny, edit og comment
        // håndtere error i fetch secrets
        // file upload
        // copy

        const {id, fasit, user, query, revisions} = this.props
        const showRevision = oldRevision(revisions, query.revision)

        let authorized = false
        let lifecycle = {}

        if (fasit.requestFailed) {
            if (fasit.requestFailed.startsWith("404")) {
                return (<NotFound/>)
            }
            return <div>Retrieving resource {id} failed with the following message:
                <br />
                <pre><i>{fasit.requestFailed}</i></pre>
            </div>
        }

        if (fasit.isFetching || Object.keys(fasit.data).length === 0) {
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        }

        if (Object.keys(fasit.data).length > 0) {
            authorized = validAuthorization(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }

        return (
            <div className="row">
                { showRevision ? <CurrentRevision revisionId={query.revision} revisions={revisions}/>
                    : <ToolButtons disabled={!authorized}
                                   onEditClick={() => this.toggleComponentDisplay("editMode")}
                                   onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                                   onCopyClick={() => console.log("Copy,copycopy!")}
                                   editMode={this.state.editMode}
                    />

                }

                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    {this.formStringElement("type", this.state.type, false)}
                    {this.formStringElement("alias", this.state.alias, this.state.editMode)}
                    {this.renderResourceProperties(this.state.properties)}


                    <Scope editMode={this.state.editMode} scope={this.state.scope}
                           handleChange={this.handleChange.bind(this)}/>

                    {this.exposedByApplication()}

                    {this.state.editMode ?
                        <div className="pull-right">
                            <RaisedButton
                                style={{margin: '6'}}
                                label="Submit"
                                primary={true}
                                onTouchTap={() => this.toggleComponentDisplay("displaySubmitForm")}
                                disableTouchRipple={true}/>
                            <RaisedButton
                                style={{margin: '6'}}
                                label="Cancel"
                                default={true}
                                onTouchTap={() => this.toggleComponentDisplay("editMode")} disableTouchRipple={true}/>
                        </div>
                        : ""
                    }

                    <div className="row">
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => this.toggleComponentDisplay("displayRescueForm")}
                                   authorized={authorized}/>
                    </div>

                    <div>
                        <ResourceInstances instances={fasit.data.usedbyapplications}/>
                    </div>
                </div>


                <div className="col-md-4">
                    <History id={id} currentRevision={query.revision} component="instance"/>
                    <Security accesscontrol={fasit.data.accesscontrol}
                              displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                </div>

                <RescueElementForm
                    displayRescueForm={this.state.displayRescueForm}
                    onClose={() => this.toggleComponentDisplay("displayRescueForm")}
                    onSubmit={() => this.rescueResource()}
                    id={id}
                    handleChange={this.handleChange.bind(this)}
                    comment={this.state.comment}
                />

                <AccessControl
                    displayAccessControlForm={this.state.displayAccessControlForm}
                    onClose={() => this.toggleComponentDisplay("displayAccessControlForm")}
                    onSubmit={() => this.updateAccessControl()}
                    id={id}
                    value={this.state.adgroups}
                    handleChange={this.handleChange.bind(this)}
                />

                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onSubmit={() => this.deleteResource(id, this.state.comment)}
                />
                {this.renderSubmitForm()}
            </div>
        )
    }


    getResourceType(typeKey) {
        const key = Object.keys(resourceTypes)
            .filter(resourceType => resourceType.toLowerCase() === typeKey.toLowerCase())[0]
        return resourceTypes[key]
    }


    renderSubmitForm() {
        return (
            <Modal show={this.state.displaySubmitForm} onHide={() => this.toggleComponentDisplay("displaySubmitForm")}
                   dialogClassName="submitForm">
                <Modal.Header>
                    <Modal.Title>Commit changes
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={() => this.toggleComponentDisplay("displaySubmitForm")}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <div className="col-xs-2 FormLabel"><b>Comment</b></div>
                    <div className="col-xs-8">
                        <textarea
                            type="text"
                            rows="4"
                            className="TextAreaInputField FormString-value"
                            value={this.state.comment}
                            onChange={(e) => this.handleChange("comment", e.target.value)}
                        />
                    </div>
                    <div className="col-xs-2 submit-button-placement">
                            <RaisedButton label="Submit" primary={true} onTouchTap={this.saveResource.bind(this)} disableTouchRipple={true}/>
                    </div>
                </Modal.Footer>
            </Modal>)
    }
}


const mapStateToProps = (state) => {
    return {
        fasit: state.resource_fasit,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        zones: state.environments.zones,
        applications: state.applications.applicationNames,
        user: state.user,
        config: state.configuration,
        query: state.routing.locationBeforeTransitions.query,
        revisions: state.revisions
    }
}

export default connect(mapStateToProps)(Resource)
