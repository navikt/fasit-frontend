import {
    CLEAR_NODE_PASSWORD,
    NODE_EVENTS_REQUEST,
    NODE_FASIT_REQUEST,
    NODE_FASIT_PASSWORD_REQUEST,
    NODE_SERA_REQUEST,
    RESCUE_NODE,
} from '../actionTypes'

export const clearNodePassword = () => {return {type: CLEAR_NODE_PASSWORD}}
export const fetchEvents = (fasitData) => {
    const client = fasitData.cluster ?
        fasitData.cluster.name + "_" + fasitData.environment + "_" + fasitData.hostname.split(".")[0] :
        "unknown_" + fasitData.environment + "_" + fasitData.hostname.split(".")[0]
    return {type: NODE_EVENTS_REQUEST, client}
}

export const fetchFasitData = (hostname, revision) => {return {type: NODE_FASIT_REQUEST, hostname, revision}}
export const fetchNodePassword = () => {return {type: NODE_FASIT_PASSWORD_REQUEST}}
export const fetchSeraData = (hostname) => {return {type: NODE_SERA_REQUEST, hostname}}
export const rescueNode = (hostname) => {return {type: RESCUE_NODE, hostname}}
