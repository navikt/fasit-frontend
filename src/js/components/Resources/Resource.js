import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {validAuthorization} from '../../utils'
import {fetchFasitData, fetchResourceSecret, clearResourceSecret} from '../../actionCreators/resource'
import {submitForm} from '../../actionCreators/common'
import classString from 'react-classset'
import moment from 'moment'


import {
    CollapsibleMenu,
    CollapsibleMenuItem,
    FormString,
    FormList,
    FormSecret,
    Lifecycle,
    RevisionsView,
    SecurityView,
    SubmitFormStatus,
    SubmitForm
} from '../common/'

const initialState = {
    displaySubmitForm: false,
    secretVisible: false,
    editMode: false,
    deleteMode: false,
}


class Resource extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    componentDidMount() {
        const {dispatch, id} = this.props
        dispatch(fetchFasitData(id))
    }

    //Brukes denne?
    componentWillReceiveProps(nextProps) {
        this.setNewState(nextProps.fasit)
    }

    componentWillUnmount() {
        this.props.dispatch(clearResourceSecret())
    }

    setNewState(newState) {
        // TODO, make generic?

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
        })
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props
        this.toggleComponentDisplay("displaySubmitForm")
        this.toggleComponentDisplay("editMode")
        dispatch(submitForm(key, form, comment, component))
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

    buttonClasses(authenticated, edit) {
        return classString({
            "btn": true,
            "btn-link": true,
            "topnav-button": true,
            "topnav-button-active": this.state.editMode && edit,
            "disabled": !authenticated
        })
    }

    renderResourceProperties(properties) {

        if (properties) {
            return Object.keys(properties).map(prop => {

                return <FormString
                    key={prop}
                    label={prop}
                    editMode={this.state.editMode}
                    value={properties[prop]}
                    handleChange={this.handleChange.bind(this)}
                    parent="properties"/>
            })
        }
    }

    renderSecrets(secrets) {
        const {user} = this.props

        if (secrets) {
            return Object.keys(secrets).map(secret => {
                    return <FormSecret
                        key={secret}
                        label={secret}
                        editMode={this.state.editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={this.state.currentSecret}
                        authenticated={user.authenticated}
                        toggleDisplaySecret={this.toggleDisplaySecret.bind(this)}/>
                }
            )
        }
    }

    formStringElement(label, value, editMode) {
        return <FormString label={label} value={value} editMode={editMode} handleChange={this.handleChange.bind(this)}/>
    }

    formListElement(label, value, editMode, options, field) {
        return <FormList label={label}
                         value={value ? value : '-'}
                         editMode={editMode}
                         handleChange={this.handleChange.bind(this)}
                         options={options}
                         parent={field}/>
    }

    renderScope(scope) {

        if (scope) {
            if (!this.state.editMode) {

                const envClass = scope.environmentclass ? scope.environmentclass : '-'
                const environment = scope.environment ? scope.environment : '-'
                const zone = scope.zone ? scope.zone : '-'
                const application = scope.application ? scope.application : '-'

                return <div className="row">
                    <div className="col-md-4 FormLabel"><b>Scope:</b></div>
                    <div className="col-md-8"><span className="formValue"></span>{envClass} | {zone} | {environment}
                        | {application}</div>
                </div>
            }
            return <div className="well well-lg" style={{marginTop: "5px", paddingTop:"5px"}}>
                    <div className="row FormLabel"><b>Scope:</b></div>
                    <div className="row">

                        {this.formListElement("environmentclass", scope.environmentclass, this.state.editMode, this.props.environmentClasses, "scope")}
                        {this.formListElement("zone", scope.zone, this.state.editMode, this.props.zones, "scope")}
                        {this.formListElement("environment", scope.environment, this.state.editMode, this.props.environmentNames, "scope")}
                        {this.formListElement("application", scope.application, this.state.editMode, this.props.applications, "scope")}
                    </div>
                </div>

        }
    }

    render() {

        // Bedre måte å håndtere render når det ikke er noe data (spinner)
        // Sortere miljøer riktig i utils
        // velge rett miljøklasse ut fra miljø i utils ?
        // håndtere liste av security token

        const {id, fasit, user, environmentClasses, environments} = this.props

        let authorized = false
        let lifecycle = {}

        if (Object.keys(fasit.data).length > 0) {
            authorized = validAuthorization(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }

        return (
            <div className="row">
                <div className="col-xs-12 row main-data-container">
                    <div className="col-sm-8 nopadding nowrap">
                        {/*<ul className="nav navbar-nav navbar-left">
                         <li>
                         <button type="button"
                         className={this.buttonClasses(authorized, "edit")}
                         onClick={authorized ? () => this.toggleComponentDisplay("editMode") : () => {
                         }}>
                         <i className="fa fa-wrench fa-2x"/>
                         </button>
                         </li>
                         <li>
                         <button type="button" className={this.buttonClasses(authorized)}
                         onClick={authorized ? () => this.toggleComponentDisplay("deleteMode") : () => {
                         }}>
                         <i className="fa fa-trash fa-2x"/></button>
                         </li>
                         </ul>*/}

                        <div className="btn-group btn-group-horizontal">

                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}>
                                <i className="fa fa-fw fa-user"/>Access control
                            </div>
                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}>
                                <i className="fa fa-fw fa-files-o"/>Copy
                            </div>
                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}
                                 onClick={authorized ? () => this.toggleComponentDisplay("editMode") : () => {
                                     }}>
                                <i className="fa fa-fw fa-pencil-square-o"/>Edit
                            </div>
                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}
                                 onClick={authorized ? () => this.toggleComponentDisplay("displayDeleteForm") : () => {
                                     }}>
                                <i className="fa fa-fw fa-trash"/>Delete
                            </div>
                            <div className="btn">Updated: {moment(this.state.updated).locale('en').fromNow()}</div>
                        </div>

                    </div>
                </div>


                <div className="col-md-6">
                    {this.formStringElement("type", this.state.type, false)}
                    {this.formStringElement("alias", this.state.alias, this.state.editMode)}
                    {this.renderResourceProperties(this.state.properties)}
                    {this.renderSecrets(this.state.secrets)}
                    {this.renderScope(this.state.scope)}
                </div>

                <CollapsibleMenu>
                    <CollapsibleMenuItem label="Tools">
                        <div className="btn-group btn-group-vertical collapsible-menu-content-container">

                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}>
                                <i className="fa fa-fw fa-user"/>&emsp;Access control
                            </div>
                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}>
                                <i className="fa fa-fw fa-files-o"/>&emsp;Copy
                            </div>
                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}
                                 onClick={authorized ? () => this.toggleComponentDisplay("editMode") : () => {
                                     }}>
                                <i className="fa fa-fw fa-pencil-square-o"/>&emsp;Edit
                            </div>
                            <div className={authorized ? "btn btn-white" : "btn btn-white disabled"}
                                 style={{textAlign: "left"}}
                                 onClick={authorized ? () => this.toggleComponentDisplay("displayDeleteForm") : () => {
                                     }}>
                                <i className="fa fa-fw fa-trash"/>&emsp;Delete
                            </div>
                        </div>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="History">
                        <RevisionsView id={id} component="resource"/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Security">
                        <SecurityView accesscontrol={fasit.data.accesscontrol}/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>

            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        fasit: state.resource_fasit,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        environmentNames: state.environments.environments.map(e => e.name),
        zones: state.environments.zones,
        applications: state.applications.applicationNames,
        user: state.user,
        config: state.configuration,
    }
}

export default connect(mapStateToProps)(Resource)
