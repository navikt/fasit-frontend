import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'


import applications from './applications'
import application_fasit from './application_fasit'
import application_instances from './application_instances'
import configuration from './configuration'
import environments from './environments'
import environment_fasit from './environment_fasit'
import environment_clusters from './environment_clusters'
import environment_cluster_fasit from './environment_cluster_fasit'
import environment_nodes_fasit from './environment_nodes_fasit'
import environment_instances_fasit from './environment_instances_fasit'
import instances from './instances'
import instance_fasit from './instance_fasit'
import resources from './resources'
import resource_fasit from './resource_fasit'
import search from './search'
import navsearch from './navsearch'
import submit_form from './submit_form'
import user from './user'
import nodes from './nodes'
import node_events from './node_events'
import node_fasit from './node_fasit'
import revisions from './revisions'
import node_sera from './node_sera'

var fasitReducer = combineReducers({
    routing: routerReducer,
    applications,
    application_fasit,
    application_instances,
    configuration,
    navsearch,
    environments,
    environment_fasit,
    environment_clusters,
    environment_cluster_fasit,
    environment_nodes_fasit,
    environment_instances_fasit,
    instances,
    instance_fasit,
    resources,
    resource_fasit,
    revisions,
    search,
    submit_form,
    user,
    nodes,
    node_events,
    node_fasit,
    node_sera,
})

export default fasitReducer