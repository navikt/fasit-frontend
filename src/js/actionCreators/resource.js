import {RESOURCE_FASIT_REQUEST} from "../actionTypes";

export const fetchFasitData = (id, revision) => {return {type: RESOURCE_FASIT_REQUEST, id, revision}}