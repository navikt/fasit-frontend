import {
  SHOW_NEW_CLUSTER_FORM,
  EDIT_CLUSTER,
  UPDATE_CLUSTER_DRAFT
} from "../actionTypes"

const initialState = {
  clustername: "",
  environment: "",
  environmentclass: "",
  zone: "fss",
  loadbalancerurl: "",
  applications: [],
  nodes: [],
  showNewClusterForm: false,
  comment: "",
  mode: "new"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CLUSTER_DRAFT:
      const updatedField = {}
      updatedField[action.field] = action.value
      return Object.assign({}, state, updatedField)
    case EDIT_CLUSTER:
      return Object.assign({}, state, {
        data: [],
        isFetching: true,
        requestFailed: false
      })
    case SHOW_NEW_CLUSTER_FORM:
      if (action.existingData) {
        const {
          clustername,
          environment,
          environmentclass,
          zone,
          loadbalancerurl,
          applications,
          nodes
        } = action.existingData
        return Object.assign({}, initialState, {
          clustername,
          environment,
          environmentclass,
          zone,
          loadbalancerurl,
          applications: applications.map(a => a.name),
          nodes: nodes.map(n => n.name),
          showNewClusterForm: action.value,
          mode: "edit"
        })
      } else {
        return Object.assign({}, initialState, {
          showNewClusterForm: action.value
        })
      }

    default:
      return state
  }
}
