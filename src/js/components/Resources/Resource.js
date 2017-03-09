import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {validAuthorization} from '../../utils'
import {fetchFasitData, fetchResourceSecret, clearResourceSecret} from '../../actionCreators/resource'
import {submitForm} from '../../actionCreators/common'
import NotFound from '../NotFound'
import {
    CollapsibleMenu,
    CollapsibleMenuItem,
    FormString,
    FormDropDown,
    FormSecret,
    Lifecycle,
    RevisionsView,
    SecurityView,
    SubmitForm,
    DeleteElementForm,
    ToolButtons
} from '../common/'
import {resourceTypes} from '../../utils/resourceTypes'
import Scope from './Scope'

const initialState = {
    secretVisible: false,
    editMode: false,
    deleteMode: false,
    displaySubmitForm: false,
    displayDeleteForm: false,
    comment: ""
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
            comment: ""
        })
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props
        if (component == "resource") {
            //var form2  = this.state
            dispatch(submitForm(key, form, comment, component))
            this.toggleComponentDisplay("editMode")
            dispatch(submitForm(key, form2, comment, component))

        } else if (component === "deleteResource") {
            this.toggleComponentDisplay("displayDeleteForm")
            //this.setState({comment: comment})
            dispatch(submitForm(key, form2, comment, component))

        }
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

    renderResourceProperties(properties) {
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

    renderSecrets(secrets) {
        const {user} = this.props

        if (secrets) {
            return Object.keys(secrets).map(secret => {
                    return <FormSecret
                        /*key={secret}*/
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
        return <FormDropDown label={label}
                             value={value ? value : '-'}
                             editMode={editMode}
                             handleChange={this.handleChange.bind(this)}
                             options={options}
                             parent={field}/>
    }

    render() {
        // Sortere miljøer riktig i utils
        // håndtere liste av security token og andre ressurser med enum typer
        // håndtere application properties og større tekstfelt
        // hva brukes display til?
        // sortere resource types i filter på ressurser
        // I resources element list hvis ressurstypen med riktig casing
        // størrelse på scope teksten
        // rendre alle required med *

        const {id, fasit, user} = this.props

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
                <ToolButtons authorized={authorized} onEditClick={() => this.toggleComponentDisplay("editMode")}
                             onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                             onCopyClick={() => console.log("Copy,copycopy!")}/>

                <div className="col-md-6">
                    {this.formStringElement("type", this.state.type, false)}
                    {this.formStringElement("alias", this.state.alias, this.state.editMode)}
                    {this.renderResourceProperties(this.state.properties)}
                    {this.renderSecrets(this.state.secrets)}

                    <Scope editMode={this.state.editMode} scope={this.state.scope} handleChange={this.handleChange.bind(this)}/>

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
                </div>
                <CollapsibleMenu>
                    <CollapsibleMenuItem label="History">
                        <RevisionsView id={id} component="resource"/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Security">
                        <SecurityView accesscontrol={fasit.data.accesscontrol}/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>

                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onSubmit={() => this.handleSubmitForm(id, null, this.state.comment, "deleteResource")}
                    handleChange={this.handleChange.bind(this)}
                    comment={this.state.comment}

                />
                {<SubmitForm
                    display={this.state.displaySubmitForm}
                    component="resource"
                    onSubmit={(key, form, comment, component) => this.handleSubmitForm(key, form, comment, component)}
                    onClose={() => this.toggleComponentDisplay("displaySubmitForm")}
                    displayDiff={false}
                    newValues={{}}
                    originalValues={{}}
                />}

            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        fasit: state.resource_fasit,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        //environmentNames: state.environments.environments.filter(e => state.).map(e => e.name),
        zones: state.environments.zones,
        applications: state.applications.applicationNames,
        user: state.user,
        config: state.configuration,
    }
}

export default connect(mapStateToProps)(Resource)
