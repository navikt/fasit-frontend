import React, { Component } from "react"
import { connect } from "react-redux"
import Filters from "../Navigation/Filters"
import Application from "./Application"
import ApplicationCard from "./ApplicationCard"
import { submitFilterString } from "../../actionCreators/element_lists"
import Spinner from "../common/Spinner"

export class Applications extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, params } = this.props
    if (!params.application) {
      dispatch(submitFilterString("applications", 0))
    }
  }

  render() {
    const { applications, totalCount, isFetching } = this.props
    if (isFetching) {
      return <Spinner />
    }
    if (this.props.params.application) {
      return <Application name={this.props.params.application} />
    } else {
      return (
        <div className="main-content-container">
          <div className="row col-sm-10">
            <div className="col-sm-6 col-xs-12">
              <Filters />
            </div>
          </div>
          <div className="col-sm-10">
            <div className="row">
              <h4>{totalCount} applications</h4>
              {applications.map((item, index) => {
                return <ApplicationCard application={item} key={index} />
              })}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    applications: state.applications.data,
    totalCount: state.applications.headers.total_count,
    isFetching: state.applications.isFetching
  }
}

export default connect(mapStateToProps)(Applications)
