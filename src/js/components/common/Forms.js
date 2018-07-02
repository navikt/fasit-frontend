import React, { Component, PropTypes } from "react"
import Select, { Creatable } from "react-select"
import { Tooltip, OverlayTrigger } from "react-bootstrap"
import { Link } from "react-router"
import { capitalize } from "../../utils/"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import TextField from "material-ui/TextField"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const copyToClipboard = element => {
  let el = document.getElementById(element)
  let range = document.createRange()
  range.selectNodeContents(el)
  let sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)

  document.execCommand("copy")
}

const overlayProps = {
  placement: "right",
  trigger: "click",
  rootClose: true,
  overlay: <Tooltip id="copied">Copied to clipboard</Tooltip>
}

function convertToSelectObject(values) {
  return values.map(value => {
    return { value: value, label: value }
  })
}

const floatingLabelStyle = { color: "#757575", fontSize: "16px" }
const underlineFocusStyle = { borderBottomColor: "#268bd2" }
const floatingLabelFocusStyle = { color: "#268bd2", fontSize: "16px" }

export function MaterialDropDown(props) {
  const { label, field, value, options, onChange, fullWidth } = props

  return (
    <SelectField
      fullWidth={fullWidth === undefined ? true : fullWidth}
      value={value}
      floatingLabelStyle={floatingLabelStyle}
      floatingLabelFixed={true}
      id={field}
      onChange={(e, idx, newValue) => onChange(field, newValue)}
      floatingLabelText={label}
    >
      {options.map((option, idx) => (
        <MenuItem
          key={idx}
          value={option}
          primaryText={option || `All ${field}s`}
        />
      ))}
    </SelectField>
  )
}

export function MaterialTextBox(props) {
  const { label, field, value, onChange, fullWidth, hintText, ...other } = props

  return (
    <TextField
      id={field}
      floatingLabelText={label}
      fullWidth={fullWidth === undefined ? true : fullWidth}
      underlineFocusStyle={underlineFocusStyle}
      floatingLabelFocusStyle={floatingLabelFocusStyle}
      floatingLabelStyle={floatingLabelStyle}
      floatingLabelFixed={hintText ? true : false}
      hintText={hintText || null}
      value={value || ""}
      onChange={(event, newValue) => onChange(event.target.id, newValue)}
      {...other}
    />
  )
}

export function MaterialTextArea(props) {
  const { label, field, value, onChange, fullWidth, ...other } = props

  return (
    <TextField
      fullWidth={fullWidth === undefined ? true : fullWidth}
      underlineFocusStyle={underlineFocusStyle}
      floatingLabelFocusStyle={floatingLabelFocusStyle}
      floatingLabelStyle={floatingLabelStyle}
      id={field}
      floatingLabelText={label}
      multiLine={true}
      rowsMax={10}
      value={value || ""}
      onChange={(event, newValue) => onChange(event.target.id, newValue)}
      {...other}
    />
  )
}

export function FormCreatableList(props) {
  const { label, value, editMode, handleChange, parent } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel text-left">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9">
        {editMode ? (
          <Creatable
            clearable={true}
            type="text"
            multi={true}
            className="text-left"
            placeholder="Start typing..."
            value={convertToSelectObject(value)}
            onChange={e =>
              handleChange(label, e.map(item => item.value), parent)
            }
          />
        ) : (
          <pre className="col-md-8">
            {value.map((v, i) => (
              <span key={i}>
                <Link to={`/${label}/${v}`}>{v}</Link>
                {`\n`}
              </span>
            ))}
          </pre>
        )}
      </div>
    </div>
  )
}

