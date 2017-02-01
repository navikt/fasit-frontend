import {
    INSTANCE_FASIT_REQUEST,
    INSTANCE_MANIFEST_FASIT_REQUEST
    // INSTANCE_REVISIONS_REQUEST,
    // INSTANCE_REVISION_REQUEST,
    // SHOW_ALL_INSTANCE_REVISIONS
} from '../actionTypes'

export const fetchInstance = (id) => {return {type: INSTANCE_FASIT_REQUEST, id}}
export const fetchManifest = (url) => {return {type: INSTANCE_MANIFEST_FASIT_REQUEST, id}}
// export const fetchRevisions = (hostname) => {return {type: INSTANCE_REVISIONS_REQUEST, hostname}}
// export const fetchRevision = (revision) => {return {type: INSTANCE_REVISION_REQUEST, revision}}
// export const showAllRevisions = (value) => {return {type: SHOW_ALL_INSTANCE_REVISIONS, value}}
