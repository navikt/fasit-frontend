import React, { Component, useState } from "react"
import Select from "react-select"
import Creatable from "react-select/creatable"
import MuiTooltip from "@mui/material/Tooltip"
import { Link } from "react-router-dom"
import { capitalize } from "../../utils/"
import { FormControl, InputLabel, Select as MuiSelect } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
const muiStyles = {
  formControl: { margin: theme => theme.spacing(1), minWidth: 120, },
  floatingLabelStyle: { color: "#000000", fontSize: "14px", borderStyle: "none" },
  selectedDropDownValue: { color: "#000000", fontSize: "14px", marginTop: '3px' },
  selectEmptyValue: { margintTop: theme => theme.spacing(2) },
  textField: { margin: theme => theme.spacing(1), marginTop: '3px' },
  menyItem: { fontSize: "14px" }
};

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

export function MaterialDropDown(props) {
  const { label, field, value, options, onChange, fullWidth } = props

  return (
    <FormControl fullWidth={fullWidth === undefined ? true : fullWidth}
      sx={muiStyles.formControl}
      variant="standard"
      >
      <InputLabel sx={muiStyles.floatingLabelStyle}>{label}</InputLabel>
      <MuiSelect sx={muiStyles.selectedDropDownValue}
        value={value == null ? "" : value}
        id={field}
        onChange={(e) => onChange(field, e.target.value || null)}
      >
        {options.map((option, idx) => (
          <MenuItem
            key={idx}
            value={option == null ? "" : option}
            sx={muiStyles.menyItem}
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
      sx={muiStyles.textField}
      type="search"
      variant="standard"
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
            isClearable={true}
            isMulti={true}
            className="text-left"
            placeholder="Start typing..."
            value={convertToSelectObject(value)}
            onChange={e =>
              handleChange(label, (e || []).map(item => item.value), parent)
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
            backspaceRemovesValue={false}
            isClearable={true}
            isMulti={true}
            value={convertToSelectObject(value)}
            options={convertToSelectObject(options)}
            onChange={e =>
              handleChange(field || label, (e || []).map(item => item.value), parent)
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
  const selectOptions = convertToSelectObject(options)
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9 FormDropDown">
        {editMode ? (
          <Select
            backspaceRemovesValue={false}
            isClearable={false}
            isDisabled={disabled}
            value={selectOptions.find(o => o.value === value) || null}
            options={selectOptions}
            onChange={e => handleChange(field || label, e ? e.value : null, parent)}
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
  const selectOptions = convertToSelectObject(options)
  return (
    <div className="row">
      <div className="col-md-3 FormLabel">
        <b>{capitalize(label)}:</b>
      </div>
      <div className="col-md-9 FormDropDown">
        {editMode ? (
          <Select
            backspaceRemovesValue={false}
            isClearable={false}
            isDisabled={disabled}
            value={selectOptions.find(o => o.value === value) || null}
            options={selectOptions}
            onChange={e => handleChange(field || label, e ? e.value : null, parent)}
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
      <div className="col-9">
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
