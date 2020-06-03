import React, { Component } from "react";
import { connect } from "react-redux";
import { validAuthorization } from "../../utils/";
import { Card, CardItem } from "../common/Card";
import {
  fetchApplicationInstances,
  fetchFasitData,
} from "../../actionCreators/application";
import InstanceCard from "../Instances/InstanceCard";
import { displayModal, submitForm } from "../../actionCreators/common";
import { styles } from "../../commonStyles/commonInlineStyles";
import { getQueryParam } from "../../utils";
import {
  CurrentRevision,
  DeleteElementForm,
  ToolButtons,
  Spinner,
  RevisionsView,
} from "../common/";

export class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDeleteForm: false,
      editMode: false,
      comment: "",
    };
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props;
    const appName = match.params.application;
    const revision = getQueryParam(location.search, "revision");
    dispatch(fetchFasitData(appName, revision));
    dispatch(fetchApplicationInstances(appName));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, location, match } = this.props;
    const appName = match.params.application;
    const revision = getQueryParam(location.search, "revision");
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    );
    const nextPropsAppName = nextProps.match.params.application;
    this.setState({
      comment: "",
    });

    if (nextPropsRevision != revision) {
      dispatch(fetchFasitData(appName, nextPropsRevision));
    }
    if (nextPropsAppName != appName) {
      dispatch(fetchFasitData(nextPropsAppName, nextPropsRevision));
      dispatch(fetchApplicationInstances(nextPropsAppName));
    }
  }

  handleSubmitForm(key, form, comment, component) {
    const { dispatch } = this.props;
    if (component === "deleteApplication") {
      this.toggleComponentDisplay("displayDeleteForm");
      this.setState({ comment: "" });
    }
    dispatch(submitForm(key, form, comment, component));
  }

  toggleComponentDisplay(component) {
    this.setState({ [component]: !this.state[component] });
    if (component === "editMode" && this.state.editMode) this.resetLocalState();
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const {
      application,
      user,
      dispatch,
      isFetching,
      location,
      revisions,
      instances,
      resourceModalVisible,
    } = this.props;
    const { comment, editMode } = this.state;
    const revision = getQueryParam(location.search, "revision");
    let lifecycle = {};
    let authorized = false;

    if (Object.keys(application).length > 0) {
      authorized = validAuthorization(user, application.accesscontrol);
      lifecycle = application.lifecycle;
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
                disabled={!authorized || resourceModalVisible}
                onEditClick={() =>
                  dispatch(displayModal("application", true, "edit"))
                }
                onDeleteClick={() =>
                  this.toggleComponentDisplay("displayDeleteForm")
                }
                onCopyClick={() =>
                  dispatch(displayModal("application", true, "copy"))
                }
                editMode={editMode}
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

        {/*<DeleteElementForm
            displayDeleteForm={this.state.displayDeleteForm}
            onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
            onSubmit={() => this.handleSubmitForm(name, null, comment, "deleteApplication")}
            id={name}
          />*/}

        <div className="row">
          <div className="col-md-6" style={styles.cardPadding}>
            <h5 style={{ fontWeight: "bold" }}>Application instances</h5>
            {instances &&
              instances.map((item, index) => (
                <InstanceCard instance={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    );
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
  };
};

export default connect(mapStateToProps)(Application);
