import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEnvironmentNodes } from "../../actionCreators/environment";
import { displayModal, submitForm } from "../../actionCreators/common";
import { fetchEnvironmentCluster } from "../../actionCreators/environment";
import { styles } from "../../commonStyles/commonInlineStyles";
import { validAuthorization } from "../../utils/";
import { Card, CardItem, CardLinkItem, CardList } from "../common/Card";
import { getQueryParam } from "../../utils";

import {
  CurrentRevision,
  DeleteElementForm,
  ToolButtons,
  Spinner,
  RevisionsView,
} from "../common";

class EnvironmentCluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDeleteForm: false,
    };
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props;

    const revision = getQueryParam(location.search, "revision");
    if (revision) {
      dispatch(
        fetchEnvironmentCluster(
          match.params.environment,
          match.params.clusterName,
          revision
        )
      );
    } else {
      dispatch(
        fetchEnvironmentCluster(
          match.params.environment,
          match.params.clusterName
        )
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, params, location } = this.props;
    const revision = getQueryParam(location.search, "revision");
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    );

    if (Object.keys(nextProps.cluster).length > 0) {
      this.setState({
        adgroups: nextProps.cluster.accesscontrol.adgroups,
      });
    }
    if (nextPropsRevision !== revision) {
      dispatch(
        fetchEnvironmentCluster(
          this.props.match.params.environment,
          this.props.match.params.clusterName,
          nextPropsRevision
        )
      );
    }
  }

  toggleComponentDisplay(component) {
    const { dispatch, cluster } = this.props;
    this.setState({ [component]: !this.state[component] });
  }

  render() {
    const { cluster, isFetching, user } = this.props;

    const revision = getQueryParam(location.search, "revision");

    let authorized =
      Object.keys(cluster).length > 0
        ? validAuthorization(user, cluster.accesscontrol)
        : false;

    return isFetching || !cluster.clustername ? (
      <Spinner />
    ) : (
      <React.Fragment>
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
            </Card>
          </div>
          {/*Side menu*/}
          <div className="col-md-4" style={styles.cardPadding}>
            {
              <RevisionsView
                id={cluster.id}
                currentRevision={revision}
                component="cluster"
                location={location}
              />
            }
          </div>

          {/*<DeleteElementForm
          displayDeleteForm={this.state.displayDeleteForm}
          onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => this.deleteCluster(cluster.clustername)}
          id={cluster.clustername}
        />*/}
        </div>
      </React.Fragment>
    );
  }

  showModal(mode) {
    const { dispatch } = this.props;

    if (mode === "edit") {
      dispatch(fetchEnvironmentNodes(this.props.cluster.environment));
    }
    dispatch(displayModal("cluster", true, mode, this.props.cluster));
  }

  deleteCluster(clusterName) {
    const { dispatch, params } = this.props;
    this.toggleComponentDisplay("displayDeleteForm");
    dispatch(
      submitForm(
        clusterName,
        { env: params.environment },
        null,
        "deleteCluster"
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cluster: state.environment_cluster_fasit.data,
    isFetching: state.environment_cluster_fasit.isFetching,
    user: state.user,
    revisions: state.revisions,
  };
};

export default connect(mapStateToProps)(EnvironmentCluster);
