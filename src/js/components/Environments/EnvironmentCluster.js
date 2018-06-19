import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import {
  fetchEnvironmentCluster,
  fetchEnvironmentNodes
} from "../../actionCreators/environment"
import {
  DeleteElementForm,
  FormListBox,
  FormString,
  FormDropDown,
  FormLinkDropDown,
  Lifecycle,
  AccessControl,
  SubmitForm,
  ToolButtons,
  RescueElementForm,
  History,
  CurrentRevision
} from "../common"
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card"
import { List, ListItem } from "material-ui/List"
import { validAuthorization } from "../../utils/"
import {
  displayModal,
  rescueElement,
  submitForm
} from "../../actionCreators/common"
import { icons, styles } from "../../commonStyles/commonInlineStyles"

class EnvironmentCluster extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDeleteForm: false,
      displayRescueForm: false
    }
  }

  componentDidMount() {
    const { dispatch, query } = this.props
    if (query.revision) {
      dispatch(
        fetchEnvironmentCluster(
          this.props.params.environment,
          this.props.params.clusterName,
          query.revision
        )
      )
    } else {
      dispatch(
        fetchEnvironmentCluster(
          this.props.params.environment,
          this.props.params.clusterName
        )
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, params, query } = this.props

    if (Object.keys(nextProps.cluster).length > 0) {
      this.setState({
        adgroups: nextProps.cluster.accesscontrol.adgroups
      })
    }
    if (nextProps.query.revision !== query.revision) {
      dispatch(
        fetchEnvironmentCluster(
          this.props.params.environment,
          this.props.params.clusterName,
          nextProps.query.revision
        )
      )
    }
  }

  toggleComponentDisplay(component) {
    const { dispatch, cluster } = this.props
    this.setState({ [component]: !this.state[component] })
  }

  rescueClusters() {
    const { dispatch, cluster } = this.props
    const id = cluster.id
    this.toggleComponentDisplay("displayRescueForm")
    dispatch(rescueElement(id, "cluster"))
  }

  render() {
    
    const {
      cluster,
      isFetching,
      user,
      params,
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
      <i className="fa fa-spinner fa-pulse fa-2x"> </i>
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
              titleStyle={styles.bold}
              subtitle={`${cluster.environment} - ${cluster.zone}`}
            />

            <CardText>
              <List>
                {cluster.loadbalancerurl && (
                  <ListItem
                    key="loadbalancerurl"
                    style={styles.tightList}
                    disabled={true}
                    primaryText={cluster.loadbalancerurl}
                    secondaryText="Loadbalancer URL"
                  />
                )}
                <ListItem
                  key="applications"
                  style={styles.tightList}
                  disabled={true}
                  initiallyOpen={true}
                  autoGenerateNestedIndicator={false}
                  primaryText="Applications"
                  nestedListStyle={styles.tightList}
                  nestedItems={this.renderApplications()}
                />
                <ListItem
                  key="nodes"
                  style={styles.tightList}
                  disabled={true}
                  initiallyOpen={true}
                  autoGenerateNestedIndicator={false}
                  primaryText="Nodes"
                  nestedListStyle={styles.tightList}
                  nestedItems={this.renderNodes()}
                />
              </List>
            </CardText>
            <CardActions>
              <ToolButtons
                disabled={!authorized}
                hideCopyButton={true}
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
            rescueAction={() =>
              this.toggleComponentDisplay("displayRescueForm")
            }
            authorized={authorized}
          />
        </div>

        {/*Side menu*/}
        <div className="col-md-4">
          <History
            id={cluster.clustername}
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
        <RescueElementForm
          displayRescueForm={this.state.displayRescueForm || false}
          onClose={() => this.toggleComponentDisplay("displayRescueForm")}
          onSubmit={() => this.rescueClusters()}
          id={cluster.clustername}
        />
      </div>
    )
  }

  renderApplications() {
    const { cluster } = this.props

    return cluster.applications.map(app => (
      <ListItem key={app.name} style={styles.tighterList} disabled={true}>
        <Link to={"/instances/${app.id}"}>{app.name}</Link>
      </ListItem>
    ))
  }

  renderNodes() {
    const { cluster } = this.props
    return cluster.nodes.map(node => (
      <ListItem key={node.name} style={styles.tighterList} disabled={true}>
        <Link to={"/nodes/${node.name}"}>{node.name}</Link>
      </ListItem>
    ))
  }

  showModal(mode) {
    const { dispatch } = this.props
    dispatch(displayModal("cluster", true, mode, this.props.cluster))
  }

  deleteCluster(clusterName) {
    const { dispatch, params } = this.props
    this.toggleComponentDisplay("displayDeleteForm")
    dispatch(
      submitForm(
        clusterName,
        { env: params.environment },
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
    query: state.routing.locationBeforeTransitions.query
  }
}

export default connect(mapStateToProps)(EnvironmentCluster)
