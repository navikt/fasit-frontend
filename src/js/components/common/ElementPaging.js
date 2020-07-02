import React, { Component } from "react";
import PropTypes from "prop-types";
//import { connect } from "react-redux";
import { submitFilterString } from "../../actionCreators/element_lists";
import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ElementPaging extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  changePage(newPage) {
    const { location } = this.props;
    const parsedParms = new URLSearchParams(location.search);
    parsedParms.set("page", newPage);
    return parsedParms.toString();
  }

  getCurrentPageFromQueryParam() {
    const pageParam =
      new URLSearchParams(this.props.location.search).get("page") || 0;
    return parseInt(pageParam);
  }

  render() {
    const { totalCount, location } = this.props;
    const lastPage = calculateLastPage(totalCount);
    const currentPage = this.getCurrentPageFromQueryParam();

    const nextPage = this.changePage(currentPage + 1);
    const prevPage = this.changePage(currentPage - 1);

    return (
      <div style={{ width: "100%", paddingTop: "1rem" }}>
        <div className="pull-right element-paging">
          {currentPage !== 0 && (
            <Link to={{ ...location, search: prevPage }}>prev</Link>
          )}
          {currentPage + 1} / {lastPage + 1}
          {currentPage !== lastPage && (
            <Link to={{ ...location, search: nextPage }}>next</Link>
          )}
        </div>
      </div>
    );
  }
}

const calculateLastPage = (totalCount) => {
  // const PER_PAGE = 50
  const PER_PAGE = 2;
  if (!totalCount) {
    return "?";
  } else if (totalCount <= PER_PAGE) {
    return 0;
  } else {
    return Math.ceil(totalCount / PER_PAGE);
  }
};

/*const mapStateToProps = (state) => {
  return {
    //filter: state.filter,
    //nodes: state.nodes,
    //resources: state.resources,
    //environments: state.environments,
    //applications: state.applications,
    //instances: state.instances,
  };
};*/

ElementPaging.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  totalCount: PropTypes.string.isRequired,
  location: PropTypes.object,
  //context: PropTypes.string.isRequired,
};

export default ElementPaging;
