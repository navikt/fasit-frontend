import React, { Component } from "react"
import { connect } from "react-redux"
import { Routes } from "../../routes"
import { withRouter } from "react-router-dom"
//import { browserHistory } from "react-router"
import {
  fetchEnvironments,
  fetchApplicationNames,
  fetchResourceTypes,
  fetchNodeTypes,
} from "../../actionCreators/fasit_initialize_data"
//import { displayModal, toggleHelp } from "../../actionCreators/common"
//import { displayLogin, logOut } from "../../actionCreators/authentication"
import TopNav from "../Navigation/TopNav"

/*import NewNodeForm from "../Nodes/NewNodeForm"
import NewApplicationForm from "../Applications/NewApplicationForm"
import NewEnvironmentForm from "../Environments/NewEnvironmentForm"
import NewClusterForm from "../Environments/NewClusterForm"
import NewResourceForm from "../Resources/NewResourceForm"*/

//import { SubmitFormStatus, ErrorDialog } from "../common/"
import "bootswatch/dist/cerulean/bootstrap.min.css"
import "../../../stylesheets/index.less"
import buildFontAwesomeLibrary from "../../commonStyles/FontAwesomeIcons"

buildFontAwesomeLibrary()

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
        {/*<div className="col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-12">
          {this.props.children}
    </div>*/}
        {/* Misc. modals*/}
        {/*<SubmitFormStatus />
        <NewNodeForm />
        <NewEnvironmentForm />
        <ErrorDialog />
        <NewClusterForm />
        <NewApplicationForm />
        <NewResourceForm />
        */}
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
