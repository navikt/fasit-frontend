import {
    NODE_EVENTS_REQUEST
} from '../actionTypes'

export const fetchEvents = (fasitData) => {
    const client = fasitData.cluster ?
    fasitData.cluster.name + "_" + fasitData.environment + "_" + fasitData.hostname.split(".")[0] :
    "unknown_" + fasitData.environment + "_" + fasitData.hostname.split(".")[0]
    const url = `https://sensu-api.adeo.no/results/${client}`
    return (dispatch) => {
        dispatch({type: NODE_EVENTS_REQUEST, url})
    }
}
