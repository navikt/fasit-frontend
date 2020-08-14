import React, { Component } from "react"
import { connect } from "react-redux"
import { isEmptyObject, getQueryParam } from "../../utils/"
import { fetchFasitData } from "../../actionCreators/node"
import { CurrentRevision, RevisionsView, Spinner } from "../common/"
import { Card, CardItem, CardList, CardLinkItem } from "../common/Card"
import { styles } from "../../commonStyles/commonInlineStyles"
import { capitalize } from "../../utils"

class Node extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props
    const revision = getQueryParam(location.search, "revision")
    dispatch(fetchFasitData(match.params.node, revision))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, location, match } = this.props
    const nodeName = match.params.node
    const nextPropsNodeName = nextProps.match.params.node
    const revision = getQueryParam(location.search, "revision")
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    )

    if (nextPropsRevision != revision) {
      dispatch(fetchFasitData(nodeName, nextPropsRevision))
    }

    // fetch new data from backend if hostname changes
    if (nextPropsNodeName != nodeName) {
      dispatch(fetchFasitData(nextPropsNodeName, nextPropsRevision))
    }
  }

  render() {
    const { node, isFetching, location, revisions } = this.props
    const revision = getQueryParam(location.search, "revision")

    return isFetching || !node.hostname ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">
          <CurrentRevision revisionId={revision} revisions={revisions} />
          <div className="col-md-6" style={styles.cardPadding}>
            <Card title={node.hostname} subtitle={capitalize(node.type)}>
              <CardItem
                label="Environment class"
                value={node.environmentclass}
              />
              <CardItem
                label="Environment"
                value={node.environment}
                linkTo={`/environments/${node.environment}`}
              />
              <CardItem label="Zone" value={node.zone} />
              <CardList label="Clusters">
                {node.cluster.map((cluster, idx) => (
                  <CardLinkItem
                    key={idx}
                    label={cluster.name}
                    linkTo={`/environments/${node.environment}/clusters/${cluster.name}`}
                  />
                ))}
              </CardList>

              <CardList label="Applications">
                {node.applications.map((app, idx) => (
                  <CardLinkItem
                    key={idx}
                    label={app}
                    linkTo={`/applications/${app}`}
                  />
                ))}
              </CardList>
              <CardItem label="Username" value={node.username} />
              <CardItem
                label="Passord"
                value="Not visible in GUI, only machines should read this. Please use a personal user for access to servers."
              />
              {this.renderDeploymentManager()}
            </Card>
          </div>

          <RevisionsView
            id={node.hostname}
            currentRevision={revision}
            component="node"
            location={location}
          />
        </div>
      </div>
    )
  }

  renderDeploymentManager() {
    const { deploymentManager } = this.props
    const hasDeploymentManager = !isEmptyObject(deploymentManager)

    if (hasDeploymentManager) {
      return (
        <CardList label="Deployment manager shoutcuts">
          <CardLinkItem
            label="Admin console"
            linkTo={`https://${deploymentManager.properties.hostname}:9043/ibm/console`}
          />
          <CardLinkItem
            label="Deployment manager fasit resource"
            linkTo={`/resources/${deploymentManager.id}`}
          />
        </CardList>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    node: state.node_fasit.data,
    isFetching: state.node_fasit.isFetching,
    revisions: state.revisions,
    deploymentManager: state.node_fasit.deploymentManager,
    deploymentManagerIsFetching: state.node_fasit.deploymentManagerIsFetching,
    deploymentManagerRequestFailed:
      state.node_fasit.deploymentManagerRequestFailed,
  }
}

export default connect(mapStateToProps)(Node)
