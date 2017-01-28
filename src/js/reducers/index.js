import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'


import applications from './applications'
import application_fasit from './application_fasit'
import configuration from './configuration'
import environments from './environments'
import instances from './instances'
import resources from './resources'
import search from './search'
import submit_form from './submit_form'
import user from './user'
import nodes from './nodes'
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
    application_fasit,
    configuration,
    environments,
    instances,
    resources,
    search,
    submit_form,
    user,
    nodes,
    node_deleteNode,
    node_editNodeForm,
    node_events,
    node_fasit,
    node_newNodeForm,
    node_revisions,
    node_sera,
})

export default fasitReducer