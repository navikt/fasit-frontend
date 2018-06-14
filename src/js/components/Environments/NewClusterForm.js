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
import { displayModal, submitForm } from "../../actionCreators/common"
import { fetchEnvironmentNodes } from "../../actionCreators/environment"
import { colors, icons } from "../../commonStyles/commonInlineStyles"

class NewClusterForm extends Component {
  constructor(props) {
    super(props)
    this.initialState()
  }

  initialState() {
    this.state = {
      editMode: false,
      clustername: "",
      environment: "",
      environmentclass: "",
      zone: "fss",
      applications: [],
      nodes: [],
      comment: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.editMode) {
      if (nextProps.mode === "edit") {
        const {
          clustername,
          environment,
          environmentclass,
          zone,
          applications,
          nodes
        } = nextProps.cluster

        this.setState({
          editMode: true,
          clustername,
          environment,
          environmentclass,
          zone,
          applications: applications.map(a => a.name),
          nodes: nodes.map(n => n.name)
        })
      } else {
        this.initialState()
      }
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  changeEnvironment(field, value) {
    this.setState({ environment: value, nodes: [] })
    this.props.dispatch(fetchEnvironmentNodes(value))
  }

  handleSubmitForm() {
    const { dispatch } = this.props
    const {
      clustername,
      environment,
      environmentclass,
      zone,
      applications,
      nodes,
      comment
    } = this.state
    const form = {
      clustername,
      environment,
      environmentclass,
      zone,
      applications,
      nodes,
      comment
    }
    dispatch(submitForm(form.clustername, form, comment, "newCluster"))
  }

  closeForm() {
    const { dispatch } = this.props
    this.initialState()
    dispatch(displayModal("cluster", false))
  }

  enableSubmitButton() {
    const { clustername, environment, environmentclass, zone } = this.state

    return clustername && clustername !== "" && environment && environmentclass
  }

  render() {
    const {
      showNewClusterForm,
      mode,
      environments,
      applications,
      environmentNodes,
      applicationNames
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
                  mode !== "new" ? this.state.clustername : ""
                }`}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormString
            label="clustername"
            editMode={true}
            value={this.state.clustername}
            handleChange={this.handleChange.bind(this)}
          />
          <FormDropDown
            label="environmentclass"
            editMode={true}
            value={this.state.environmentclass}
            handleChange={this.handleChange.bind(this)}
            options={environments.environmentClasses}
          />
          {this.environmentSelector()}
          {this.zoneSelector()}
          <FormListBox
            label="applications"
            editMode={true}
            value={this.state.applications.sort()}
            handleChange={this.handleChange.bind(this)}
            options={applicationNames}
          />
          <FormListBox
            label="nodes"
            editMode={true}
            value={this.state.nodes}
            handleChange={this.handleChange.bind(this)}
            options={nodeNames}
          />
          <MaterialTextBox
            field="comment"
            value={this.state.comment}
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
    const { environmentclass } = this.state
    if (environmentclass) {
      const filteredEnvironments = environments.environments.filter(env => {
        return env.environmentclass === environmentclass
      })
      return (
        <FormDropDown
          label="environment"
          editMode={true}
          value={this.state.environment}
          handleChange={this.changeEnvironment.bind(this)}
          options={filteredEnvironments.map(env => env.name)}
        />
      )
    }
  }

  zoneSelector() {
    const { environments } = this.props
    const { environmentclass } = this.state

    if (environmentclass && environmentclass !== "u") {
      return (
        <FormDropDown
          label="zone"
          editMode={true}
          value={this.state.zone}
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
    showNewClusterForm: state.environment_clusters.showNewClusterForm,
    cluster: state.environment_cluster_fasit.data,
    mode: state.environment_clusters.mode
  }
}

export default connect(mapStateToProps)(NewClusterForm)
