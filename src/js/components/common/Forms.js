import React, { Component, useState } from "react"
import PropTypes from 'prop-types'
import Select, { Creatable } from "react-select"
import MuiTooltip from "@material-ui/core/Tooltip"
import { Link } from "react-router-dom"
import { capitalize } from "../../utils/"
import { FormControl, InputLabel, Select as MuiSelect } from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  floatingLabelStyle: { color: "#000000", fontSize: "16px" },
  selectedDropDownValue: { color: "#000000", fontSize: "16px" },
}));

const copyToClipboard = element => {
  let el = document.getElementById(element)
  let range = document.createRange()
  range.selectNodeContents(el)
  let sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)

  document.execCommand("copy")
}

function CopyableSpan({ label, value }) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    copyToClipboard(label)
    setOpen(true)
    setTimeout(() => setOpen(false), 1500)
  }

  return (
    <MuiTooltip
      title="Copied to clipboard"
      open={open}
      disableHoverListener
      disableFocusListener
      placement="right"
    >
      <span
        className="FormValue"
        id={label}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {value}
      </span>
    </MuiTooltip>
  )
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
  const classes = useStyles();

  return (
    <FormControl fullWidth={fullWidth === undefined ? true : fullWidth} className={classes.formControl}>
      <InputLabel className={classes.floatingLabelStyle}>{label}</InputLabel>
      <MuiSelect className={classes.selectedDropDownValue}
        value={value == null ? "" : value}
        id={field}
        onChange={(e) => onChange(field, e.target.value || null)}
      >
        {options.map((option, idx) => (
          <MenuItem
            key={idx}
            value={option == null ? "" : option}
          >{option || `All ${field}s`}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export function MaterialTextBox(props) {
  const { label, field, value, onChange, fullWidth, hintText, errorText, ...other } = props

  return (
    <TextField
      id={field}
      label={label}
      fullWidth={fullWidth === undefined ? true : fullWidth}
      placeholder={hintText || undefined}
      value={value || ""}
      error={!!errorText}
      helperText={errorText || undefined}
      onChange={(event) => onChange(event.target.id, event.target.value)}
      {...other}
    />
  )
}

export function MaterialTextArea(props) {
  const { label, field, value, onChange, fullWidth, errorText, ...other } = props

  return (
    <TextField
      fullWidth={fullWidth === undefined ? true : fullWidth}
      id={field}
      label={label}
      multiline
      maxRows={10}
      value={value || ""}
      error={!!errorText}
      helperText={errorText || undefined}
      onChange={(event) => onChange(event.target.id, event.target.value)}
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
          <CopyableSpan label={label} value={value} />
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
          <CopyableSpan label={label} value={value} />
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
          <CopyableSpan label={label} value={value} />
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
