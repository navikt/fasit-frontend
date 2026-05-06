import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import history from "../../history"
import { parseQuery } from "../../utils/queryParser"
import {
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  Security,
  ToolButtons
} from "../common/"
import { displayModal, submitForm } from "../../actionCreators/common"
import { validAuthorization } from "../../utils/"
import EnvironmentClusters from "./EnvironmentClusters"
import EnvironmentNodes from "./EnvironmentNodes"
import EnvironmentInstances from "./EnvironmentInstances"
import { fetchEnvironment } from "../../actionCreators/environment"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { Card, CardActions, CardHeader } from "@mui/material"

export class Environment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayClusters: true,
      displayNodes: false,
      displayInstances: false,
      displaySubmitForm: false,
      displayDeleteForm: false,
      editMode: false,
      comment: ""
    }
  }

  resetLocalState() {
    this.setState({
      adgroups: [],
      comment: ""
    })
  }

  toggleComponentDisplay(component) {
    this.setState({ [component]: !this.state[component] })
    if (component === "editMode" && this.state.editMode) this.resetLocalState()
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  handleSubmitForm(id, form, comment, component) {
    const { dispatch } = this.props

    if (component === "deleteEnvironment") {
      this.toggleComponentDisplay("displayDeleteForm")
      this.setState({ comment: "" })
    }
    dispatch(submitForm(id, form, comment, component))
    if (component === "deleteEnvironment") {
      history.push("/environments")
    }
  }

  componentDidMount() {
    const { dispatch, name, query } = this.props
    dispatch(fetchEnvironment(name, query.revision))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, name, query, environment } = this.props
    if (name !== prevProps.name || query.revision !== prevProps.query.revision || environment !== prevProps.environment) {
      this.setState({
        comment: ""
      })
      if (Object.keys(environment).length > 0) {
        this.setState({ adgroups: environment.accesscontrol.adgroups })
      }
      if (query.revision != prevProps.query.revision) {
        dispatch(fetchEnvironment(name, query.revision))
      }
      if (name != prevProps.name) {
        dispatch(fetchEnvironment(name, query.revision))
      }
    }
  }

  render() {
    const { name, environment, user, query, revisions, dispatch, resourceModalVisible } = this.props
    const {
      displayClusters,
      displayInstances,
      displayNodes,
      comment,
      adgroups,
      editMode
    } = this.state
    const envName = environment.name
    const envClass = environment.environmentclass
    let lifecycle = {}

    let authorized = false
    if (Object.keys(environment).length > 0) {
      authorized = validAuthorization(user, environment.accesscontrol)
      lifecycle = environment.lifecycle
    }

    return (
      <div className="row">
        <div className="col-md-6" style={styles.cardPadding}>
          <CurrentRevision revisionId={query.revision} revisions={revisions} />
          <Card>
            <CardHeader avatar={icons.environment} title="Environment" titleTypographyProps={{style: styles.bold}} />
            <CardHeader title={`${envName}`} subheader={`Environment class: ${envClass} `} />
            <CardActions>
              <ToolButtons
                disabled={!authorized || resourceModalVisible}
                onEditClick={() => dispatch(displayModal("environment", true, "edit"))}
                onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                onCopyClick={() => dispatch(displayModal("environment", true, "copy"))}
                editMode={editMode}
              />
            </CardActions>
          </Card>

          <Lifecycle lifecycle={lifecycle} authorized={authorized} />
        </div>

        <div className="col-md-4">
          <History id={this.props.name} currentRevision={query.revision} component="environment" />
          <Security accesscontrol={environment.accesscontrol} />
        </div>

        {/*Content view*/}
        <div className="col-xs-12">
          <ul className="nav nav-tabs">
            <li className={displayClusters ? "active" : ""}>
              <Link
                to={`/environments/${envName}/clusters`}
                onClick={() => this.selectTab("clusters")}
              >
                Clusters
              </Link>
            </li>
            <li className={displayNodes ? "active" : ""}>
              <Link to={`/environments/${envName}/nodes`} onClick={() => this.selectTab("nodes")}>
                Nodes
              </Link>
            </li>
            <li className={displayInstances ? "active" : ""}>
              <Link
                to={`/environments/${envName}/instances`}
                onClick={() => this.selectTab("instances")}
              >
                Instances
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-xs-12">
          <div className="col-xs-12" style={{ height: 20 + "px" }}></div>
          {displayClusters ? <EnvironmentClusters environment={envName} /> : null}
          {displayNodes ? <EnvironmentNodes environment={envName} /> : ""}
          {displayInstances ? <EnvironmentInstances environment={envName} /> : ""}
        </div>
        <DeleteElementForm
          displayDeleteForm={this.state.displayDeleteForm}
          onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => this.handleSubmitForm(envName, null, comment, "deleteEnvironment")}
          id={envName}
        />
      </div>
    )
  }

  selectTab(tab) {
    switch (tab) {
      case "clusters":
        this.setState({
          displayClusters: true,
          displayNodes: false,
          displayInstances: false
        })
        return
      case "nodes":
        return this.setState({
          displayClusters: false,
          displayNodes: true,
          displayInstances: false
        })
      case "instances":
        return this.setState({
          displayClusters: false,
          displayNodes: false,
          displayInstances: true
        })
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    environment: state.environment_fasit.data,
    environmentClasses: state.environments.environmentClasses,
    revisions: state.revisions,
    query: parseQuery(state.router.location.search),
    resourceModalVisible: state.resources.showNewResourceForm
  }
}

export default connect(mapStateToProps)(Environment)
