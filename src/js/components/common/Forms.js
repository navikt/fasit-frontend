import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'

function capitalize(label) {
    return "" + label.charAt(0).toUpperCase() + label.slice(1)
}

const copyToClipboard = (element) => {
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
        return {value: value, label: value}
    })
}

export function FormBox(props) {
    const {label, value, editMode, handleChange, options, parent} = props
    return (
        <div className="row">
            <div className="col-md-4 FormLabel"><b>{capitalize(label)}:</b></div>
            <div className="col-md-8">
                {editMode ?
                    <Select
                        backspaceRemoves={false}
                        clearable={true}
                        type="text"
                        name="node-type"
                        multi={true}
                        value={convertToSelectObject(value)}
                        options={convertToSelectObject(options)}
                        onChange={(e) => handleChange(label, e.map(item => item.value), parent)}
                    />
                    : <pre className="col-md-8">{value.map((v, i) => <span><Link key={i} to={`/applications/${v}`}>{v}</Link>{`\n`}</span>)}</pre>
                }
            </div>
        </div>
    )
}

export function FormList(props) {
    const {label, value, editMode, handleChange, options, parent} = props
    return (
        <div className="row">
            <div className="col-md-4 FormLabel"><b>{capitalize(label)}:</b></div>
            <div className="col-md-8">
                {editMode ?
                    <Select
                        backspaceRemoves={false}
                        clearable={false}
                        type="text"
                        name="node-type"
                        value={value}
                        options={convertToSelectObject(options)}
                        onChange={(e) => handleChange(label, e.value, parent)}
                    />
                    :
                    <OverlayTrigger {...overlayProps}>
                            <span
                                className="FormValue"
                                id={label}
                                onClick={() => copyToClipboard(label)}

                            >{value}</span>
                    </OverlayTrigger>
                }
            </div>
        </div>
    )
}


export function FormString(props) {
    const {label, value, editMode, handleChange, disabled, parent} = props
    return (
        <div className="row">
            <div className="col-md-4 FormLabel"><b>{capitalize(label)}:</b></div>
            <div className="col-md-8">
                {(editMode && !disabled) ?
                    <input type="text"
                           value={value}
                           className="FormInputField FormString-value"
                           onChange={(e) => handleChange(label, e.target.value, parent)}
                    /> :
                    <OverlayTrigger {...overlayProps}>
                            <span
                                className="FormValue"
                                id={label}
                                onClick={() => copyToClipboard(label)}

                            >{value}</span>
                    </OverlayTrigger>
                }
            </div>
        </div>
    )
}

export function FormSecret(props) {
    const {label, value, editMode, handleChange, disabled, toggleDisplaySecret, authenticated} = props
    return (
        <div className="row">
            <div className="col-md-4 FormLabel"><b>{capitalize(label)}:</b></div>
            <div className="col-md-8">
                {(editMode && !disabled) ?
                    <input type="text"
                           value={value}
                           className="FormInputField FormString-value"
                           onChange={(e) => handleChange(label, e.target.value)}
                    /> :
                    <div>
                        <OverlayTrigger {...overlayProps}>
                                <span
                                    className="FormValue"
                                    id={label}
                                    onClick={() => copyToClipboard(label)}

                                >{value ? value : "••••••••••••••••    "}&emsp;</span>
                        </OverlayTrigger>
                        {authenticated ?
                            !value ?
                                <i className="fa fa-eye FormValue  cursor-pointer"
                                   onClick={() => toggleDisplaySecret()}/> :
                                <i className="fa fa-eye-slash FormValue  cursor-pointer"
                                   onClick={() => toggleDisplaySecret()}/>
                            :
                            value
                        }


                    </div>
                }
            </div>
        </div>
    )
}

export function FormComment(props) {
    const {value, handleChange} = props
    return (
        <div className="row">
            <div className="col-md-4 FormLabel text-left"><b>Comment</b></div>
            <div className="col-xs-8">
            <textarea
                type="text"
                className="FormInputField FormString-value"
                style={{"height": 85 + "px"}}
                value={value}
                onChange={(e) => handleChange("comment", e.target.value)}
            />
            </div>
        </div>
    )
}
