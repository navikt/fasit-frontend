import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchEnvironmentClusters,
  clearEnvironmentClusters,
} from "../../actionCreators/environment";
import Select from "react-select";
import { Spinner } from "../common";
import Typography from "@material-ui/core/Typography";

class EnvironmentClusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cluster: "",
      application: "",
      node: "",
    };
  }

  componentDidMount() {
    const { dispatch, environment } = this.props;
    if (environment) dispatch(fetchEnvironmentClusters(environment));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, environment } = this.props;
    if (environment != nextProps.environment && nextProps.environment) {
      dispatch(fetchEnvironmentClusters(nextProps.environment));
    }
  }
  compnentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearEnvironmentClusters());
  }

  render() {
    const { cluster, application, node } = this.state;
    const { clusters, isFetching } = this.props;

    const clustersFilteredByName = clusters.filter((c) =>
      !cluster || c.clustername === cluster ? true : false
    );
    const clustersFilteredByNameAndApplication = clustersFilteredByName.filter(
      (c) =>
        !application ||
        c.applications.filter((app) => app.name === application).length > 0
          ? true
          : false
    );
    const clustersFilteredByNameApplicationAndNode = clustersFilteredByNameAndApplication.filter(
      (c) =>
        !node || c.nodes.filter((n) => n.name === node).length > 0
          ? true
          : false
    );

    const clusterNames = clusters.map((c) => c.clustername);
    const applicationNames = clusters
      .reduce((a, b) => a.concat(b.applications), [])
      .map((a) => a.name);
    const nodeNames = clusters
      .reduce((a, b) => a.concat(b.nodes), [])
      .map((a) => a.name);

    return isFetching ? (
      <Spinner />
    ) : (
      <div style={{ paddingTop: 40 }}>
        <Typography variant="h5">Clusters</Typography>
        <div
          style={{ width: "350px", paddingTop: 20, display: "inline-block" }}
        >
          <Select
            resetValue=""
            placeholder="Cluster"
            isClearable={true}
            name="form-field-name"
            value={cluster ? { label: cluster, value: cluster } : null}
            options={this.convertToSelectObject(clusterNames)}
            onChange={(e) => this.handleChange("cluster", e ? e.value : null)}
          />
        </div>
        <div style={{ width: 250, display: "inline-block", paddingLeft: 20 }}>
          <Select
            resetValue=""
            placeholder="Application"
            isClearable={true}
            name="form-field-name"
            value={
              application ? { label: application, value: application } : null
            }
            options={this.convertToSelectObject(applicationNames)}
            onChange={(e) =>
              this.handleChange("application", e ? e.value : null)
            }
          />
        </div>
        <div style={{ width: 250, display: "inline-block", paddingLeft: 20 }}>
          <Select
            resetValue=""
            placeholder="Node"
            isClearable={true}
            name="form-field-name"
            value={node ? { label: node, value: node } : null}
            options={this.convertToSelectObject(nodeNames)}
            onChange={(e) => this.handleChange("node", e ? e.value : null)}
          />
        </div>
        <table className="table table-hover" style={{ maxWidth: 850 }}>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {clustersFilteredByNameApplicationAndNode.map((cluster) => {
              return (
                <tr key={cluster.id}>
                  <td>
                    <Link
                      to={`/environments/${this.props.environment}/clusters/${cluster.clustername}`}
                    >
                      {cluster.clustername}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  convertToSelectObject(values) {
    return values.map((value) => {
      return { value, label: value };
    });
  }

  handleChange(field, value, tre) {
    this.setState({ [field]: value });
  }
}

const mapStateToProps = (state) => {
  return {
    clusters: state.environment_clusters.data,
    isFetching: state.environment_clusters.isFetching,
  };
};

export default connect(mapStateToProps)(EnvironmentClusters);
