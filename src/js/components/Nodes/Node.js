import React, { Component } from "react"
import { connect } from "react-redux"
import { parseQuery } from "../../utils/queryParser"
import { validAuthorization, isEmptyObject } from "../../utils/"
import { clearNodePassword, fetchFasitData, fetchNodePassword } from "../../actionCreators/node"
import { Card, CardActions, CardContent, CardHeader, List, ListItem, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import {
  CollapsibleList,
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  SecretToggle,
  Security,
  ToolButtons,
  Spinner
} from "../common/"
import { displayModal, submitForm } from "../../actionCreators/common"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Node extends Component {
  constructor(props) {
    super(props)

    this.state = {
      secretVisible: false,
      displayDeleteForm: false,
      comment: ""
    }
  }

  componentDidMount() {
    const { dispatch, hostname, query } = this.props
    dispatch(fetchFasitData(hostname, query.revision))
  }

  componentWillUnmount() {
    this.props.dispatch(clearNodePassword())
  }

  componentDidUpdate(prevProps) {
    const { dispatch, hostname, query } = this.props

    if (hostname !== prevProps.hostname || query.revision !== prevProps.query.revision) {
      this.setState({
        comment: ""
      })

      if (query.revision != prevProps.query.revision) {
        dispatch(fetchFasitData(hostname, query.revision))
      }

      // fetch new data from backend if hostname changes
      if (hostname != prevProps.hostname) {
        dispatch(fetchFasitData(hostname, query.revision))
      }
    }
  }

  showModal(mode) {
    const { dispatch } = this.props
    dispatch(displayModal("node", true, mode))
  }

  deleteNode(hostname) {
    const { dispatch } = this.props
    this.toggleComponentDisplay("displayDeleteForm")
    dispatch(submitForm(hostname, null, null, "deleteNode"))
  }

  handleSubmitForm(key, form, comment, component) {
    const { dispatch } = this.props

    if (component === "deleteNode") {
      this.toggleComponentDisplay("displayDeleteForm")
      this.setState({ comment: "" })
    }
    dispatch(submitForm(key, form, comment, component))
  }

  resetLocalState() {
    this.setState({
      comment: ""
    })
  }
  toggleComponentDisplay(component) {
    const { dispatch } = this.props
    this.setState({ [component]: !this.state[component] })
    if (component === "editMode" && this.state.editMode) this.resetLocalState()
    if (component === "editMode" && !this.state.editMode) dispatch(fetchNodePassword())
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  toggleDisplaySecret() {
    this.setState({ secretVisible: !this.state.secretVisible })
  }

  render() {
    const {
      hostname,
      config,
      user,
      node,
      query,
      dispatch,
      isFetching,
      resourceModalVisible
    } = this.props

    const { secretVisible, adgroups, comment } = this.state
    let lifecycle = Object.keys(node).length > 0 ? node.lifecycle : {}
    let authorized =
      Object.keys(node).length > 0 ? validAuthorization(user, node.accesscontrol) : false
    const password = this.props.currentPassword
      ? this.props.currentPassword
      : "No secret stored for this revision"

    return isFetching || !node.hostname ? (
      <Spinner />
    ) : (
      <div className="row">
        <div className="col-md-6" style={styles.cardPadding}>
          <CurrentRevision revisionId={query.revision} revisions={this.props.revisions} />

          <Card>
            <CardHeader
              avatar={icons.node}
              title={hostname}
              slotProps={{title: {style: styles.bold}}}
              subheader={capitalize(node.type)}
            />
            <CardContent>
              <List>
                <ListItem
                  key="environmentclass"
                  style={{ paddingTop: "0px", paddingBottom: "14px" }}
                >
                  <ListItemText
                    primary={node.environmentclass}
                    secondary="Environment class"
                  />
                </ListItem>
                <ListItem
                  key="environment"
                  style={{ paddingTop: "0px", paddingBottom: "14px" }}
                >
                  <ListItemText
                    primary={node.environment}
                    secondary="Environment"
                  />
                </ListItem>
                <ListItem
                  key="zone"
                  style={{ paddingTop: "0px", paddingBottom: "14px" }}
                >
                  <ListItemText
                    primary={node.zone}
                    secondary="Zone"
                  />
                </ListItem>

                <ListItem
                  key="cluster"
                  style={styles.tightList}
                >
                  <ListItemText primary="Clusters" />
                </ListItem>
                <List style={styles.tightList}>
                  {this.renderClusters()}
                </List>

                <ListItem
                  key="applications"
                  style={styles.tightList}
                >
                  <ListItemText primary="Applications" />
                </ListItem>
                <List style={styles.tightList}>
                  {this.renderApplications()}
                </List>

                <ListItem
                  key="username"
                  style={{ paddingTop: "0px", paddingBottom: "14px" }}
                >
                  <ListItemText
                    primary={node.username}
                    secondary="Username"
                  />
                </ListItem>
                <ListItem
                  key="password"
                  style={{ paddingTop: "0px", paddingBottom: "14px" }}
                >
                  <ListItemText
                    primary={
                      <div>
                        {secretVisible ? password : "*********"}
                        <SecretToggle
                          user={user}
                          accesscontrol={node.accesscontrol}
                          secretVisible={secretVisible}
                          toggleHandler={() => this.toggleDisplaySecret()}
                          dispatch={dispatch}
                        />
                      </div>
                    }
                    secondary="Password"
                  />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <ToolButtons
                disabled={!authorized || resourceModalVisible}
                onEditClick={() => this.showModal("edit")}
                onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                onCopyClick={() => this.showModal("copy")}
                editMode={this.state.editMode}
              />
            </CardActions>
          </Card>
          <Lifecycle lifecycle={lifecycle} />
        </div>
        {/*Side menu*/}
        <div className="col-md-4">
          {this.renderDeploymentManagerSidePanel()}
          <History id={hostname} currentRevision={query.revision} component="node" />
          <Security accesscontrol={node.accesscontrol} />
        </div>
        <DeleteElementForm
          displayDeleteForm={this.state.displayDeleteForm}
          onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => this.deleteNode(hostname)}
          id={hostname}
        />
      </div>
    )
  }

  renderDeploymentManagerSidePanel() {
    const { deploymentManager } = this.props
    const deploymentManagerReceived = !isEmptyObject(deploymentManager)

    if (deploymentManagerReceived) {
      return (
        <CollapsibleList
          primaryText="Deployment manager"
          leftAvatar={icons.deploymentManagerAvatar}
          initiallyOpen={true}
          style={{ padding: "0px" }}
          nestedItems={[
            <ListItem
              key={1}
            >
              <ListItemText
                primary={
                  <Link
                    to={`https://${deploymentManager.properties.hostname}:9043/ibm/console`}
                    target="new"
                  >
                    Deployment manager console <FontAwesomeIcon icon="external-link-alt" fixedWidth />
                  </Link>
                }
                secondary={deploymentManager.properties.hostname}
              />
            </ListItem>,
            <ListItem
              key={2}
            >
              <ListItemText
                primary={
                  <Link to={`/resources/${deploymentManager.id}`}>Deployment manager resource</Link>
                }
              />
            </ListItem>
          ]}
        />
      )
    }
  }

  renderApplications() {
    const { node } = this.props

    return node.applications.map(app => (
      <ListItem key={app} style={styles.tighterList}>
        <Link to={`/applications/${app}`}>{app}</Link>
      </ListItem>
    ))
  }

  renderClusters() {
    const { node } = this.props

    return node.cluster.map(c => (
      <ListItem key={c.name} style={styles.tighterList}>
        <Link to={`/environments/${node.environment}/clusters/${c.name}`}>{c.name}</Link>
      </ListItem>
    ))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    node: state.node_fasit.data,
    currentPassword: state.node_fasit.currentPassword,
    isFetching: state.node_fasit.isFetching,
    user: state.user,
    editMode: state.nodes.showEditNodeForm,
    hostname: ownProps.hostname,
    config: state.configuration,
    revisions: state.revisions,
    query: parseQuery(state.router.location.search),
    resourceModalVisible: state.resources.showNewResourceForm,
    deploymentManager: state.node_fasit.deploymentManager,
    deploymentManagerIsFetching: state.node_fasit.deploymentManagerIsFetching,
    deploymentManagerRequestFailed: state.node_fasit.deploymentManagerRequestFailed
  }
}

export default connect(mapStateToProps)(Node)
