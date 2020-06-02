import React, { Component } from "react";
import { connect } from "react-redux";
import ElementPaging from "../common/ElementPaging";
import Filters from "../Navigation/Filters";
import { Card } from "../common/Card";
import { submitFilterString } from "../../actionCreators/element_lists";
import { styles } from "../../commonStyles/commonInlineStyles";
import Spinner from "../common/Spinner";
import { capitalize } from "../../utils/";

class Nodes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(submitFilterString("nodes", 0));
  }

  render() {
    const { nodes, totalCount, isFetching, location } = this.props;

    return isFetching ? (
      <Spinner />
    ) : (
      <div className="main-content-container">
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <Filters location={location} context="nodes" />
          </div>
        </div>
        <div className="col-sm-10">
          <div className="row">
            <h4>{totalCount} nodes</h4>
          </div>
          <div className="row">
            {nodes.map((node, index) => (
              <div
                key={index}
                className="col-md-10"
                style={{ paddingLeft: "0px" }}
              >
                <Card
                  title={node.hostname}
                  linkTo={`/nodes/${node.hostname}`}
                  subtitle={`${node.environment} ${capitalize(node.type)}`}
                />
              </div>
            ))}
            <div className="row">
              <div className="col-sm-2 pull-right">
                <ElementPaging totalCount={totalCount} context="nodes" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes.data,
    totalCount: state.nodes.headers.total_count,
    isFetching: state.nodes.isFetching,
  };
};

export default connect(mapStateToProps)(Nodes);
