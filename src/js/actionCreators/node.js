import {
  CLEAR_NODE_PASSWORD,
  NODE_FASIT_REQUEST,
  DEPLOYMENTMANAGER_FASIT_REQUEST,
  NODE_FASIT_PASSWORD_REQUEST
} from "../actionTypes"

export const clearNodePassword = () => {
  return { type: CLEAR_NODE_PASSWORD }
}

export const fetchFasitData = (hostname, revision) => {
  return { type: NODE_FASIT_REQUEST, hostname, revision }
}
export const fetchDeploymentManagerResource = node => {
  return { type: DEPLOYMENTMANAGER_FASIT_REQUEST, node }
}
export const fetchNodePassword = () => {
  return { type: NODE_FASIT_PASSWORD_REQUEST }
}

