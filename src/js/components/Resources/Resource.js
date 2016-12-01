import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class Resource extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div> Hei jeg er en ressurs med id {this.props.id} :) </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        fasit: state.node_fasit,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
        config: state.configuration,
        id: ownProps.id
    }
}

export default connect(mapStateToProps)(Resource)
