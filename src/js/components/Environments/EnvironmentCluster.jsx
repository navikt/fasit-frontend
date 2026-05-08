import { Card, CardActions, CardContent, CardHeader, List, ListItem, ListItemText } from "@mui/material"
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { parseQuery } from "../../utils/queryParser"
import { Link } from "react-router-dom"
import { fetchEnvironmentNodes } from "../../actionCreators/environment"
import {
  displayModal,
  submitForm
} from "../../actionCreators/common"
import { fetchEnvironmentCluster } from "../../actionCreators/environment"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { validAuthorization } from "../../utils/index"
import {
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  ToolButtons,
  Spinner
} from "../common"

function EnvironmentCluster({ dispatch, cluster, isFetching, user, match, revisions, query }) {
  const [displayDeleteForm, setDisplayDeleteForm] = useState(false)
  const [adgroups, setAdgroups] = useState(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (query.revision) {
      dispatch(
        fetchEnvironmentCluster(
          match.params.environment,
          match.params.clusterName,
          query.revision
        )
      )
    } else {
      dispatch(
        fetchEnvironmentCluster(
          match.params.environment,
          match.params.clusterName
        )
      )
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Object.keys(cluster).length > 0) {
      setAdgroups(cluster.accesscontrol.adgroups)
    }
  }, [cluster]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(
      fetchEnvironmentCluster(
        match.params.environment,
        match.params.clusterName,
        query.revision
      )
    )
  }, [query.revision]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleComponentDisplay = (component) => {
    if (component === "displayDeleteForm") {
      setDisplayDeleteForm(prev => !prev)
    }
  }

  const renderApplications = () => {
    return cluster.applications.map(app => (
      <ListItem key={app.name} style={styles.tighterList}>
        <Link to={`/instances/${app.id}`}>{app.name}</Link>
      </ListItem>
    ))
  }

  const renderNodes = () => {
    return cluster.nodes.map(node => (
      <ListItem key={node.name} style={styles.tighterList}>
        <Link to={`/nodes/${node.name}`}>{node.name}</Link>
      </ListItem>
    ))
  }

  const showModal = (mode) => {
    if (mode === "edit") {
      dispatch(fetchEnvironmentNodes(cluster.environment))
    }
    dispatch(displayModal("cluster", true, mode, cluster))
  }

  const deleteCluster = (clusterName) => {
    setDisplayDeleteForm(prev => !prev)
    dispatch(
      submitForm(
        clusterName,
        { env: match.params.environment },
        null,
        "deleteCluster"
      )
    )
  }

  let authorized =
    Object.keys(cluster).length > 0
      ? validAuthorization(user, cluster.accesscontrol)
      : false

  return isFetching || !cluster.clustername ? (
    <Spinner />
  ) : (
    <div className="row">
      <div className="col-md-6" style={styles.cardPadding}>
        <CurrentRevision
          revisionId={query.revision}
          revisions={revisions}
        />

        <Card>
          <CardHeader
            avatar={icons.cluster}
            title={`Cluster ${cluster.clustername}`}
            slotProps={{title: {style: styles.bold}}}
            subheader={`${cluster.environment} - ${cluster.zone}`}
          />

          <CardContent>
            <List>
              {cluster.loadbalancerurl && (
                <ListItem
                  key="loadbalancerurl"
                  style={styles.tightList}
                >
                  <ListItemText
                    primary={cluster.loadbalancerurl}
                    secondary="Loadbalancer URL"
                  />
                </ListItem>
              )}
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
                key="nodes"
                style={styles.tightList}
              >
                <ListItemText primary="Nodes" />
              </ListItem>
              <List style={styles.tightList}>
                {renderNodes()}
              </List>
            </List>
          </CardContent>
          <CardActions>
            <ToolButtons
              disabled={!authorized}
              hideCopyButton={true}
              hideDeleteButton={true}
              onEditClick={() => showModal("edit")}
              onDeleteClick={() =>
                toggleComponentDisplay("displayDeleteForm")
              }
              editMode={editMode}
            />
          </CardActions>
        </Card>

        <Lifecycle
          lifecycle={cluster.lifecycle}
        />
      </div>

      {/*Side menu*/}
      <div className="col-md-4">
        <History
          id={cluster.id}
          currentRevision={query.revision}
          component="cluster"
        />
      </div>

      <DeleteElementForm
        displayDeleteForm={displayDeleteForm}
        onClose={() => toggleComponentDisplay("displayDeleteForm")}
        onSubmit={() => deleteCluster(cluster.clustername)}
        id={cluster.clustername}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cluster: state.environment_cluster_fasit.data,
    isFetching: state.environment_cluster_fasit.isFetching,
    user: state.user,
    revisions: state.revisions,
    query: parseQuery(state.router.location.search)
  }
}

export default connect(mapStateToProps)(EnvironmentCluster)
