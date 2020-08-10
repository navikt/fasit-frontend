import React from "react"
import Select from "react-select"
import { capitalize } from "../../utils/"

function convertToSelectObject(values) {
  return values.map((value) => {
    return { value: value, label: value }
  })
}

function mapToValueObject(value) {
  return value ? { label: value, value } : null
}

export function FormDropDown(props) {
  const { label, value, disabled, handleChange, options, field, parent } = props

  return (
    <div className="formPadding">
      <div>{capitalize(label)}</div>
      <div>
        <Select
          backspaceRemoves={false}
          clearable={false}
          type="text"
          name="node-type"
          disabled={disabled}
          value={mapToValueObject(value)}
          options={convertToSelectObject(options)}
          onChange={(e) => handleChange(field || label, e.value, parent)}
        />
      </div>
    </div>
  )
}

export function FormString(props) {
  const { label, value, handleChange, field, parent, hintText } = props
  return (
    <div className="formPadding">
      <div>{capitalize(label)}</div>
      <div>
        <input
          type="text"
          value={value || ""}
          className="FormInputField FormString-value"
          placeholder={hintText}
          onChange={(e) => handleChange(field || label, e.target.value, parent)}
        />
      </div>
    </div>
  )
}

export function FormTextArea(props) {
  const { label, value, handleChange, field, parent } = props
  return (
    <div className="formPadding">
      <div>{capitalize(label)}</div>
      <div>
        <textarea
          value={value || ""}
          rows="10"
          className="TextAreaInputField FormString-value"
          onChange={(e) => handleChange(field || label, e.target.value, parent)}
        />
      </div>
    </div>
  )
}

export function FormComment(props) {
  const { value, handleChange } = props
  return (
    <div className="formPadding">
      <div>Comment</div>
      <div>
        <textarea
          type="text"
          className="TextAreaInputField FormString-value"
          style={{ height: 85 + "px" }}
          value={value}
          onChange={(e) => handleChange("comment", e.target.value)}
        />
      </div>
    </div>
  )
}

export function FormSubmitButton(props) {
  const { disabled, handleChange } = props
  return (
    <div style={{ paddingTop: "1rem" }}>
      {disabled ? (
        <button type="submit" className="btn btn-primary pull-right disabled">
          Submit
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary pull-right"
          onClick={() => handleChange()}
        >
          Submit
        </button>
      )}
    </div>
  )
}
