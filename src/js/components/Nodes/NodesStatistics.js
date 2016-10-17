import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class NodesStatistics extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <h1>Bootifool statz</h1>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
        nodes: state.nodes.data,
})

export default connect(mapStateToProps)(NodesStatistics)