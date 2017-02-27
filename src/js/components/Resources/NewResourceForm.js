import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {FormString, FormDropDown, FormComment, FormTextArea} from '../common/Forms'

import {showNewComponentForm} from '../../actionCreators/common'
import {resourceTypes} from '../../utils/resourceTypes'
import {submitForm} from '../../actionCreators/common'

class NewResourceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alias: "",
            type: "",
            properties: {},
            files: {},
            secrets: {}
        }
    }

    resetLocalState() {
        /* this.setState({
         hostname: "",
         username: "",
         password: "",
         type: "",
         environment: "",
         environmentclass: "",
         zone: ""
         })*/
    }

    handleChange(field, value, parent) {
        console.log("parent", parent, field, value)

        if (parent) {
            const parentState = this.state[parent]
            parentState[field] = value
            this.setState({parent: parentState})
        } else {
            this.setState({[field]: value})
        }
    }

    handleSubmitForm() {
        /*const {dispatch} = this.props
         const {hostname, username, password, type, environment, environmentclass, comment} = this.state
         const form = {
         hostname,
         username,
         password: {value: password},
         type,
         environment,
         environmentclass,
         }
         if (!(environmentclass === 'u')) {
         form["zone"] = this.state.zone
         }
         dispatch(submitForm(form.hostname, form, comment, "newNode"))*/
    }

    closeForm() {
        const {dispatch} = this.props
        this.resetLocalState()
        dispatch(showNewComponentForm("resource", false))
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
                break
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
                console.log("FILE ", property.name, property.displayName, property.required)
                break
            default:
                console.log("Missing ", property.type, "for ", type)

        }
    }

    renderProperties() {
        const type = this.state.type
        console.log(this.state)
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

    showSubmitButton() {
        /*const {hostname, username, password, type, environmentclass, environment, zone} = this.state
         if (hostname && username && password && type && environmentclass && environment) {
         if ((zone) || (environmentclass === 'u')) {
         return (
         <button type="submit"
         className="btn btn-primary pull-right"
         onClick={this.handleSubmitForm.bind(this, true)}>Submit
         </button>
         )
         }
         }
         return <button type="submit" className="btn btn-primary pull-right disabled">Submit</button>*/

    }

    render() {
        const {environmentClasses, showNewResourceForm, zones, types} = this.props
        return (
            <Modal show={showNewResourceForm} onHide={this.closeForm.bind(this)} dialogClassName="newResourceForm">
                <Modal.Header>
                    <Modal.Title>New resource
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={this.closeForm.bind(this)}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormDropDown label="Type" field="type" value={this.state.type} editMode={true}
                                  handleChange={this.handleChange.bind(this)} options={types}/>
                    {this.renderProperties()}
                    <div className="col-xs-12" style={{height: 15 + 'px'}}></div>
                </Modal.Body>
                <Modal.Footer>
                    <FormComment
                        value={this.state.comment}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <div className="row">
                        {/*<div className="row col-lg-10 col-lg-offset-2">
                         {this.showSubmitButton()}
                         </div>*/}
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

    environmentSelector() {
        const {environments} = this.props
        const {environmentclass} = this.state
        if (environmentclass) {
            const filteredEnvironments = environments.filter((env) => {
                if (!environmentclass) {
                    return true
                } else {
                    return env.environmentclass === environmentclass
                }
            })
            return (
                <FormDropDown
                    label="environment"
                    editMode={true}
                    value={this.state.environment}
                    handleChange={this.handleChange.bind(this)}
                    options={filteredEnvironments.map((env) => env.name)}
                />)
        }
    }

    zoneSelector() {
        const {zones} = this.props
        const {environmentclass} = this.state
        if (environmentclass && environmentclass !== 'u') {
            return (
                <FormDropDown
                    label="zone"
                    editMode={true}
                    value={this.state.zone}
                    handleChange={this.handleChange.bind(this)}
                    options={zones}
                />)
        }
    }

}
NewResourceForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        showNewResourceForm: state.resources.showNewResourceForm,
        environmentClasses: state.environments.environmentClasses,
        types: Object.keys(resourceTypes).sort(),
        environments: state.environments.environments,
        zones: state.environments.zones
    }
}

export default connect(mapStateToProps)(NewResourceForm)
