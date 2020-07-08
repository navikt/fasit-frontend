import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchEnvironmentCluster } from "../../actionCreators/environment"
import { styles } from "../../commonStyles/commonInlineStyles"
import { Card, CardItem, CardLinkItem, CardList } from "../common/Card"
import { getQueryParam } from "../../utils"

import { CurrentRevision, Spinner, RevisionsView } from "../common"

class EnvironmentCluster extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDeleteForm: false,
    }
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props

    const revision = getQueryParam(location.search, "revision")
    if (revision) {
      dispatch(
        fetchEnvironmentCluster(
          match.params.environment,
          match.params.clusterName,
          revision
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
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, location } = this.props
    const revision = getQueryParam(location.search, "revision")
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    )

    if (Object.keys(nextProps.cluster).length > 0) {
      this.setState({
        adgroups: nextProps.cluster.accesscontrol.adgroups,
      })
    }
    if (nextPropsRevision !== revision) {
      dispatch(
        fetchEnvironmentCluster(
          this.props.match.params.environment,
          this.props.match.params.clusterName,
          nextPropsRevision
        )
      )
    }
  }

  render() {
    const { cluster, isFetching, user } = this.props
    const revision = getQueryParam(location.search, "revision")

    return isFetching || !cluster.clustername ? (
      <Spinner />
    ) : (
      <div className="row">
        {
          <CurrentRevision
            revisionId={revision}
            revisions={this.props.revisions}
          />
        }
        <div className="col-md-6" style={styles.cardPadding}>
          <Card
            title={`Cluster ${cluster.clustername}`}
            subtitle={`${cluster.environment} - ${cluster.zone}`}
          >
            <CardItem
              label="Loadbalancer URL"
              value={cluster.loadbalancerurl}
            />
            <CardList label="Applications">
              {cluster.applications.map((app, idx) => (
                <CardLinkItem
                  key={idx}
                  label={app.name}
                  linkTo={`/applications/${app.name}`}
                />
              ))}
            </CardList>
            <CardList label="Nodes">
              {cluster.nodes.map((node, idx) => (
                <CardLinkItem
                  key={idx}
                  label={node.name}
                  linkTo={`/nodes/${node.name}`}
                />
              ))}
            </CardList>
          </Card>
        </div>
        {/*Side menu*/}

        <RevisionsView
          id={cluster.id}
          currentRevision={revision}
          component="cluster"
          location={location}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cluster: state.environment_cluster_fasit.data,
    isFetching: state.environment_cluster_fasit.isFetching,
    user: state.user,
    revisions: state.revisions,
  }
}

export default connect(mapStateToProps)(EnvironmentCluster)
