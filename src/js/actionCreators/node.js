import {
  CLEAR_NODE_PASSWORD,
  NODE_FASIT_REQUEST,
  DEPLOYMENTMANAGER_FASIT_REQUEST,
  NODE_FASIT_PASSWORD_REQUEST
} from "../actionTypes"

export function clearNodePassword() {
  return { type: CLEAR_NODE_PASSWORD }
}

export function fetchFasitData(hostname, revision) {
  return { type: NODE_FASIT_REQUEST, hostname, revision }
}
export function fetchDeploymentManagerResource(node) {
  return { type: DEPLOYMENTMANAGER_FASIT_REQUEST, node }
}
export function fetchNodePassword() {
  return { type: NODE_FASIT_PASSWORD_REQUEST }
}

