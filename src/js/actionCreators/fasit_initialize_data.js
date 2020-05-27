import {
  ENVIRONMENTS_REQUEST,
  APPLICATION_NAMES_REQUEST,
  RESOURCE_TYPES_REQUEST,
  NODE_TYPES_REQUEST,
} from "../actionTypes";

export const fetchResourceTypes = () => {
  return { type: RESOURCE_TYPES_REQUEST };
};
export const fetchEnvironments = () => {
  return { type: ENVIRONMENTS_REQUEST };
};
export const fetchApplicationNames = () => {
  return { type: APPLICATION_NAMES_REQUEST };
};
export const fetchNodeTypes = () => {
  return { type: NODE_TYPES_REQUEST };
};
