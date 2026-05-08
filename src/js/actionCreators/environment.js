import {
    CLEAR_ENVIRONMENT_CLUSTERS,
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENT_CLUSTERS_REQUEST,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST,
    ENVIRONMENT_NODES_FASIT_REQUEST,
    ENVIRONMENT_INSTANCES_FASIT_REQUEST
} from '../actionTypes'

export function fetchEnvironment(id, revision) { return {type: ENVIRONMENT_FASIT_REQUEST, id, revision} }
export function fetchEnvironmentCluster(environment, cluster, revision) { return {type: ENVIRONMENT_CLUSTER_FASIT_REQUEST, environment, cluster, revision} }
export function fetchEnvironmentClusters(environment) { return {type: ENVIRONMENT_CLUSTERS_REQUEST, environment} }
export function clearEnvironmentClusters() { return {type: CLEAR_ENVIRONMENT_CLUSTERS} }
export function fetchEnvironmentNodes(environment) { return {type: ENVIRONMENT_NODES_FASIT_REQUEST, environment} }
export function fetchEnvironmentInstances(environment) { return {type: ENVIRONMENT_INSTANCES_FASIT_REQUEST, environment} }