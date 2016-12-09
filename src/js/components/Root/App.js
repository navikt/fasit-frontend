import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetchEnvironments,
    fetchApplicationNames,
    fetchResourceTypes,
    fetchNodeTypes
} from '../../actionCreators/fasit_initialize_data'

import TopNav from '../Navigation/TopNav'


class App extends Component {
    constructor(props) {
        super(props)
    }

    // pre-load fasit data
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchEnvironments())
        dispatch(fetchApplicationNames())
        dispatch(fetchResourceTypes())
        dispatch(fetchNodeTypes())
    }

    render() {
        return (
            <div>
                <TopNav />
                <div className="col-lg-9 col-lg-offset-2 col-md-11 col-md-offset-1 col-sm-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default connect()(App)