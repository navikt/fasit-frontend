import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

import TopNav from '../Navigation/TopNav'
import SidebarNav from '../Navigation/SidebarNav'
import ContextMenu from '../Navigation/ContextMenu'
import Home from '../Home/Home'
import Login from '../Login'
import Node from '../Nodes/Node'
import Resource from '../Resources/Resource'
import Instance from '../Instances/Instances'
import Application from '../Applications/Application'
import Environment from '../Environments/Environment'


export default class App extends Component {
    constructor(props) {
        super(props)
    }


    determineMainContent(){
        const params = this.props.params
        if (params.node) return <Node hostname={params.node}/>
        if (params.resource) return <Resource hostname={params.resource}/>
        if (params.instance) return <Instance hostname={params.node.instance}/>
        if (params.application) return <Application hostname={params.application}/>
        if (params.environment) return <Environment hostname={params.environment}/>
        if (this.props.location.pathname === "/login") return <Login />
        else return <Home />
    }
    render() {
        return (
            <div>
                <TopNav />
                <ContextMenu />
                <SidebarNav />

                <div className="col-md-10 main-content-container">
                    {this.determineMainContent()}
                </div>
            </div>
        )
    }
}