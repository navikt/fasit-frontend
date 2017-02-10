import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetchEnvironments,
    fetchApplicationNames,
    fetchResourceTypes,
    fetchNodeTypes
} from '../../actionCreators/fasit_initialize_data'

import TopNav from '../Navigation/TopNav'
import NewNodeForm from '../Nodes/NewNodeForm'
import NewApplicationForm from '../Applications/NewApplicationForm'
import NewEnvironmentForm from '../Environments/NewEnvironmentForm'
import NewClusterForm from '../Environments/NewClusterForm'
import {SubmitFormStatus} from '../common/'


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
                {/* Misc. modals*/}
                <SubmitFormStatus />
                <NewNodeForm />
                <NewEnvironmentForm />
                <NewClusterForm />
                <NewApplicationForm />
            </div>
        )
    }
}

export default connect()(App)