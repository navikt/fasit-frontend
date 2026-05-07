import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { Modal } from "../common/Modal"
import { connect } from "react-redux"
import Button from "@mui/material/Button"
import {
  MaterialDropDown,
  MaterialTextArea,
  MaterialTextBox
} from "../common/Forms"
import {
  colors,
  icons,
  styles,
  styleSet
} from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils"
import { displayModal, submitForm } from "../../actionCreators/common"
import { getResourceTypeName, resourceTypes } from "../../utils/resourceTypes"
import Chip from "@mui/material/Chip"
import Scope from "./Scope"

function NewResourceForm({ dispatch, showNewResourceForm, environmentClasses, currentSecrets: propCurrentSecrets, applications, types, environments, zones, user, resource, mode }) {
  const [alias, setAlias] = useState("")
  const [type, setType] = useState("")
  const [properties, setProperties] = useState({})
  const [scope, setScope] = useState({
    environmentclass: "u",
    environment: null,
    zone: null,
    application: null
  })
  const [currentFiles, setCurrentFiles] = useState({})
  const [currentSecrets, setCurrentSecrets] = useState({})
  const [validationErrors, setValidationErrors] = useState(null)
  const [comment, setComment] = useState("")
  const [files, setFiles] = useState({})

  const resetFormState = () => {
    setAlias("")
    setType("")
    setProperties({})
    setScope({
      environmentclass: "u",
      environment: null,
      zone: null,
      application: null
    })
    setCurrentFiles({})
    setCurrentSecrets({})
    setValidationErrors(null)
    setComment("")
    setFiles({})
  }

  const resetLocalState = () => {
    setAlias("")
    setProperties({})
    setFiles({})
    setCurrentSecrets({})
    setCurrentFiles({})
    setComment("")
    setValidationErrors(null)
  }

  useEffect(() => {
    const { data } = resource
    const { alias: rAlias, type: rType, properties: rProps, scope: rScope, files: rFiles } = data
    if (mode === "edit") {
      setAlias(rAlias)
      setType(rType)
      setProperties(rProps)
      setScope(rScope)
      setFiles(rFiles)
      setCurrentSecrets(propCurrentSecrets)
    } else if (mode === "copy") {
      setAlias(rAlias)
      setType(rType)
      setProperties(rProps)
      setScope(rScope)
      setFiles(rFiles)
    } else {
      resetLocalState()
    }
  }, [mode, resource, propCurrentSecrets]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (field, newValue, parent) => {
    if (field === "type" && type !== newValue) {
      resetLocalState()
    }

    if (parent) {
      switch (parent) {
        case "properties":
          setProperties(prev => ({ ...prev, [field]: newValue }))
          break
        case "currentSecrets":
          setCurrentSecrets(prev => ({ ...prev, [field]: newValue }))
          break
        case "scope":
          setScope(prev => ({ ...prev, [field]: newValue }))
          break
      }
    } else {
      switch (field) {
        case "alias": setAlias(newValue); break
        case "type": setType(newValue); break
        case "comment": setComment(newValue); break
        case "scope": setScope(newValue); break
      }
    }
  }

  const removeEmpty = (obj) => {
    const cleanObj = { ...obj }
    Object.keys(cleanObj).forEach(key => {
      if (!cleanObj[key]) {
        delete cleanObj[key]
      }
    })
    return cleanObj
  }

  const getResourceType = (typeKey) => {
    if (!typeKey) {
      return ""
    }
    const key = Object.keys(resourceTypes).filter(
      resourceType => resourceType.toLowerCase() === typeKey.toLowerCase()
    )[0]

    return resourceTypes[key]
  }

  const isValid = () => {
    function keys(prop) {
      return Object.keys(prop)
    }

    if (!alias) {
      return false
    }

    const resourceType = getResourceType(type)
    const requiredProperties = resourceType.properties
      .filter(p => p.required)
      .map(p => p.name)
    const currentProperties = keys(properties)
      .concat(
        keys(currentSecrets).concat(keys(currentFiles))
      )
      .filter(
        prop =>
          requiredProperties.includes(prop) &&
          properties[prop] !== ""
      )

    return requiredProperties.length === currentProperties.length
  }

  const handleSubmitForm = () => {
    if (!isValid()) {
      setValidationErrors(true)
    } else {
      const cleanScope = removeEmpty(scope)
      const form = {
        alias: alias.trim(),
        type,
        properties,
        scope: cleanScope
      }

      if (Object.keys(currentSecrets).length > 0) {
        form.secrets = currentSecrets;
      }

      if (Object.keys(currentFiles).length > 0) {
        form.files = {}
        Object.keys(currentFiles).forEach(k => {
          form.files[k] = {
            filename: currentFiles[k].name,
            filecontent: currentFiles[k].data
          }
        })
      }
      if (mode === "edit") {
        dispatch(submitForm(resource.data.id, form, comment, "resource"))
      } else {
        dispatch(submitForm(form.alias, form, comment, "newResource"))
      }
    }
  }

  const handleFileUpload = (field, event) => {
    const FILE = event.target.files[0]
    const reader = new FileReader()
    reader.onload = upload => {
      const base64 = upload.target.result
      const newFiles = {}
      newFiles[field] = { name: FILE.name, data: base64 }
      setCurrentFiles(newFiles)
    }

    reader.readAsDataURL(FILE)
  }

  const closeForm = () => {
    resetFormState()
    dispatch(displayModal("resource", false))
  }

  const displayValidationError = (prop, isRequired) => {
    return validationErrors && isRequired && (!prop || prop === "")
  }

  const renderProperty = (property) => {
    const key = property.name
    const label = `${property.displayName}${
      property.required === true ? " *" : ""
    }`

    const SecretInput = ({ key: k, value }) =>
      <MaterialTextBox
          key={k}
          field={k}
          errorText={
            displayValidationError(
                currentSecrets[k],
                property.required
            )
                ? "Required secret "
                : null
          }
          value={value}
          label={label}
          onChange={(field, newValue) =>
              handleChange(field, { value: newValue }, "currentSecrets")
          }
      />

    const VaultPathInput = ({ key: k, value }) =>
      <MaterialTextArea
          key={k}
          field={k}
          errorText={
            displayValidationError(properties[k], property.required)
                ? "Required property "
                : null
          }
          value={value}
          label={`${label} (Vault Path)`}
          onChange={(field, newValue) =>
              handleChange(field, { vaultpath: newValue }, "currentSecrets")
          }
      />

    const currentSecret = currentSecrets[key]

    switch (property.type) {
      case "textbox":
        return (
          <MaterialTextBox
            key={key}
            field={key}
            errorText={
              displayValidationError(properties[key], property.required)
                ? "Required property "
                : null
            }
            hintText={property.hint}
            value={properties[key]}
            label={label}
            onChange={(field, newValue) =>
              handleChange(field, newValue, "properties")
            }
          />
        )
      case "textarea":
      case "link":
        return (
          <MaterialTextArea
            key={key}
            field={key}
            errorText={
              displayValidationError(properties[key], property.required)
                ? "Required property "
                : null
            }
            value={properties[key]}
            label={label}
            onChange={(field, newValue) =>
              handleChange(field, newValue, "properties")
            }
          />
        )
      case "dropdown":
        return (
          <MaterialDropDown
            key={key}
            field={key}
            value={properties[key]}
            label={label}
            options={property.options}
            onChange={(field, newValue) =>
              handleChange(field, newValue, "properties")
            }
          />
        )
      case "secret":
      case "vaultPath":
        if (currentSecret == null) {
          if (property.type == "vaultPath") {
            return VaultPathInput({ key, value: "" })
          } else {
            return SecretInput({ key, value: "" })
          }
        } else if (currentSecret.vaultpath != null) {
          return VaultPathInput({ key, value: currentSecret.vaultpath })
        } else if (currentSecret.value != null) {
          return SecretInput({key, value: currentSecret.value })
        } else {
          return <div>Error: Unknown secret format. (Bug in fasit or fasit-frontend)</div>
        }
      case "file":
        return (
          <div
            className="row"
            key={key}
            style={{ display: "flex", paddingTop: "10px", marginLeft: "2px" }}
          >
            <Button
              variant="contained"
              style={{backgroundColor: colors.avatarBackgroundColor, color: colors.white}}
              component="label"
              disableRipple
              startIcon={icons.fileUpload}
              onChange={event => handleFileUpload(key, event)}
            >
              {`Upload ${label}`}
              <input type="file" style={{ display: "none" }} multiple={false} />
            </Button>
            {displayValidationError(
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
            {currentFiles[key] && (
              <Chip style={styles.marginLeft5}>
                {icons.fileAvatar}
                {currentFiles[key].name}
              </Chip>
            )}
          </div>
        )
        break
      default:
        return (
            <div>Unknown resource type {property.type}</div>
        )
    }
  }

  const renderProperties = () => {
    const resourceType = getResourceType(type)
    if (resourceType !== "") {
      const props = resourceType.properties
      return (
        <div>
          <MaterialTextBox
            field="alias"
            value={alias}
            errorText={
              validationErrors && !alias
                ? "Required property "
                : null
            }
            label="Alias*"
            onChange={handleChange}
          />
          {props.map(property => renderProperty(property))}
        </div>
      )
    }
  }

  const loginWarning = (authenticated) => {
    if (!authenticated) {
      return (
        <div className="alert alert-info">
          You need to log in before creating a resource
        </div>
      )
    }
  }

  let authenticated = user.authenticated
  const resourceType = getResourceTypeName(type)

  return (
    <Modal
      show={showNewResourceForm}
      animation={false}
      keyboard={true}
      enforceFocus={false}
      onHide={closeForm}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>
          <div>
            {icons.resourceAvator} &emsp;{mode &&
              `${capitalize(mode)} resource ${
                mode !== "new" ? resource.data.id : ""
              }`}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loginWarning(authenticated)}
        <MaterialDropDown
          field="type"
          value={type}
          label="Type"
          options={types}
          onChange={handleChange}
          fullWidth={false}
        />

        {renderProperties()}
        <br />
        <Scope
          editMode={true}
          scope={scope}
          handleChange={handleChange}
          environmentClasses={environmentClasses}
          environments={environments}
          applications={applications}
          zones={zones}
        />
        <MaterialTextBox
          field="comment"
          value={comment}
          label={"Comment"}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="row col-md-12" style={{ display: "flex", paddingLeft: "15px", margin: "8px", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            disableRipple
            disabled={!type || type === ""}
            onClick={handleSubmitForm}
            style={{backgroundColor: colors.avatarBackgroundColor, color: colors.white, width: "88px"}}
          >
            submit
          </Button>

          <Button
            variant="text"
            disableRipple
            onClick={closeForm}
            style={{ marginLeft: "8px", width: "88px" }}
          >
            cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

NewResourceForm.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
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
