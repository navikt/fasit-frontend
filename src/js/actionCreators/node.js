import {
    CLEAR_NODE_PASSWORD,
    NODE_EVENTS_REQUEST,
    NODE_FASIT_REQUEST,
    NODE_FASIT_PASSWORD_REQUEST,
    NODE_REVISIONS_REQUEST,
    NODE_REVISION_REQUEST,
    NODE_SERA_REQUEST,
    RESCUE_NODE,
    SHOW_ALL_NODE_REVISIONS,
    SHOW_NEW_NODE_FORM,
} from '../actionTypes'

export const clearNodePassword = () => {return {type: CLEAR_NODE_PASSWORD}}
export const fetchEvents = (fasitData) => {
    const client = fasitData.cluster ?
        fasitData.cluster.name + "_" + fasitData.environment + "_" + fasitData.hostname.split(".")[0] :
        "unknown_" + fasitData.environment + "_" + fasitData.hostname.split(".")[0]
    return {type: NODE_EVENTS_REQUEST, client}
}

export const fetchFasitData = (hostname) => {return {type: NODE_FASIT_REQUEST, hostname}}
export const fetchNodePassword = () => {return {type: NODE_FASIT_PASSWORD_REQUEST}}
export const fetchRevisions = (hostname) => {return {type: NODE_REVISIONS_REQUEST, hostname}}
export const fetchRevision = (revision) => {return {type: NODE_REVISION_REQUEST, revision}}
export const fetchSeraData = (hostname) => {return {type: NODE_SERA_REQUEST, hostname}}
export const rescueNode = (hostname) => {return {type: RESCUE_NODE, hostname}}
export const showAllRevisions = (value) => {return {type: SHOW_ALL_NODE_REVISIONS, value}}
export const showNewNodeForm = (value) => {return {type: SHOW_NEW_NODE_FORM, value}}
