import React from 'react'
import {Provider} from 'react-redux'
import {Route, IndexRoute} from 'react-router'

// Routes
import App from './components/Root/App'
import Home from './components/Home'
import Login from './components/Login'
import Applications from './components/Applications/Applications'
import Application from './components/Applications/Application'
import ApplicationOverview from './components/Applications/Overview'
import ApplicationInstances from './components/Applications/Instances'
import ApplicationClusters from './components/Applications/Clusters'
import Cluster from './components/Clusters/Cluster'
import Nodes from './components/Nodes/Nodes'
import Environments from './components/Environments/Environments'
import Resources from './components/Resources/Resources'
import Resource from './components/Resources/Resource'
import Instance from './components/Instances/Instance'
import Instances from './components/Instances/Instances'
import NotFound from './components/Navigation/NotFound'

export default () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/nodes(/:node)" component={Nodes}/>
            <Route path="/environments(/:environment)" component={Environments}/>

            <Route path="/applications" component={Applications}/>
            <Route path="/applications/:application" component={Application}>
                <IndexRoute component={ApplicationOverview}/>
                <Route path="/applications/:application" component={ApplicationOverview}/>
                <Route path="/applications/:application/instances" component={ApplicationInstances}/>
                <Route path="/applications/:application/clusters" component={ApplicationClusters}/>
                <Route path="/applications/:application/instances/:instance" component={Instance}/>
                <Route path="/applications/:application/clusters/:cluster" component={Cluster}/>
            </Route>
            <Route path="/resources" component={Resources}/>
            <Route path="/resources/:resource" component={Resource}/>
            <Route path="/instances" component={Instances}/>
            <Route path="/instances/:instance" component={Instance}>
                <IndexRoute component={ApplicationOverview}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Route>
    )
}
