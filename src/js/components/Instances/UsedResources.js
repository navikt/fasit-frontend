import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Popover, OverlayTrigger} from 'react-bootstrap'

export default class UsedResources extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>USED</h1>
            </div>
        )
    }
}
