import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {HotKeys} from 'react-hotkeys'
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

    // pre-load fasit data
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchEnvironments())
        dispatch(fetchApplicationNames())
        dispatch(fetchResourceTypes())
        dispatch(fetchNodeTypes())
    }

    render() {
        const {dispatch} = this.props
        const handlers = {
            'showKeyMap': () => dispatch(displayModal("shortcuts", true)),
            'logIn': () => dispatch(displayLogin(true)),
            'logOut': () => dispatch(logOut()),
            'createNewApplication': () => dispatch(displayModal("application", true)),
            'createNewEnvironment': () => dispatch(displayModal("environment", true)),
            'createNewCluster': () => dispatch(displayModal("cluster", true)),
            'createNewNode': () => dispatch(displayModal("node", true)),
            'goToEnvironments': () => browserHistory.push("/environments"),
            'goToApplications': () => browserHistory.push("/applications"),
            'goToInstances': () => browserHistory.push("/instances"),
            'goToResources': () => browserHistory.push("/resources"),
            'goToNodes': () => browserHistory.push("/nodes"),
            'goToSearch': () => console.log("search", ReactDOM.findDOMNode(this.refs.navSearch)),
        }
        const keyMap = {
            'showKeyMap': '? space',
            'logIn': 'l i space',
            'logOut': 'l o space',
            'createNewApplication': 'n a space',
            'createNewEnvironment': 'n e space',
            'createNewCluster': 'n c space',
            'createNewNode': 'n n space',
            'goToEnvironments': 'g e space',
            'goToApplications': 'g a space',
            'goToInstances': 'g i space',
            'goToResources': 'g r space',
            'goToNodes': 'g n space',
            'goToSearch': 'g g space',
        }
        return (
            <HotKeys handlers={handlers} keyMap={keyMap} style={{outline:"none"}}>
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
            </HotKeys>
        )
    }
}

export default connect()(App)