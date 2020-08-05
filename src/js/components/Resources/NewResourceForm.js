import React, { Component } from "react"
import PropTypes from "prop-types"
import { colors, styles } from "../../commonStyles/commonInlineStyles"
//import { Modal } from "react-bootstrap"
import { connect } from "react-redux"
//import RaisedButton from "material-ui/RaisedButton"
//import FlatButton from "material-ui/FlatButton"
import {
  //  MaterialDropDown,
  //MaterialTextArea,
  //MaterialTextBox,
  FormComment,
  FormSubmitButton,
  FormString,
  FormDropDown,
} from "../common/Forms"
import { Card } from "../common/Card"
/*import {
  colors,
  icons,
  styles,
  styleSet
} from "../../commonStyles/commonInlineStyles"*/
import { capitalize } from "../../utils"
import { /*displayModal,*/ submitForm } from "../../actionCreators/common"
import { getResourceTypeName, resourceTypes } from "../../utils/resourceTypes"
//import Chip from "material-ui/Chip"
import Scope from "./Scope"
import LoginRequiredPanel from "../common/LoginRequiredPanel"

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
        environmentclass: "u",
        environment: null,
        zone: null,
        application: null,
      },
      currentFiles: {},
      currentSecrets: {},
      validationErrors: null,
      comment: "",
    }
  }

  UNSAFE_componentWillReceiveProps(next) {
    const { resource } = this.props
    const { alias, type, properties, scope, files } = resource.data
    if (next.mode === "edit") {
      this.setState({
        alias,
        type,
        properties,
        scope,
        files,
        currentSecrets: next.currentSecrets,
      })
    } else if (next.mode === "copy") {
      this.setState({
        alias,
        type,
        properties,
        scope,
        files,
      })
    } else {
      this.resetLocalState()
    }
  }

  resetLocalState() {
    this.setState({
      alias: "",
      properties: {},
      files: {},
      currentSecrets: {},
      currentFiles: {},
      comment: "",
      validationErrors: null,
    })
  }

  handleChange(field, newValue, parent) {
    if (field === "type" && this.state.type !== newValue) {
      this.resetLocalState()
    }

    if (parent) {
      const parentState = this.state[parent]
      parentState[field] = newValue
      this.setState({ parent: parentState })
    } else {
      this.setState({ [field]: newValue })
    }
  }

  removeEmpty(obj) {
    const cleanObj = { ...obj }
    Object.keys(cleanObj).forEach((key) => {
      if (!cleanObj[key]) {
        delete cleanObj[key]
      }
    })
    return cleanObj
  }

  handleSubmitForm() {
    const { dispatch, resource, mode } = this.props
    const {
      alias,
      type,
      properties,
      files,
      comment,
      currentSecrets,
      currentFiles,
    } = this.state

    //if (!this.isValid()) {
    // this.setState({ validationErrors: true })
    //} else {
    const scope = this.removeEmpty(this.state.scope)
    const form = {
      alias: alias.trim(),
      type,
      properties,
      scope,
    }

    if (Object.keys(currentSecrets).length > 0) {
      form.secrets = currentSecrets
    }

    if (Object.keys(currentFiles).length > 0) {
      form.files = {}
      Object.keys(currentFiles).forEach((k) => {
        form.files[k] = {
          filename: currentFiles[k].name,
          filecontent: currentFiles[k].data,
        }
      })
    }
    if (mode === "edit") {
      dispatch(submitForm(resource.data.id, form, comment, "resource"))
    } else {
      dispatch(submitForm(form.alias, form, comment, "newResource"))
      //this.initialState()
    }
    // }
  }

  handleFileUpload(field, event) {
    const FILE = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (upload) => {
      const base64 = upload.target.result
      const files = {}
      files[field] = { name: FILE.name, data: base64 }
      this.setState({ currentFiles: files })
    }

    reader.readAsDataURL(FILE)
  }

  /*displayValidationError(prop, isRequired) {
    const { validationErrors } = this.state

    return validationErrors && isRequired && (!prop || prop === "")
  }*/

  renderProperty(property) {
    const key = property.name
    const label = `${property.displayName}${
      property.required === true ? " *" : ""
    }`
    //const { properties, currentSecrets, currentFiles } = this.state

    /*const SecretInput = ({ key, value }) => (
      <FormString
        key={key}
        field={key}
        /*errorText={
          this.displayValidationError(currentSecrets[key], property.required)
            ? "Required secret "
            : null
        }
        value={value}
        label={label}
        onChange={(field, newValue) =>
          this.handleChange(field, { value: newValue }, "currentSecrets")
        }
      />
    )*/

    /* const VaultPathInput = ({ key, value }) => (
      <FormString
        key={key}
        field={key}
        errorText={
          this.displayValidationError(properties[key], property.required)
            ? "Required property "
            : null
        }
        value={value}
        label={`${label} (Vault Path)`}
        onChange={(field, newValue) =>
          this.handleChange(field, { vaultpath: newValue }, "currentSecrets")
        }
      />
    )*/

    //const currentSecret = this.state.currentSecrets[key]
    //console.log("hja", property.type)

    switch (property.type) {
      case "textbox":
        return (
          <FormString
            key={key}
            field={key}
            /*errorText={
              this.displayValidationError(properties[key], property.required)
                ? "Required property "
                : null
            }*/
            hintText={property.hint}
            value={this.state.properties[key]}
            label={label}
            handleChange={(field, newValue) =>
              this.handleChange(field, newValue, "properties")
            }
          />
        )
      case "textarea":
      case "link":
        return (
          <FormTextArea
            key={key}
            field={key}
            /*errorText={
              this.displayValidationError(properties[key], property.required)
                ? "Required property "
                : null
            }*/
            value={this.state.properties[key]}
            label={label}
            handleChange={(field, newValue) =>
              this.handleChange(field, newValue, "properties")
            }
          />
        )
      case "dropdown":
        return (
          <FormDropDown
            key={key}
            field={key}
            value={this.state.properties[key]}
            label={label}
            options={property.options}
            handleChange={(field, newValue) =>
              this.handleChange(field, newValue, "properties")
            }
          />
        )
      case "secret":
      case "vaultPath":
        return null
      /*if (currentSecret == null) {
          if (property.type == "vaultPath") {
            return VaultPathInput({ key, value: "" })
          } else {
            return SecretInput({ key, value: "" })
          }
        } else if (currentSecret.vaultpath != null) {
          return VaultPathInput({ key, value: currentSecret.vaultpath })
        } else if (currentSecret.value != null) {
          return SecretInput({ key, value: currentSecret.value })
        } else {
          return (
            <div>
              Error: Unknown secret format. (Bug in fasit or fasit-frontend)
            </div>
          )
        }*/
      case "file":
        return null
        /*return (
          <div
            className="row"
            key={key}
            style={{ display: "flex", paddingTop: "10px", marginLeft: "2px" }}
          >
            <RaisedButton
              backgroundColor={colors.avatarBackgroundColor}
              labelColor={colors.white}
              containerElement="label"
              disableTouchRipple={true}
              label={`Upload ${label}`}
              icon={icons.fileUpload}
              onChange={event => this.handleFileUpload(key, event)}
            >
              <input type="file" style={{ display: "none" }} multiple={false} />
            </RaisedButton>
            {this.displayValidationError(
              currentFiles[key],
              property.required
            ) ? (
              <div
                style={styleSet([
                  styles.marginLeft5,
                  styles.red,
                  styles.paddingTop5
                ])}
              >
                Required file
              </div>
            ) : null}
            {this.state.currentFiles[key] && (
              <Chip style={styles.marginLeft5}>
                {icons.fileAvatar}
                {this.state.currentFiles[key].name}
              </Chip>
            )}
          </div>
        )*/
        break
      default:
        return <div>Unknown resource type {property.type}</div>
    }
  }

  getResourceType(typeKey) {
    if (!typeKey) {
      return ""
    }
    const key = Object.keys(resourceTypes).filter(
      (resourceType) => resourceType.toLowerCase() === typeKey.toLowerCase()
    )[0]

    return resourceTypes[key]
  }

  renderProperties() {
    const resourceType = this.getResourceType(this.state.type)
    if (resourceType !== "") {
      const properties = resourceType.properties
      return (
        <div>
          <FormString
            field="alias"
            value={this.state.alias}
            /*errorText={
              this.state.validationErrors && !this.state.alias
                ? "Required property "
                : null
            }*/
            label="Alias*"
            handleChange={this.handleChange.bind(this)}
          />
          {properties.map((property) => this.renderProperty(property))}
        </div>
      )
    }
  }

  /*isValid() {
    function keys(prop) {
      return Object.keys(prop)
    }

    if (!this.state.alias) {
      return false
    }

    const resourceType = this.getResourceType(this.state.type)
    const requiredProperties = resourceType.properties
      .filter(p => p.required)
      .map(p => p.name)
    const currentProperties = keys(this.state.properties)
      .concat(
        keys(this.state.currentSecrets).concat(keys(this.state.currentFiles))
      )
      .filter(
        prop =>
          requiredProperties.includes(prop) &&
          this.state.properties[prop] !== ""
      )

    return requiredProperties.length === currentProperties.length
  }*/

  render() {
    if (!this.props.user.authenticated) {
      return <LoginRequiredPanel />
    }

    const { types, resource, match } = this.props
    const resourceType = getResourceTypeName(this.state.type)
    const resourceIdToModify = match.params.resource

    if (!this.props.user.authenticated) {
      return (
        <div style={{ paddingTop: "1rem" }} className="col-md-6">
          <Alert transition={false} variant="danger">
            Please login to use this page
          </Alert>
        </div>
      )
    }

    return (
      <div className="col-md-5" style={styles.cardPadding}>
        <h3>{`${resourceIdToModify ? "Edit" : "New"} resource`}</h3>
        <div className="row">
          <div className="col-md-12">
            <FormDropDown
              field="type"
              value={resourceType}
              label="Type"
              options={types}
              handleChange={this.handleChange.bind(this)}
              //fullWidth={false}
            />
          </div>
        </div>
        {this.renderProperties()}
        <Scope
          editMode={true}
          scope={this.state.scope}
          handleChange={this.handleChange.bind(this)}
        />

        <div className="row">
          <div className="col-md-12">
            <FormComment
              field="comment"
              value={this.state.comment}
              label={"Comment"}
              handleChange={this.handleChange.bind(this)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormSubmitButton
              handleChange={this.handleSubmitForm.bind(this, true)}
              disabled={!this.state.type || this.state.type === ""}
            />
          </div>
        </div>
      </div>
    )
  }
}
NewResourceForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
    mode: state.resources.mode,
  }
}

export default connect(mapStateToProps)(NewResourceForm)
