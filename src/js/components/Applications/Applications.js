import React, { Component } from "react";
import { connect } from "react-redux";
//import Filters from "../Navigation/Filters"
import { submitFilterString } from "../../actionCreators/element_lists";
import Spinner from "../common/Spinner";
import { Card } from "../common/Card";
import { styles } from "../../commonStyles/commonInlineStyles";

export class Applications extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(submitFilterString("applications", 0));
  }

  render() {
    const { applications, totalCount, isFetching } = this.props;

    return isFetching ? (
      <Spinner />
    ) : (
      <div className="col-md-6">
        <div>
          <h4>{totalCount} Aplications</h4>
        </div>
        {applications.map((application, index) => {
          return (
            <div style={styles.cardPadding} key={index}>
              <Card
                title={application.name}
                linkTo={`/applications/${application.name}`}
                subtitle={`Group id: ${application.groupid} Artifact id: ${application.artifactid}`}
              ></Card>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applications.data,
    totalCount: state.applications.headers.total_count,
    isFetching: state.applications.isFetching,
  };
};

export default connect(mapStateToProps)(Applications);
