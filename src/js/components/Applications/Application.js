import React, { Component } from "react"
import { connect } from "react-redux"
import { parseQuery } from "../../utils/queryParser"
import { validAuthorization } from "../../utils/"
import { Card, CardActions, CardHeader, List, ListItem, ListItemText } from "@mui/material"
import { fetchApplicationInstances, fetchFasitData } from "../../actionCreators/application"
import InstanceCard from "../Instances/InstanceCard"
import { displayModal, submitForm } from "../../actionCreators/common"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import {
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  Security,
  ToolButtons
} from "../common/"

export class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDeleteForm: false,
      editMode: false,
      comment: ""
    }
  }

  componentDidMount() {
    const { dispatch, name, query } = this.props
    dispatch(fetchFasitData(name, query.revision))
    dispatch(fetchApplicationInstances(name))
  }

  componentDidUpdate(prevProps) {
    const { dispatch, name, query } = this.props

    if (name !== prevProps.name || query.revision !== prevProps.query.revision) {
      this.setState({
        comment: ""
      })

      if (query.revision != prevProps.query.revision) {
        dispatch(fetchFasitData(name, query.revision))
      }
      if (name != prevProps.name) {
        dispatch(fetchFasitData(name, query.revision))
        dispatch(fetchApplicationInstances(name))
      }
    }
  }

  handleSubmitForm(key, form, comment, component) {
    const { dispatch } = this.props
    if (component === "deleteApplication") {
      this.toggleComponentDisplay("displayDeleteForm")
      this.setState({ comment: "" })
    }
    dispatch(submitForm(key, form, comment, component))
  }

  toggleComponentDisplay(component) {
    this.setState({ [component]: !this.state[component] })
    if (component === "editMode" && this.state.editMode) this.resetLocalState()
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  applicationInfo(application) {
    return (
      <List>
        <ListItem>
          <ListItemText
            primary={`${application.groupid}:${application.artifactid}`}
            secondary="Group id:artifact id"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={application.portoffset.toString()}
            secondary="Port offset"
          />
        </ListItem>
      </List>
    )
  }

  render() {
    // console.log(this.props)
    const {
      name,
      application,
      user,
      dispatch,
      query,
      revisions,
      instances,
      resourceModalVisible
    } = this.props
    const { comment, adgroups, editMode } = this.state
    let lifecycle = {}
    let authorized = false

    if (Object.keys(application).length > 0) {
      authorized = validAuthorization(user, application.accesscontrol)
      lifecycle = application.lifecycle
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-6" style={styles.cardPadding}>
            {<CurrentRevision revisionId={query.revision} revisions={revisions} />}
            {Object.keys(application).length > 0 && (
              <Card>
                <CardHeader
                  avatar={icons.application}
                  title={`${name}`}
                  slotProps={{title: {style: styles.bold}}}
                  style={styles.paddingBottom0}
                  subheader={this.applicationInfo(application)}
                />
                <CardActions>
                  <ToolButtons
                    disabled={!authorized || resourceModalVisible}
                    onEditClick={() => dispatch(displayModal("application", true, "edit"))}
                    onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onCopyClick={() => dispatch(displayModal("application", true, "copy"))}
                    editMode={editMode}
                  />
                </CardActions>
              </Card>
            )}

            <Lifecycle lifecycle={lifecycle} authorized={authorized} />
          </div>

          {/*Side menu*/}
          <div className="col-md-4">
            <History id={name} currentRevision={query.revision} component="application" />
            <Security accesscontrol={application.accesscontrol} />
          </div>

          <DeleteElementForm
            displayDeleteForm={this.state.displayDeleteForm}
            onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
            onSubmit={() => this.handleSubmitForm(name, null, comment, "deleteApplication")}
            id={name}
          />
        </div>
        <div className="row col-md-12">
          <h3>Application instances</h3>
          {instances &&
            instances.map((item, index) => <InstanceCard instance={item} key={index} />)}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    application: state.application_fasit.data,
    user: state.user,
    config: state.configuration,
    revisions: state.revisions,
    query: parseQuery(state.router.location.search),
    instances: state.application_instances.data,
    resourceModalVisible: state.resources.showNewResourceForm
  }
}

export default connect(mapStateToProps)(Application)
