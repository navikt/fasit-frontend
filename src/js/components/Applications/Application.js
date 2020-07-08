import React, { Component } from "react"
import { connect } from "react-redux"
import { validAuthorization } from "../../utils/"
import { Card, CardItem } from "../common/Card"
import {
  fetchApplicationInstances,
  fetchFasitData,
} from "../../actionCreators/application"
import InstancesCard from "../Instances/InstancesCard"
import { deleteElement } from "../../actionCreators/common"
import { styles } from "../../commonStyles/commonInlineStyles"
import { getQueryParam } from "../../utils"
import {
  CurrentRevision,
  DeleteElementForm,
  ToolButtons,
  Spinner,
  RevisionsView,
} from "../common/"

export class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDeleteForm: false,
    }
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props
    const appName = match.params.application
    const revision = getQueryParam(location.search, "revision")
    dispatch(fetchFasitData(appName, revision))
    dispatch(fetchApplicationInstances(appName))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, location, match } = this.props
    const appName = match.params.application
    const revision = getQueryParam(location.search, "revision")
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    )
    const nextPropsAppName = nextProps.match.params.application
    this.setState({
      comment: "",
    })

    if (nextPropsRevision != revision) {
      dispatch(fetchFasitData(appName, nextPropsRevision))
    }
    if (nextPropsAppName != appName) {
      dispatch(fetchFasitData(nextPropsAppName, nextPropsRevision))
      dispatch(fetchApplicationInstances(nextPropsAppName))
    }
  }

  handleDelete(key) {
    const { dispatch } = this.props
    this.toggleComponentDisplay("displayDeleteForm")
    dispatch(deleteElement(key, "application"))
  }

  toggleComponentDisplay(component) {
    this.setState({ [component]: !this.state[component] })
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  render() {
    const {
      application,
      user,
      isFetching,
      location,
      revisions,
      instances,
    } = this.props
    const { editMode } = this.state
    const revision = getQueryParam(location.search, "revision")
    let lifecycle = {}
    let authorized = false

    if (Object.keys(application).length > 0) {
      authorized = validAuthorization(user, application.accesscontrol)
      lifecycle = application.lifecycle
    }
    return isFetching || !application.name ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">
          <CurrentRevision revisionId={revision} revisions={revisions} />
          <div className="col-md-6" style={styles.cardPadding}>
            <Card title={application.name}>
              <CardItem label="Group id" value={application.groupid} />
              <CardItem label="Artifact id" value={application.artifactid} />
              <CardItem
                label="Port offset"
                value={application.portoffset.toString()}
              />
              <ToolButtons
                onDeleteClick={() =>
                  this.toggleComponentDisplay("displayDeleteForm")
                }
              />
            </Card>
          </div>

          {/*Side menu*/}
          <RevisionsView
            id={application.name}
            currentRevision={revision}
            component="application"
            location={location}
          />
        </div>

        <DeleteElementForm
          displayDeleteForm={this.state.displayDeleteForm}
          onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => this.handleDelete(application.name)}
          id={application.name}
        />

        <div className="row">
          <div className="col-md-6" style={styles.cardPadding}>
            <InstancesCard instances={instances} />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    application: state.application_fasit.data,
    isFetching: state.application_fasit.isFetching,
    user: state.user,
    config: state.configuration,
    revisions: state.revisions,
    instances: state.application_instances.data,
    resourceModalVisible: state.resources.showNewResourceForm,
  }
}

export default connect(mapStateToProps)(Application)
