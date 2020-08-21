import React, { Component } from "react"
import { connect } from "react-redux"
import { Routes } from "../../routes"
import { withRouter } from "react-router-dom"
import {
  fetchEnvironments,
  fetchApplicationNames,
  fetchResourceTypes,
  fetchNodeTypes,
} from "../../actionCreators/fasit_initialize_data"
import TopNav from "../Navigation/TopNav"
import { SubmitFormStatus, ErrorDialog } from "../common/"
import "bootswatch/dist/cerulean/bootstrap.min.css"
import "../../../stylesheets/index.less"

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // pre-load fasit data
    const { dispatch } = this.props
    dispatch(fetchEnvironments())
    dispatch(fetchApplicationNames())
    dispatch(fetchResourceTypes())
    dispatch(fetchNodeTypes())
  }

  render() {
    return (
      <div style={{ outline: "none" }}>
        <TopNav location={this.props.location} />
        <SubmitFormStatus />
        <ErrorDialog />
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapStateToProps)(App))
