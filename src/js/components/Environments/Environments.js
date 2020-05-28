import React, { Component } from "react";
import { connect } from "react-redux";
import { submitFilterString } from "../../actionCreators/element_lists";
import { Card } from "../common/Card";

class Environments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(submitFilterString("environments", 0));
  }

  render() {
    const { environments, totalCount } = this.props;

    return (
      <div className="col-md-6">
        <div>
          <h4>{totalCount} environments</h4>
        </div>
        {environments.map((environment, index) => {
          return (
            <Card
              key={index}
              title={environment.name.toUpperCase()}
              subtitle={`Environment class: ${environment.environmentclass}`}
              linkTo={`/environments/${environment.name}`}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    environments: state.environments.data,
    totalCount: state.environments.headers.total_count,
  };
};

export default connect(mapStateToProps)(Environments);
