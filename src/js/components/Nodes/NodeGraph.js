import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


export default class NodeGraph extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {url, hostname} = this.props
        const grafanaSrc = `${url}/dashboard-solo/db/fasit-data-template?var-hostname=${hostname}&panelId=1&from=1471918908430&to=1471940508430&theme=light`

        return (
            <div className="node-information-box">

                <iframe src={grafanaSrc}
                        width="100%"
                        height="200"
                        frameBorder="0">
                </iframe>
            </div>
        )
    }

}

