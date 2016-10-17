import {
    NODE_SERA_REQUEST
} from '../actionTypes'

export const fetchSeraData = (hostname) => {
    const url = `https://sera.adeo.no/api/v1/servers?hostname=${hostname}`
    return (dispatch) => {
        dispatch({type: NODE_SERA_REQUEST, url})
    }
}
