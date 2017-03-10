import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Mousetrap from 'mousetrap'
import {
    fetchEnvironments,
    fetchApplicationNames,
    fetchResourceTypes,
    fetchNodeTypes
} from '../../actionCreators/fasit_initialize_data'
import {displayModal} from '../../actionCreators/common'
import {displayLogin, logOut} from '../../actionCreators/authentication'
import TopNav from '../Navigation/TopNav'
import NewNodeForm from '../Nodes/NewNodeForm'
import NewApplicationForm from '../Applications/NewApplicationForm'
import NewEnvironmentForm from '../Environments/NewEnvironmentForm'
import NewClusterForm from '../Environments/NewClusterForm'
import NewResourceForm from '../Resources/NewResourceForm'
import {SubmitFormStatus, KeyboardShortcuts} from '../common/'


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // pre-load fasit data
        const {dispatch} = this.props
        dispatch(fetchEnvironments())
        dispatch(fetchApplicationNames())
        dispatch(fetchResourceTypes())
        dispatch(fetchNodeTypes())

        // Global keyboard shortcuts
        Mousetrap.bind('l i', () => dispatch(displayLogin(true)))
        Mousetrap.bind('l o', () => dispatch(logOut()))
        Mousetrap.bind('q', () => dispatch(displayModal("shortcuts", true)))
        Mousetrap.bind('n r', () => dispatch(displayModal("resource", true)))
        Mousetrap.bind('n a', () => dispatch(displayModal("application", true)))
        Mousetrap.bind('n e', () => dispatch(displayModal("environment", true)))
        Mousetrap.bind('n c', () => dispatch(displayModal("cluster", true)))
        Mousetrap.bind('n n', () => dispatch(displayModal("node", true)))
        Mousetrap.bind('g e', () => browserHistory.push("/environments"))
        Mousetrap.bind('g a', () => browserHistory.push("/applications"))
        Mousetrap.bind('g i', () => browserHistory.push("/instances"))
        Mousetrap.bind('g r', () => browserHistory.push("/resources"))
        Mousetrap.bind('g n', () => browserHistory.push("/nodes"))
        Mousetrap.bind('g g', () => browserHistory.push("/search"))
    }

    render() {
        return (
            <div style={{outline:"none"}}>
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
                <NewResourceForm/>
                <KeyboardShortcuts/>
            </div>
        )
    }
}

export default connect()(App)