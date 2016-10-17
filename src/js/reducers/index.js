import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'


import applications from './applications'
import configuration from './configuration'
import environments from './environments'
import instances from './instances'
import resources from './resources'
import search from './search'
import user from './user'
import viewModes from './viewMode'
import nodes from './nodes'
import nodeData from './node'
import node_deleteNode from './node_deleteNode'
import node_editNodeForm from './node_editNodeForm'
import node_events from './node_events'
import node_fasit from './node_fasit'
import node_newNodeForm from './node_newNodeForm'
import node_revisions from './node_revisions'
import node_sera from './node_sera'

var fasitReducer = combineReducers({
    routing: routerReducer,
    applications,
    configuration,
    environments,
    instances,
    resources,
    search,
    user,
    viewModes,
    nodes,
    nodeData,
    node_deleteNode,
    node_editNodeForm,
    node_events,
    node_fasit,
    node_newNodeForm,
    node_revisions,
    node_sera,
})

export default fasitReducer