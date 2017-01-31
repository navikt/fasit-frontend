import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils'
import {fetchFasitData} from '../../actionCreators/resource'
import {submitForm} from '../../actionCreators/submit_form'
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

class Resource extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displaySubmitForm: false,
            editMode: false,
            deleteMode: false
        }
    }

    componentDidMount() {
        const {dispatch, id} = this.props
        dispatch(fetchFasitData(id))
    }

    componentWillReceiveProps(nextProps) {
        this.setNewState(nextProps.fasit)
    }

    setNewState(newState) {
        console.log("Setting new state", newState)

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
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode) {
            this.resetLocalState()
        }
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
        const {id, fasit, user, dispatch} = this.props
        let authenticated = false
        let lifecycle = {}

        if (Object.keys(fasit.data).length > 0) {
            authenticated = checkAuthentication(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }
        return (
            <div className="row">
                <div className="col-xs-12 row main-data-container">
                    <div className="col-sm-2 nopadding">
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
                    </div>
                </div>


                <div className="col-md-6">
                    <FormString label="type" editMode={this.state.editMode} value={this.state.type} handleChange={this.handleChange.bind(this)}/>
                    <FormString label="alias" editMode={this.state.editMode} value={this.state.alias} handleChange={this.handleChange.bind(this)}/>
                    <FormString label="created" editMode={false} value={this.state.created} handleChange={this.handleChange.bind(this)}/>
                    <FormString label="updated" editMode={false} value={moment(this.state.updated).fromNow()} handleChange={this.handleChange.bind(this)}/>
                    {Object.keys(this.state.properties).map(prop => {
                        console.log("prop", prop)

                            return <FormString
                                label={prop}
                                editMode={this.state.editMode}
                                value={this.state.properties[prop]}
                                handleChange={this.handleChange.bind(this)}/>
                                })}
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        fasit: state.resource_fasit,
        user: state.user,
        //editMode: state.nodes.showEditNodeForm,
        //hostname: ownProps.hostname,
        config: state.configuration,
        id: ownProps.id
    }
}

export default connect(mapStateToProps)(Resource)
