import { Card, CardActions, CardContent, CardHeader, List, ListItem, ListItemText } from "@material-ui/core"
import React, { Component } from "react"
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
import { validAuthorization } from "../../utils/"
import {
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  ToolButtons,
  Spinner
} from "../common"

class EnvironmentCluster extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDeleteForm: false
    }
  }

  componentDidMount() {
    const { dispatch, query } = this.props
    if (query.revision) {
      dispatch(
        fetchEnvironmentCluster(
          this.props.match.params.environment,
          this.props.match.params.clusterName,
          query.revision
        )
      )
    } else {
      dispatch(
        fetchEnvironmentCluster(
          this.props.match.params.environment,
          this.props.match.params.clusterName
        )
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, match, query, cluster } = this.props

    if (cluster !== prevProps.cluster && Object.keys(cluster).length > 0) {
      this.setState({
        adgroups: cluster.accesscontrol.adgroups
      })
    }
    if (query.revision !== prevProps.query.revision) {
      dispatch(
        fetchEnvironmentCluster(
          match.params.environment,
          match.params.clusterName,
          query.revision
        )
      )
    }
  }

  toggleComponentDisplay(component) {
    const { dispatch, cluster } = this.props
    this.setState({ [component]: !this.state[component] })
  }

  render() {
    const {
      cluster,
      isFetching,
      user,
      match,
      environments,
      applicationNames,
      environmentNodes,
      revisions,
      query
    } = this.props

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
            revisions={this.props.revisions}
          />

          <Card>
            <CardHeader
              avatar={icons.cluster}
              title={`Cluster ${cluster.clustername}`}
              titleTypographyProps={{style: styles.bold}}
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
                  {this.renderApplications()}
                </List>
                <ListItem
                  key="nodes"
                  style={styles.tightList}
                >
                  <ListItemText primary="Nodes" />
                </ListItem>
                <List style={styles.tightList}>
                  {this.renderNodes()}
                </List>
              </List>
            </CardContent>
            <CardActions>
              <ToolButtons
                disabled={!authorized}
                hideCopyButton={true}
                hideDeleteButton={true}
                onEditClick={() => this.showModal("edit")}
                onDeleteClick={() =>
                  this.toggleComponentDisplay("displayDeleteForm")
                }
                editMode={this.state.editMode}
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
          displayDeleteForm={this.state.displayDeleteForm}
          onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => this.deleteCluster(cluster.clustername)}
          id={cluster.clustername}
        />
      </div>
    )
  }

  renderApplications() {
    const { cluster } = this.props

    return cluster.applications.map(app => (
      <ListItem key={app.name} style={styles.tighterList}>
        <Link to={`/instances/${app.id}`}>{app.name}</Link>
      </ListItem>
    ))
  }

  renderNodes() {
    const { cluster } = this.props
    return cluster.nodes.map(node => (
      <ListItem key={node.name} style={styles.tighterList}>
        <Link to={`/nodes/${node.name}`}>{node.name}</Link>
      </ListItem>
    ))
  }

  showModal(mode) {
    const { dispatch } = this.props

    if (mode === "edit") {
      dispatch(fetchEnvironmentNodes(this.props.cluster.environment))
    }
    dispatch(displayModal("cluster", true, mode, this.props.cluster))
  }

  deleteCluster(clusterName) {
    const { dispatch, match } = this.props
    this.toggleComponentDisplay("displayDeleteForm")
    dispatch(
      submitForm(
        clusterName,
        { env: match.params.environment },
        null,
        "deleteCluster"
      )
    )
  }
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
