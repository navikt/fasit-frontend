import {
    APPLICATION_FASIT_REQUEST,
    APPLICATION_INSTANCES_REQUEST
} from '../actionTypes'

export function fetchFasitData(name, revision) { return {type: APPLICATION_FASIT_REQUEST, name, revision} }
export function fetchApplicationInstances(name) { return {type: APPLICATION_INSTANCES_REQUEST, name} }
