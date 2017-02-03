import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {Link} from 'react-router'


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
export class FormList extends Component {
    constructor(props) {
        super(props)
    }

    convertToSelectObject(values) {
        return values.map(value => {
            return {value: value, label: value}
        })
    }


    render() {
        const {label, value, editMode, handleChange, options} = this.props
        return (
            <div className="row">
                <div className="col-md-4 FormLabel"><b>{label.charAt(0).toUpperCase() + label.slice(1)}:</b></div>
                <div className="col-md-8">
                    {editMode ?
                        <Select
                            backspaceRemoves={false}
                            clearable={false}
                            type="text"
                            name="node-type"
                            value={value}
                            options={this.convertToSelectObject(options)}
                            onChange={(e) => handleChange(label, e.value)}
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
}

export class FormString extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {label, value, editMode, handleChange, disabled} = this.props
        return (
            <div className="row">
                <div className="col-md-4 FormLabel"><b>{label.charAt(0).toUpperCase() + label.slice(1)}:</b></div>
                <div className="col-md-8">
                    {(editMode && !disabled) ?
                        <input type="text"
                               value={value}
                               className="FormInputField FormString-value"
                               onChange={(e) => handleChange(label, e.target.value)}
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
}

export class FormSecret extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {label, value, editMode, handleChange, disabled, toggleDisplaySecret, authenticated} = this.props
        return (
            <div className="row">
                <div className="col-md-4 FormLabel"><b>{label.charAt(0).toUpperCase() + label.slice(1)}:</b></div>
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

                                >{value ? value : "••••••••••••••••    "}</span>
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
}

export class FormComment extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {value, handleChange} = this.props

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
}