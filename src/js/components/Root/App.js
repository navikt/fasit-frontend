import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {HotKeys} from 'react-hotkeys'
import {
    fetchEnvironments,
    fetchApplicationNames,
    fetchResourceTypes,
    fetchNodeTypes
} from '../../actionCreators/fasit_initialize_data'
import {showNewComponentForm} from '../../actionCreators/common'
import {displayLogin} from '../../actionCreators/authentication'
import TopNav from '../Navigation/TopNav'
import NewNodeForm from '../Nodes/NewNodeForm'
import NewApplicationForm from '../Applications/NewApplicationForm'
import NewEnvironmentForm from '../Environments/NewEnvironmentForm'
import NewClusterForm from '../Environments/NewClusterForm'
import NewResourceForm from '../Resources/NewResourceForm'
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
        const {dispatch} = this.props
        const handlers = {
            'logIn': () => dispatch(displayLogin(true)),
            'createNewApplication': () => dispatch(showNewComponentForm("application", true)),
            'createNewEnvironment': () => dispatch(showNewComponentForm("environment", true)),
            'createNewCluster': () => dispatch(showNewComponentForm("cluster", true)),
            'createNewNode': () => dispatch(showNewComponentForm("node", true))
        }
        const keyMap = {
            'logIn': 'l i space',
            'createNewApplication': 'n a space',
            'createNewEnvironment': 'n e space',
            'createNewCluster': 'n c space',
            'createNewNode': 'n n space',
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
            </HotKeys>
        )
    }
}

export default connect()(App)