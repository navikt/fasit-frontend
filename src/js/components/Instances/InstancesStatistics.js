import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class InstancesStatistics extends Component {
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
        instances: state.instances.data,
})

export default connect(mapStateToProps)(InstancesStatistics)