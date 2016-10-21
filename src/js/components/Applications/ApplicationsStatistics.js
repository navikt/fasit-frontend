import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class ApplicationsStatistics extends Component {
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
        environments: state.environments.data,
})

export default connect(mapStateToProps)(ApplicationsStatistics)