import React from 'react'
import {Provider} from 'react-redux'
import {Route, IndexRoute} from 'react-router'

// Routes
import App from './components/Root/App'
import Home from './components/Home'
import Login from './components/Login'
import Applications from './components/Applications/Applications'
import Nodes from './components/Nodes/Nodes'
import Environments from './components/Environments/Environments'
import Resources from './components/Resources/Resources'
import Instances from './components/Instances/Instances'
import NotFound from './components/Navigation/NotFound'

export default () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/nodes(/:node)" component={Nodes}/>
            <Route path="/environments(/:environment)" component={Environments}/>
            <Route path="/applications(/:application)" component={Applications}/>
            <Route path="/resources(/:resource)" component={Resources}/>
            <Route path="/instances(/:instance)" component={Instances}/>
            <Route path="*" component={NotFound}/>
        </Route>
    )
}
