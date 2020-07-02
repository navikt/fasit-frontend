import React, { Component } from "react";
import { connect } from "react-redux";
import ElementPaging from "../common/ElementPaging";
import InstanceCard from "./InstanceCard";
import Filters from "../Navigation/Filters";
import {
  fetchRestResourceOfType /*, setFilterContext*/,
} from "../../actionCreators/element_lists";
import Spinner from "../common/Spinner";

class Instances extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRestResourceOfType("instances"));
  }

  render() {
    const { instances, totalCount, isFetching, location } = this.props;

    return isFetching ? (
      <Spinner />
    ) : (
      <div className="main-content-container">
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <Filters location={location} context="instances" />
          </div>
        </div>
        <div className="col-sm-10">
          <div className="row">
            <h4>{totalCount} instances</h4>
          </div>
          <div className="row">
            {instances.map((item, index) => (
              <InstanceCard instance={item} key={index} />
            ))}
            <div className="col-sm-10">
              <ElementPaging totalCount={totalCount} location={location} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    instances: state.instances.data,
    totalCount: state.instances.headers.total_count,
    isFetching: state.instances.isFetching,
  };
};

export default connect(mapStateToProps)(Instances);
