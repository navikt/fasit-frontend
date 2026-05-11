import {
    ENVIRONMENTS_REQUEST,
    APPLICATION_NAMES_REQUEST,
    RESOURCE_TYPES_REQUEST,
    NODE_TYPES_REQUEST
} from '../actionTypes'


export function fetchResourceTypes() { return {type: RESOURCE_TYPES_REQUEST} }
export function fetchEnvironments() { return {type: ENVIRONMENTS_REQUEST} }
export function fetchApplicationNames() { return {type: APPLICATION_NAMES_REQUEST} }
export function fetchNodeTypes() { return {type: NODE_TYPES_REQUEST} }
