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
import {displayModa, toggleModall} from '../../actionCreators/common'
import {displayLogin, logOut} from '../../actionCreators/authentication'
import {NavSearch} from "../common/"
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
        Mousetrap.bind('q', (e) => {e.preventDefault();  dispatch(toggleModal("shortcuts"))})
        Mousetrap.bind('l i', (e) => {e.preventDefault(); dispatch(displayLogin(true))})
        Mousetrap.bind('l o', (e) => {e.preventDefault();  dispatch(logOut())})
        Mousetrap.bind('n r', (e) => {e.preventDefault();  dispatch(displayModal("resource", true))})
        Mousetrap.bind('n a', (e) => {e.preventDefault();  dispatch(displayModal("application", true))})
        Mousetrap.bind('n e', (e) => {e.preventDefault();  dispatch(displayModal("environment", true))})
        Mousetrap.bind('n c', (e) => {e.preventDefault();  dispatch(displayModal("cluster", true))})
        Mousetrap.bind('n n', (e) => {e.preventDefault();  dispatch(displayModal("node", true))})
        Mousetrap.bind('g e', (e) => {e.preventDefault();  browserHistory.push("/environments")})
        Mousetrap.bind('g a', (e) => {e.preventDefault();  browserHistory.push("/applications")})
        Mousetrap.bind('g i', (e) => {e.preventDefault();  browserHistory.push("/instances")})
        Mousetrap.bind('g r', (e) => {e.preventDefault();  browserHistory.push("/resources")})
        Mousetrap.bind('g n', (e) => {e.preventDefault();  browserHistory.push("/nodes")})
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