import React, { Component } from "react";
import moment from "moment";
import { Card, CardLinkItem, CardList } from "../common/Card";
import { connect } from "react-redux";
import { fetchRevisions } from "../../actionCreators/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from ".";

class RevisionsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAllRevisions: false,
    };
  }

  componentDidMount() {
    const { dispatch, id, component } = this.props;
    dispatch(fetchRevisions(component, id));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, id, component } = nextProps;

    if (this.props.id !== nextProps.id) {
      dispatch(fetchRevisions(component, id));
    }
  }

  showRevisionsFooter() {
    const { revisions } = this.props;
    if (revisions.data.length > 5 && !this.state.displayAllRevisions) {
      return (
        <div className="information-box-footer">
          <a
            className="text-right arrow cursor-pointer"
            onClick={() => this.setState({ displayAllRevisions: true })}
          >
            Show all ({revisions.data.length}){" "}
            <FontAwesomeIcon icon="angle-double-down" />
          </a>
        </div>
      );
    }
    if (revisions.data.length > 5 && this.state.displayAllRevisions) {
      return (
        <div className="information-box-footer">
          <a
            className="text-right arrow cursor-pointer"
            onClick={() => this.setState({ displayAllRevisions: false })}
          >
            Show less <FontAwesomeIcon icon="angle-double-up" />
          </a>
        </div>
      );
    }
  }

  render() {
    moment.locale("en");
    const { revisions, location } = this.props;

    if (revisions.isFetching) {
      return <Spinner />;
    } else if (revisions.requestFailed)
      return <div key="1">Unable to fetch revisions</div>;

    let displayRevisions = revisions.data;

    if (!this.state.displayAllRevisions)
      displayRevisions = revisions.data.slice(0, 5);
    return (
      <div className="col-md-3" style={{ marginTop: "1rem" }}>
        <Card title="History">
          <CardList>
            {displayRevisions.map((rev, idx) => {
              return (
                <CardLinkItem
                  key={idx}
                  label={`${moment(rev.timestamp).format(
                    "DD.MM.YY HH:mm"
                  )} by ${rev.author}`}
                  linkTo={`${location.pathname}?revision=${rev.revision}`}
                  secondaryText={rev.message}
                />
              );
            })}
          </CardList>
          {this.showRevisionsFooter()}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  revisions: state.revisions,
});

export default connect(mapStateToProps)(RevisionsView);
