import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils'
import {fetchFasitData, fetchResourceSecret, clearResourceSecret} from '../../actionCreators/resource'
import {submitForm} from '../../actionCreators/common'
import classString from 'react-classset'
import moment from 'moment'


import {
    FormString,
    FormList,
    FormSecret,
    Lifecycle,
    RevisionsView,
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

            id: newState.data.id,
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

    resetLocalState() {
        this.setNewState(this.props)
    }

    toggleComponentDisplay(component) {
        const {dispatch} = this.props
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode) {
            this.resetLocalState()
        }
        if (component === "editMode" && !this.state.editMode)
            dispatch(fetchResourceSecret())
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

    renderResourceProperties(properties) {

        if (properties) {
            return Object.keys(properties).map(prop => {

                return <FormString
                    key={prop}
                    label={prop}
                    editMode={this.state.editMode}
                    value={properties[prop]}
                    handleChange={this.handleChange.bind(this)}/>
            })
        }
    }

    renderSecrets(secrets) {
        const {user} = this.props

        if(secrets) {
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
        } else return <div></div>
    }


    render() {
        const {id, fasit, user, dispatch, resourceTypes} = this.props

        let authenticated = false
        let lifecycle = {}

        if (Object.keys(fasit.data).length > 0) {
            authenticated = checkAuthentication(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }
        return (
            <div className="row">
                <div className="col-xs-12 row main-data-container">
                    <div className="col-sm-8 nopadding nowrap">
                        <ul className="nav navbar-nav navbar-left">
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated, "edit")}
                                        onClick={authenticated ? () => this.toggleComponentDisplay("editMode") : () => {
                                            }}>
                                    <i className="fa fa-wrench fa-2x"/>
                                </button>
                            </li>
                            <li>
                                <button type="button" className={this.buttonClasses(authenticated)}
                                        onClick={authenticated ? () => this.toggleComponentDisplay("deleteMode") : () => {
                                            }}>
                                    <i className="fa fa-trash fa-2x"/></button>
                            </li>
                        </ul>
                        <span className="navbar-text">Last updated: {moment(this.state.updated).locale('en').fromNow()}</span>
                    </div>
                </div>

                <div className="col-md-6">
                    <FormString label="type" editMode={false} value={this.state.type}
                                handleChange={this.handleChange.bind(this)}/>
                    <FormString label="alias" editMode={this.state.editMode} value={this.state.alias}
                                handleChange={this.handleChange.bind(this)}/>
                    {this.renderResourceProperties(this.state.properties)}
                    {this.renderSecrets(this.state.secrets)}
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        fasit: state.resource_fasit,
        user: state.user,
        config: state.configuration,
    }
}

export default connect(mapStateToProps)(Resource)
