import React, {Component, PropTypes} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import {FormString, FormSecret, FormDropDown, FormComment, FormTextArea} from "../common/Forms";
import {colors} from "../../commonStyles/commonInlineStyles";
import {capitalize} from "../../utils";
import {displayModal, submitForm} from "../../actionCreators/common";
import {resourceTypes, getResourceTypeName} from "../../utils/resourceTypes";
import Scope from "./Scope";

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
            currentSecrets: {},
            comment: ""
        }
    }

    componentWillReceiveProps(next) {
        const {resource} = this.props
        const {alias, type, properties, scope, files} = resource.data

        if (next.mode === "edit" || next.mode === "copy") {
            this.setState({
                alias,
                type,
                properties,
                scope,
                files,
                currentSecrets: next.currentSecrets
            })
        }
        else {
            this.resetLocalState()
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
        const {dispatch, resource, mode} = this.props
        const {alias, type, properties, scope, files, comment, currentSecrets} = this.state
        const form = {
            alias,
            type,
            properties,
            scope,
        }

        if (Object.keys(currentSecrets).length > 0) {
            form.secrets = {}
            Object.keys(currentSecrets).forEach(k => {
                form.secrets[k] = {value: currentSecrets[k]}
            })
        }

        if (Object.keys(files).length > 0) {
            form.files = files
        }

        if (mode === "edit") {
            dispatch(submitForm(resource.data.id, form, comment, "resource"))
        }
        else {
            dispatch(submitForm(form.alias, form, comment, "newResource"))
        }
    }

    closeForm() {
        this.initialState()
        this.props.dispatch(displayModal("resource", false))
    }

    renderProperty(property) {
        const key = property.name
        const label = `${property.displayName}${property.required === true ? " *" : ""}`
        const {currentSecrets} = this.state
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
            case "link":
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
                return <FormSecret key={key}
                                   label={label}
                                   field={key}
                                   editMode={true}
                                   value={currentSecrets[key]}
                                   parent={'currentSecrets'}
                                   handleChange={this.handleChange.bind(this)}/>
            case "file":
                break
            default:

        }
    }

    getResourceType(typeKey) {
        if (!typeKey) {
            return ""
        }
        const key = Object.keys(resourceTypes)
            .filter(resourceType => resourceType.toLowerCase() === typeKey.toLowerCase())[0]

        return resourceTypes[key]
    }

    renderProperties() {
        const resourceType = this.getResourceType(this.state.type)
        if (resourceType !== "") {
            const properties = resourceType.properties
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

        const resourceType = this.getResourceType(this.state.type)
        const requiredProperties = resourceType.properties.filter(p => p.required).map(p => p.name)
        const currentProperties = keys(this.state.properties)
            .concat(keys(this.state.currentSecrets)
            .concat(keys(this.state.files)))
            .filter(prop => requiredProperties.includes(prop))

        return requiredProperties.length === currentProperties.length
    }


    showSubmitButton() {
        if (this.state.type !== "") {
            return <RaisedButton
                disableTouchRipple={true}
                backgroundColor={colors.toolbarBackground}
                labelColor={colors.white}
                disabled={!this.isValid()}
                label="submit"
                onTouchTap={this.handleSubmitForm.bind(this, true)}/>
        }
    }

    loginWarning(authenticated) {
        if (!authenticated) {
            return <div className="alert alert-info">You need to log in before creating a resource</div>
        }
    }

    render() {
        const {showNewResourceForm, types, user, mode, resource} = this.props
        let authenticated = user.authenticated
        const resourceType = getResourceTypeName(this.state.type)

        return (
            <Modal show={showNewResourceForm} onHide={this.closeForm.bind(this)} dialogClassName="newResourceForm">
                <Modal.Header>
                    <Modal.Title>
                        <span className="fa-stack fa-lg">
                            <i className="fa fa-circle fa-stack-2x"/>
                            <i className="fa fa-cogs fa-stack-1x fa-inverse"/>
                        </span> &emsp;{mode && `${capitalize(mode)} resource ${mode !== 'new' ? resource.data.id : ''}` }
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
                        value={resourceType}
                        editMode={true}
                        handleChange={this.handleChange.bind(this)}
                        options={types}
                        disabled={mode !== 'new' || !authenticated}/>
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
        currentSecrets: state.resource_fasit.currentSecrets,
        applications: state.applications.applicationNames,
        types: Object.keys(resourceTypes).sort(),
        environments: state.environments.environments,
        zones: state.environments.zones,
        user: state.user,
        resource: state.resource_fasit,
        mode: state.resources.mode
    }
}

export default connect(mapStateToProps)(NewResourceForm)
