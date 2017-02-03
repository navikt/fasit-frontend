import {
    ENVIRONMENT_FASIT_REQUEST,
    ENVIRONMENT_CLUSTERS_FASIT_REQUEST,
    ENVIRONMENT_NODES_FASIT_REQUEST,
    ENVIRONMENT_INSTANCES_FASIT_REQUEST
} from '../actionTypes'

export const fetchEnvironment = (id ,revision) => {return {type: ENVIRONMENT_FASIT_REQUEST, id, revision}}
export const fetchEnvironmentClusters = (environment) => {return {type: ENVIRONMENT_CLUSTERS_FASIT_REQUEST, environment}}
export const fetchEnvironmentNodes = (environment) => {return {type: ENVIRONMENT_NODES_FASIT_REQUEST, environment}}
export const fetchEnvironmentInstances = (environment) => {return {type: ENVIRONMENT_INSTANCES_FASIT_REQUEST, environment}}