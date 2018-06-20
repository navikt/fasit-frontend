import React, { Component, PropTypes } from "react"
import { Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { capitalize } from "../../utils"
import {
  FormString,
  FormDropDown,
  FormComment,
  FormListBox
} from "../common/Forms"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import { MaterialTextBox } from "../common/Forms"
import {
  displayModal,
  submitForm,
  updateClusterDraft
} from "../../actionCreators/common"
import { fetchEnvironmentNodes } from "../../actionCreators/environment"
import { colors, icons } from "../../commonStyles/commonInlineStyles"

class NewClusterForm extends Component {
  constructor(props) {
    super(props)
  }

  handleChange(field, value) {
    this.props.dispatch(updateClusterDraft(field, value))
  }

  changeEnvironment(field, value) {
    this.props.dispatch(updateClusterDraft(field, value))
    this.props.dispatch(updateClusterDraft("nodes", []))
    this.props.dispatch(fetchEnvironmentNodes(value))
  }

  mapStringToPayloadObj(string) {
    return {
      name: string
    }
  }

  handleSubmitForm() {
    const { dispatch, cluster, mode } = this.props

    const form = {
      clustername: cluster.clustername,
      environment: cluster.environment,
      environmentclass: cluster.environmentclass,
      zone: cluster.zone,
      applications: cluster.applications.map(this.mapStringToPayloadObj),
      nodes: cluster.nodes.map(this.mapStringToPayloadObj),
      comment: cluster.comment
    }

    if (cluster.loadbalancerurl && cluster.loadbalancerurl !== "") {
      form.loadbalancerurl = cluster.loadbalancerurl
    }
    if (mode === "edit") {
      dispatch(
        submitForm(cluster.originalClustername, form, comment, "cluster")
      )
    } else {
      dispatch(submitForm(form.clustername, form, comment, "newCluster"))
    }
  }

  closeForm() {
    const { dispatch } = this.props
    dispatch(displayModal("cluster", false))
  }

  enableSubmitButton() {
    const { cluster } = this.props
    return (
      cluster.clustername &&
      cluster.clustername !== "" &&
      cluster.environment &&
      cluster.environmentclass
    )
  }

  render() {
    const {
      showNewClusterForm,
      mode,
      environments,
      environmentNodes,
      applicationNames,
      cluster
    } = this.props
    let nodeNames =
      environmentNodes != undefined ? environmentNodes.map(n => n.hostname) : []

    return (
      <Modal
        show={showNewClusterForm}
        animation={false}
        keyboard={true}
        dialogClassName="wideModal"
        onHide={this.closeForm.bind(this)}
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
            handleChange={this.handleChange.bind(this)}
          />
          <FormDropDown
            label="environmentclass"
            editMode={true}
            value={cluster.environmentclass}
            handleChange={this.handleChange.bind(this)}
            options={environments.environmentClasses}
          />
          {this.environmentSelector()}
          {this.zoneSelector()}
          <FormString
            label="loadbalancerurl"
            editMode={true}
            value={cluster.loadbalancerurl}
            handleChange={this.handleChange.bind(this)}
          />
          <FormListBox
            label="applications"
            editMode={true}
            value={cluster.applications.sort()}
            handleChange={this.handleChange.bind(this)}
            options={applicationNames}
          />
          <FormListBox
            label="nodes"
            editMode={true}
            value={cluster.nodes}
            handleChange={this.handleChange.bind(this)}
            options={nodeNames}
          />
          <MaterialTextBox
            field="comment"
            value={cluster.comment}
            label={"Comment"}
            onChange={this.handleChange.bind(this)}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="row col-md-12">
            <RaisedButton
              backgroundColor={colors.avatarBackgroundColor}
              labelColor={colors.white}
              disableTouchRipple={true}
              disabled={!this.enableSubmitButton()}
              label="submit"
              onTouchTap={this.handleSubmitForm.bind(this, true)}
            />

            <FlatButton
              disableTouchRipple={true}
              label="cancel"
              onTouchTap={this.closeForm.bind(this)}
            />
          </div>
        </Modal.Footer>
      </Modal>
    )
  }

  environmentSelector() {
    const { environments } = this.props
    const { cluster } = this.props
    if (cluster.environmentclass) {
      const filteredEnvironments = environments.environments.filter(env => {
        return env.environmentclass === cluster.environmentclass
      })
      return (
        <FormDropDown
          label="environment"
          editMode={true}
          value={cluster.environment}
          handleChange={this.changeEnvironment.bind(this)}
          options={filteredEnvironments.map(env => env.name)}
        />
      )
    }
  }

  zoneSelector() {
    const { environments, cluster } = this.props

    if (cluster.environmentclass && cluster.environmentclass !== "u") {
      return (
        <FormDropDown
          label="zone"
          editMode={true}
          value={cluster.zone}
          handleChange={this.handleChange.bind(this)}
          options={environments.zones}
        />
      )
    }
  }
}

NewClusterForm.propTypes = {
  dispatch: PropTypes.func.isRequired
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
