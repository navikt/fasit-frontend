import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {List, ListItem} from "material-ui/List";
import {oldRevision, validAuthorization} from "../../utils";
import {clearResourceSecret, fetchFasitData, fetchResourceSecret} from "../../actionCreators/resource";
import {displayModal, submitForm} from "../../actionCreators/common";
import {resourceTypes, resourceTypeIcon} from "../../utils/resourceTypes";
import {ResourceInstances} from "./ResourceInstances";
import {Card, CardActions, CardText, CardHeader} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";
import {styles, icons} from "../../commonStyles/commonInlineStyles";
import NotFound from "../NotFound";
import {
    AccessControl,
    CurrentRevision,
    DeleteElementForm,
    FormLink,
    History,
    Lifecycle,
    RescueElementForm,
    Security,
    ToolButtons
} from "../common/";

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
            dispatch(clearResourceSecret())
        }
        if (nextProps.query.revision != query.revision) {
            dispatch(fetchFasitData(id, nextProps.query.revision))
            dispatch(clearResourceSecret())
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
        this.setState({[component]: !this.state[component]})
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
        const {resource} = this.props
        const type = this.getResourceType(resource.type)
        return (
            <List>
                {type.properties.map((p, key) => this.renderProperty(p, resource))}
            </List>
        )
    }

    renderProperty(property, resource) {
        const {secretVisible} = this.state
        const propertyName = property.displayName
        const key = property.name
        const {properties} = resource

        switch (property.type) {
            case "textbox":
            case "dropdown":
                return <ListItem
                    key={key}
                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                    disabled={true}
                    className="text-overflow"
                    primaryText={properties[key]}
                    secondaryText={propertyName}
                />

            case "textarea":
                return <ListItem
                    key={key}
                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                    disabled={true}
                    className="text-overflow"
                    primaryText={<pre><code>{properties[key]}</code></pre>}
                    secondaryText={propertyName}
                />
            case "secret":
                return <ListItem
                    key={key}
                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                    disabled={true}
                    className="text-overflow"
                    primaryText={
                        <div>{secretVisible ? this.props.currentSecret : "*********"} {this.showSecretButtonOrInfo()}</div>}
                    secondaryText={propertyName}
                />
            case "file":
                break
        }
    }

    showSecretButtonOrInfo() {
        const {user}  = this.props
        const authorized = validAuthorization(user, this.props.fasit.data.accesscontrol)


        if (authorized) {
            return <FlatButton disableTouchRipple={true} style={styles.flatButton} className={"pull-right"}
                               label={"View secret"}
                               icon={icons.eye} onTouchTap={() => this.toggleDisplaySecret()}/>
        } else {
            return (<Chip className="pull-right">
                {icons.lockAvatar} {!user.authenticated ? "Log in to view secrets" : "Secrets require superuser access"}
            </Chip>)
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


    scopeDisplayString(scope) {
        const envClass = scope.environmentclass || '-'
        const environment = scope.environment || '-'
        const zone = scope.zone || '-'
        const application = scope.application || '-'

        return `${envClass} | ${zone} | ${environment} | ${application}`
    }

    showModal(mode) {
        const {dispatch} = this.props
        dispatch(fetchResourceSecret())
        dispatch(displayModal("resource", true, mode))
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

        const {id, fasit, user, query, revisions, resource} = this.props
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

        if (fasit.isFetching || Object.keys(resource).length === 0) {
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        }

        if (Object.keys(resource).length > 0) {
            authorized = validAuthorization(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-6" style={styles.cardPadding}>
                        { showRevision && <CurrentRevision revisionId={query.revision} revisions={revisions}/>}

                        <Card>
                            <CardHeader
                                avatar={resourceTypeIcon(resource.type)}
                                titleStyle={styles.bold}
                                title={`${resource.type} ${resource.alias}`}
                                subtitle={this.scopeDisplayString(resource.scope)}
                            >
                            </CardHeader>
                            <CardText >
                                {this.renderResourceProperties(resource.properties)}
                            </CardText>
                            <CardActions>
                                <ToolButtons disabled={!authorized}
                                             onEditClick={() => this.showModal("edit")}
                                             onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                                             onCopyClick={() => this.showModal("copy")}
                                             editMode={this.state.editMode}
                                />

                            </CardActions>
                        </Card>
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => this.toggleComponentDisplay("displayRescueForm")}
                                   authorized={authorized}/>
                    </div>

                    {this.exposedByApplication()}

                    <div className="col-md-4">
                        <History id={id} currentRevision={query.revision} component="resource"/>
                        <Security accesscontrol={fasit.data.accesscontrol}
                                  displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                    </div>

                </div>

                <div className="row col-md-12">
                    <ResourceInstances instances={fasit.data.usedbyapplications}/>
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
            </div>
        )
    }


    getResourceType(typeKey) {
        const key = Object.keys(resourceTypes)
            .filter(resourceType => resourceType.toLowerCase() === typeKey.toLowerCase())[0]
        return resourceTypes[key]
    }
}


const mapStateToProps = (state) => {
    return {
        fasit: state.resource_fasit,
        resource: state.resource_fasit.data,
        currentSecret: state.resource_fasit.currentSecret,
        user: state.user,
        config: state.configuration,
        query: state.routing.locationBeforeTransitions.query,
        revisions: state.revisions
    }
}

export default connect(mapStateToProps)(Resource)