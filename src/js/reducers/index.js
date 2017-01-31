import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'


import applications from './applications'
import application_fasit from './application_fasit'
import application_instances from './application_instances'
import configuration from './configuration'
import environments from './environments'
import instances from './instances'
import instance_fasit from './instance_fasit'
import resources from './resources'
import resource_fasit from './resource_fasit'
import search from './search'
import submit_form from './submit_form'
import user from './user'
import nodes from './nodes'
import node_events from './node_events'
import node_fasit from './node_fasit'
import node_revisions from './node_revisions'
import node_sera from './node_sera'

var fasitReducer = combineReducers({
    routing: routerReducer,
    applications,
    application_fasit,
    application_instances,
    configuration,
    environments,
    instances,
    instance_fasit,
    resources,
    resource_fasit,
    search,
    submit_form,
    user,
    nodes,
    node_events,
    node_fasit,
    node_revisions,
    node_sera,
})

export default fasitReducer