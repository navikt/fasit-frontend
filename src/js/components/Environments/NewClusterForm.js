import Button from "@mui/material/Button"
import React from "react"
import { Modal } from "../common/Modal"
import { connect } from "react-redux"
import {
  displayModal,
  submitForm,
  updateClusterDraft
} from "../../actionCreators/common"
import { fetchEnvironmentNodes } from "../../actionCreators/environment"
import { colors, icons } from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils"
import {
  FormDropDown,
  FormListBox,
  FormString,
  MaterialTextBox
} from "../common/Forms"

function NewClusterForm({ dispatch, showNewClusterForm, mode, environments, environmentNodes, applicationNames, cluster }) {
  const handleChange = (field, value) => {
    dispatch(updateClusterDraft(field, value))
  }

  const changeEnvironment = (field, value) => {
    dispatch(updateClusterDraft(field, value))
    dispatch(updateClusterDraft("nodes", []))
    dispatch(fetchEnvironmentNodes(value))
  }

  const mapStringToPayloadObj = (string) => {
    return {
      name: string
    }
  }

  const handleSubmitForm = () => {
    const form = {
      clustername: cluster.clustername,
      environment: cluster.environment,
      environmentclass: cluster.environmentclass,
      zone: cluster.zone,
      applications: cluster.applications.map(mapStringToPayloadObj),
      nodes: cluster.nodes.map(mapStringToPayloadObj),
      comment: cluster.comment
    }

    if (cluster.loadbalancerurl && cluster.loadbalancerurl !== "") {
      form.loadbalancerurl = cluster.loadbalancerurl
    }
    if (mode === "edit") {
      dispatch(
        submitForm(cluster.id, form, cluster.comment, "cluster")
      )
    } else {
      dispatch(submitForm(form.clustername, form, cluster.comment, "newCluster"))
    }
  }

  const closeForm = () => {
    dispatch(displayModal("cluster", false))
  }

  const enableSubmitButton = () => {
    return (
      cluster.clustername &&
      cluster.clustername !== "" &&
      cluster.environment &&
      cluster.environmentclass
    )
  }

  const environmentSelector = () => {
    if (cluster.environmentclass) {
      const filteredEnvironments = environments.environments.filter(env => {
        return env.environmentclass === cluster.environmentclass
      })
      return (
        <FormDropDown
          label="environment"
          editMode={true}
          value={cluster.environment}
          handleChange={changeEnvironment}
          options={filteredEnvironments.map(env => env.name)}
        />
      )
    }
  }

  const zoneSelector = () => {
    if (cluster.environmentclass && cluster.environmentclass !== "u") {
      return (
        <FormDropDown
          label="zone"
          editMode={true}
          value={cluster.zone}
          handleChange={handleChange}
          options={environments.zones}
        />
      )
    }
  }

  let nodeNames =
    environmentNodes != undefined ? environmentNodes.map(n => n.hostname) : []

  return (
    <Modal
      show={showNewClusterForm}
      animation={false}
      keyboard={true}
      enforceFocus={false}
      onHide={closeForm}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title>
          <div>
            {icons.cluster} &emsp;{mode &&
              `${capitalize(mode)} cluster ${
                mode !== "new" ? cluster.originalClustername : ""
              }`}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormString
          label="clustername"
          editMode={true}
          value={cluster.clustername}
          handleChange={handleChange}
        />
        <FormDropDown
          label="environmentclass"
          editMode={true}
          value={cluster.environmentclass}
          handleChange={handleChange}
          options={environments.environmentClasses}
        />
        {environmentSelector()}
        {zoneSelector()}
        <FormString
          label="loadbalancerurl"
          editMode={true}
          value={cluster.loadbalancerurl}
          handleChange={handleChange}
        />
        <FormListBox
          label="applications"
          editMode={true}
          value={cluster.applications.sort()}
          handleChange={handleChange}
          options={applicationNames}
        />
        <FormListBox
          label="nodes"
          editMode={true}
          value={cluster.nodes}
          handleChange={handleChange}
          options={nodeNames}
        />
        <MaterialTextBox
          field="comment"
          value={cluster.comment}
          label={"Comment"}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="row col-md-12" style={{ display: "flex", paddingLeft: "15px", margin: "8px", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            disableRipple
            disabled={!enableSubmitButton()}
            onClick={handleSubmitForm}
            style={{backgroundColor: colors.avatarBackgroundColor, color: colors.white, width: "88px"}}
          >
            submit
          </Button>

          <Button
            variant="text"
            disableRipple
            onClick={closeForm}
            style={{ marginLeft: "8px", width: "88px" }}
          >
            cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    environments: state.environments,
    applicationNames: state.applications.applicationNames,
    environmentNodes: state.environment_nodes_fasit.data,
    showNewClusterForm: state.cluster_draft.showNewClusterForm,
    mode: state.cluster_draft.mode,
    cluster: state.cluster_draft
  }
}

export default connect(mapStateToProps)(NewClusterForm)
