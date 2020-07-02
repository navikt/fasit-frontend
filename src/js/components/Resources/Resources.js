import React, { Component } from "react";
import { connect } from "react-redux";
import ResourceCard from "./ResourceCard";
import ElementPaging from "../common/ElementPaging";

import Filters from "../Navigation/Filters";
import Spinner from "../common/Spinner";
import { fetchRestResourceOfType } from "../../actionCreators/element_lists";

class Resources extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchRestResourceOfType("resources"));
  }

  render() {
    const { resources, totalCount, isFetching, location } = this.props;
    return isFetching ? (
      <Spinner />
    ) : (
      <div className="main-content-container">
        <div className="row">
          <div className="col-sm-10">
            <Filters location={location} context="resources" />
          </div>
        </div>
        <div className="col-sm-10">
          <div className="row">
            <h4>{totalCount} resources</h4>
          </div>
          <div className="row">
            {resources.map((item, index) => {
              return <ResourceCard resource={item} key={index} />;
            })}
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
    resources: state.resources.data,
    totalCount: state.resources.headers.total_count,
    isFetching: state.resources.isFetching,
  };
};

export default connect(mapStateToProps)(Resources);
