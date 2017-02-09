import {
    CLEAR_ENVIRONMENT_CLUSTERS,
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENT_CLUSTERS_REQUEST,
    ENVIRONMENT_CLUSTER_FASIT_REQUEST,
    ENVIRONMENT_NODES_FASIT_REQUEST,
    ENVIRONMENT_INSTANCES_FASIT_REQUEST
} from '../actionTypes'

export const fetchEnvironment = (id ,revision) => {return {type: ENVIRONMENT_FASIT_REQUEST, id, revision}}
export const fetchEnvironmentCluster = (environment, cluster) => {return {type: ENVIRONMENT_CLUSTER_FASIT_REQUEST, environment, cluster}}
export const fetchEnvironmentClusters = (environment) => {return {type: ENVIRONMENT_CLUSTERS_REQUEST, environment}}
export const clearEnvironmentClusters = () => {return {type: CLEAR_ENVIRONMENT_CLUSTERS}}
export const fetchEnvironmentNodes = (environment) => {return {type: ENVIRONMENT_NODES_FASIT_REQUEST, environment}}
export const fetchEnvironmentInstances = (environment) => {return {type: ENVIRONMENT_INSTANCES_FASIT_REQUEST, environment}}