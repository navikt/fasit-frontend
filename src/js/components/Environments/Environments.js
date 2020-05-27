import React, { Component } from "react";
import { connect } from "react-redux";
import Environment from "./Environment";
import { submitFilterString } from "../../actionCreators/element_lists";
import { Card } from "../common/Card";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Environments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Environments CDM");
    const { dispatch, match } = this.props;
    if (!match.params.environment) {
      dispatch(submitFilterString("environments", 0));
    }
  }

  render() {
    const { environments, match, totalCount, location } = this.props;

    if (match.params.environment) {
      return (
        <Environment
          name={match.params.environment}
          location={location}
          clusterName={match.params.cluster}
        />
      );
    }

    return (
      <div className="environments-container">
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
