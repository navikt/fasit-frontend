import React, { useState, useEffect } from "react"
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
import NotFound from "../NotFound"
import { displayModal, submitForm } from "../../actionCreators/common"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Node({ dispatch, hostname, query, node, user, config, isFetching, revisions, currentPassword, resourceModalVisible, deploymentManager, requestFailed }) {
  const [secretVisible, setSecretVisible] = useState(false)
  const [displayDeleteForm, setDisplayDeleteForm] = useState(false)
  const [comment, setComment] = useState("")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    dispatch(fetchFasitData(hostname, query.revision))
    return () => {
      dispatch(clearNodePassword())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setComment("")
    dispatch(fetchFasitData(hostname, query.revision))
  }, [hostname, query.revision]) // eslint-disable-line react-hooks/exhaustive-deps

  const showModal = (mode) => {
    dispatch(displayModal("node", true, mode))
  }

  const deleteNode = (host) => {
    setDisplayDeleteForm(prev => !prev)
    dispatch(submitForm(host, null, null, "deleteNode"))
  }

  const toggleComponentDisplay = (component) => {
    if (component === "displayDeleteForm") {
      setDisplayDeleteForm(prev => !prev)
    } else if (component === "editMode") {
      if (editMode) {
        setComment("")
      } else {
        dispatch(fetchNodePassword())
      }
      setEditMode(prev => !prev)
    }
  }

  const toggleDisplaySecret = () => {
    setSecretVisible(prev => !prev)
  }

  const renderDeploymentManagerSidePanel = () => {
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

  const renderApplications = () => {
    return node.applications.map(app => (
      <ListItem key={app} style={styles.tighterList}>
        <Link to={`/applications/${app}`}>{app}</Link>
      </ListItem>
    ))
  }

  const renderClusters = () => {
    return node.cluster.map(c => (
      <ListItem key={c.name} style={styles.tighterList}>
        <Link to={`/environments/${node.environment}/clusters/${c.name}`}>{c.name}</Link>
      </ListItem>
    ))
  }

  let lifecycle = Object.keys(node).length > 0 ? node.lifecycle : {}
  let authorized =
    Object.keys(node).length > 0 ? validAuthorization(user, node.accesscontrol) : false
  const password = currentPassword
    ? currentPassword
    : "No secret stored for this revision"

  if (requestFailed) {
    if (requestFailed.startsWith("404")) {
      return <NotFound />
    }
    return (
      <div>
        Retrieving node {hostname} failed with the following message:
        <br />
        <pre><i>{requestFailed}</i></pre>
      </div>
    )
  }

  return isFetching || !node.hostname ? (
    <Spinner />
  ) : (
    <div className="row">
      <div className="col-md-6" style={styles.cardPadding}>
        <CurrentRevision revisionId={query.revision} revisions={revisions} />

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
                {renderClusters()}
              </List>

              <ListItem
                key="applications"
                style={styles.tightList}
              >
                <ListItemText primary="Applications" />
              </ListItem>
              <List style={styles.tightList}>
                {renderApplications()}
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
                        toggleHandler={() => toggleDisplaySecret()}
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
              onEditClick={() => showModal("edit")}
              onDeleteClick={() => toggleComponentDisplay("displayDeleteForm")}
              onCopyClick={() => showModal("copy")}
              editMode={editMode}
            />
          </CardActions>
        </Card>
        <Lifecycle lifecycle={lifecycle} />
      </div>
      {/*Side menu*/}
      <div className="col-md-4">
        {renderDeploymentManagerSidePanel()}
        <History id={hostname} currentRevision={query.revision} component="node" />
        <Security accesscontrol={node.accesscontrol} />
      </div>
      <DeleteElementForm
        displayDeleteForm={displayDeleteForm}
        onClose={() => toggleComponentDisplay("displayDeleteForm")}
        onSubmit={() => deleteNode(hostname)}
        id={hostname}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    node: state.node_fasit.data,
    requestFailed: state.node_fasit.requestFailed,
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