export function FormListBox(props) {
  const { label, value, editMode, handleChange, options, field, parent } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9">
        {editMode ? (
          <Select
            backspaceRemoves={false}
            clearable={true}
            type="text"
            name="node-type"
            multi={true}
            value={convertToSelectObject(value)}
            options={convertToSelectObject(options)}
            onChange={e =>
              handleChange(field || label, e.map(item => item.value), parent)
            }
          />
        ) : value.length > 0 ? (
          <pre className="col-md-8">
            {value.map((v, i) => (
              <span key={i}>
                <Link to={`/${label}/${v}`}>{v}</Link>
                {`\n`}
              </span>
            ))}
          </pre>
        ) : (
          <span className="FormValue">-</span>
        )}
      </div>
    </div>
  )
}

export function FormDropDown(props) {
  const {
    label,
    value,
    editMode,
    disabled,
    handleChange,
    options,
    field,
    parent
  } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9 FormDropDown">
        {editMode ? (
          <Select
            backspaceRemoves={false}
            clearable={false}
            type="text"
            name="node-type"
            disabled={disabled}
            value={value}
            options={convertToSelectObject(options)}
            onChange={e => handleChange(field || label, e.value, parent)}
          />
        ) : (
          <OverlayTrigger {...overlayProps}>
            <span
              className="FormValue"
              id={label}
              onClick={() => copyToClipboard(label)}
            >
              {value}
            </span>
          </OverlayTrigger>
        )}
      </div>
    </div>
  )
}

export function FormLinkDropDown(props) {
  const {
    label,
    value,
    editMode,
    disabled,
    handleChange,
    options,
    field,
    parent,
    linkTo
  } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9 FormDropDown">
        {editMode ? (
          <Select
            backspaceRemoves={false}
            clearable={false}
            type="text"
            name="node-type"
            disabled={disabled}
            value={value}
            options={convertToSelectObject(options)}
            onChange={e => handleChange(field || label, e.value, parent)}
          />
        ) : (
          <Link to={props.linkTo}>{value}</Link>
        )}
      </div>
    </div>
  )
}

export function FormLink(props) {
  const {
    label,
    value,
    editMode,
    handleChange,
    disabled,
    field,
    linkTo
  } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9">
        {editMode && !disabled ? (
          <input
            type="text"
            value={value || ""}
            className="FormInputField FormString-value"
            onChange={e => handleChange(field || label, e.target.value, parent)}
          />
        ) : (
          <span className="FormValue">
            <Link to={linkTo}>{value}</Link>
          </span>
        )}
      </div>
    </div>
  )
}

export function FormString(props) {
  const {
    label,
    value,
    editMode,
    handleChange,
    disabled,
    field,
    parent
  } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9">
        {editMode && !disabled ? (
          <input
            type="text"
            value={value || ""}
            className="FormInputField FormString-value"
            onChange={e => handleChange(field || label, e.target.value, parent)}
          />
        ) : (
          <OverlayTrigger {...overlayProps}>
            <span
              className="FormValue"
              id={label}
              onClick={() => copyToClipboard(label)}
            >
              {value}
            </span>
          </OverlayTrigger>
        )}
      </div>
    </div>
  )
}

export function FormTextArea(props) {
  const {
    label,
    value,
    editMode,
    handleChange,
    disabled,
    field,
    parent
  } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9">
        {editMode && !disabled ? (
          <textarea
            value={value || ""}
            rows="10"
            className="TextAreaInputField FormString-value"
            onChange={e => handleChange(field || label, e.target.value, parent)}
          />
        ) : (
          <OverlayTrigger {...overlayProps}>
            <span
              className="FormValue"
              id={label}
              onClick={() => copyToClipboard(label)}
            >
              {value}
            </span>
          </OverlayTrigger>
        )}
      </div>
    </div>
  )
}

export function FormComment(props) {
  const { value, handleChange } = props
  return (
    <div className="row">
      <div className="col-md-3 FormLabel text-left">
        <b>Comment</b>
      </div>
      <div className="col-xs-9">
        <textarea
          type="text"
          className="TextAreaInputField FormString-value"
          style={{ height: 85 + "px" }}
          value={value}
          onChange={e => handleChange("comment", e.target.value)}
        />
      </div>
    </div>
  )
}
