import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {FormString, FormDropDown, FormComment, FormTextArea} from '../common/Forms'

import {displayModal} from '../../actionCreators/common'
import {resourceTypes} from '../../utils/resourceTypes'
import {submitForm} from '../../actionCreators/common'
import Scope from './Scope'

class NewResourceForm extends Component {
    constructor(props) {
        super(props)
        this.initialState()
    }

    initialState() {
        this.state = {
            alias: "",
            type: "",
            properties: {},
            scope: {
                environmentclass: 'u'
            },
            files: {},
            secrets: {},
            comment: ""
        }
    }

    resetLocalState() {
        this.setState({
            alias: "",
            properties: {},
            files: {},
            secrets: {},
            comment: ""
        })
    }

    handleChange(field, value, parent) {
        if (field === "type" && this.state.type !== value) {
            this.resetLocalState()
        }
        if (parent) {
            const parentState = this.state[parent]
            parentState[field] = value
            this.setState({parent: parentState})
        } else {
            this.setState({[field]: value})
        }
    }

    handleSubmitForm() {
        const {dispatch} = this.props
        const {alias, type, properties, scope, secrets, files, comment} = this.state
        const form = {
            alias,
            type,
            properties,
            scope,
        }

        if(Object.keys(secrets).length > 0 ) {
            form.secrets = {}
            Object.keys(secrets).forEach(k => {
                form.secrets[k] = {value: secrets[k]}

            })

        }

        if(Object.keys(files).length > 0 ) {
            form.files = files
        }

        dispatch(submitForm(form.alias, form, comment, "newResource"))
    }



    closeForm() {
        this.initialState()
        this.props.dispatch(displayModal("resource", false))
    }

    renderProperty(property) {
        const key = property.name
        const label = `${property.displayName}${property.required === true ? " *" : ""}`
        const field = property.name

        switch (property.type) {
            case "textbox":
                return <FormString key={key}
                                   label={label}
                                   field={field}
                                   editMode={true}
                                   value={this.state.properties[property.name]}
                                   parent="properties"
                                   handleChange={this.handleChange.bind(this)}/>

            case "textarea":
                return <FormTextArea key={key}
                                     label={label}
                                     field={field}
                                     editMode={true}
                                     value={this.state.properties[property.name]}
                                     parent="properties"
                                     handleChange={this.handleChange.bind(this)}/>
            case "dropdown":
                return <FormDropDown key={key}
                                     label={label}
                                     field={field}
                                     value={this.state.properties[property.name]}
                                     editMode={true}
                                     handleChange={this.handleChange.bind(this)}
                                     options={property.options}/>
            case "secret":
                return <FormString key={key}
                                   label={label}
                                   field={field}
                                   editMode={true}
                                   value={this.state.secrets[property.name]}
                                   parent="secrets"
                                   handleChange={this.handleChange.bind(this)}/>
            case "file":
                break
            default:

        }
    }

    renderProperties() {
        const type = this.state.type
        if (type !== "") {
            const properties = resourceTypes[type].properties
            return (
                <div>
                    <FormString label="alias*"
                                field="alias"
                                editMode={true}
                                value={this.state.alias}
                                handleChange={this.handleChange.bind(this)}/>
                    {properties.map(this.renderProperty.bind(this))}
                </div>
            )
        }
    }


    isValid() {
        function keys(prop) {
            return Object.keys(prop)
        }

        if (!this.state.alias) {
            return false
        }

        const currentProperties = keys(this.state.properties).concat(keys(this.state.secrets).concat(keys(this.state.files)))
        const requiredProperties = resourceTypes[this.state.type].properties.filter(p => p.required).map(p => p.name)
        return requiredProperties.length === currentProperties.length
    }


    showSubmitButton() {
        if (this.state.type !== "") {
            if(this.isValid()) {
                return (
                    <button type="submit"
                            className="btn btn-primary pull-right"
                            onClick={this.handleSubmitForm.bind(this, true)}>Submit
                    </button>
                )
            }

           return (
                <button type="submit"
                        className="btn btn-primary pull-right disabled">Submit
                </button>
            )
        }
    }

    loginWarning(authenticated) {
        if(!authenticated) {
            return <div className="alert alert-info">You need to log in before creating a resource</div>
        }
    }

    render() {
        const {showNewResourceForm, types, user} = this.props
        let authenticated = user.authenticated

        return (
            <Modal show={showNewResourceForm} onHide={this.closeForm.bind(this)} dialogClassName="newResourceForm">
                <Modal.Header>
                    <Modal.Title>
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"/>
                            <i className="fa fa-cogs fa-stack-1x fa-inverse"/>
                        </span> &emsp;New resource
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={this.closeForm.bind(this)}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.loginWarning(authenticated)}
                    <FormDropDown
                        label="Type"
                        field="type"
                        value={this.state.type}
                        editMode={true}
                        handleChange={this.handleChange.bind(this)}
                        options={types}
                        disabled={!authenticated}/>
                    {this.renderProperties()}
                    <Scope editMode={true} scope={this.state.scope} handleChange={this.handleChange.bind(this)}/>
                </Modal.Body>
                <Modal.Footer>
                    <FormComment
                        value={this.state.comment}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <div className="row">
                        <div className="row col-lg-10 col-lg-offset-2">
                            {this.showSubmitButton()}
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}
NewResourceForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        showNewResourceForm: state.resources.showNewResourceForm,
        environmentClasses: state.environments.environmentClasses,
        applications: state.applications.applicationNames,
        types: Object.keys(resourceTypes).sort(),
        environments: state.environments.environments,
        zones: state.environments.zones,
        user: state.user
    }
}

export default connect(mapStateToProps)(NewResourceForm)
