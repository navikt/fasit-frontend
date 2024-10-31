import React, { Component, PropTypes } from "react"
import { Modal } from "react-bootstrap"
import { connect } from "react-redux"
import { FormComment, FormString } from "../common/Forms"
import { capitalize } from "../../utils"
import { displayModal, submitForm } from "../../actionCreators/common"
import { Card, CardHeader, CardText } from "material-ui/Card"
import { icons, styles } from "../../commonStyles/commonInlineStyles"

export class NewApplicationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      artifactid: "",
      groupid: "",
      portoffset: "0",
      comment: ""
    }
  }

  componentWillReceiveProps(next) {
    const { application } = this.props
    const { name, groupid, artifactid, portoffset } = application
    if (next.mode === "edit" || next.mode === "copy") {
      this.setState({
        name,
        groupid,
        artifactid,
        portoffset
      })
    } else {
      this.resetLocalState()
    }
  }

  resetLocalState() {
    this.setState({
      name: "",
      artifactid: "",
      groupid: "",
      portoffset: "0",
      comment: ""
    })
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  handleSubmitForm() {
    const { dispatch, mode } = this.props
    const { name, artifactid, groupid, portoffset, comment } = this.state
    const form = {
      name,
      artifactid,
      groupid,
      portoffset
    }

    if (mode === "edit") {
      dispatch(submitForm(this.props.application.name, form, comment, "application"))
    } else {
      dispatch(submitForm(form.name, form, comment, "newApplication"))
    }
  }

  closeForm() {
    const { dispatch } = this.props
    this.resetLocalState()
    dispatch(displayModal("application", false))
  }

  showSubmitButton() {
    const { name, artifactid, groupid, portoffset } = this.state

    if (
      name &&
      artifactid &&
      groupid &&
      portoffset !== undefined &&
      portoffset !== "" &&
      !isNaN(portoffset)
    ) {
      return (
        <button
          type="submit"
          className="btn btn-primary pull-right"
          onClick={this.handleSubmitForm.bind(this, true)}
        >
          Submit
        </button>
      )
    }
    return (
      <button type="submit" className="btn btn-primary pull-right disabled">
        Submit
      </button>
    )
  }

  showNewApplicationAlert() {
    return (
      <Card expandable={false} initiallyExpanded={true} style={styles.cardPadding}>
        <CardHeader
          title="Creation of new applications has been disabled"
          titleStyle={styles.bold}
          avatar={icons.warning}
        />

        <CardText expandable={false}>
          <p>
            New applications should be build for the{" "}
            <a href="https://nais.io" target="new">
              nais
            </a>{" "}
            plattform and deployed using naiserator which is not using fasit.
          </p>
          <p>
            Did you know that you can create{" "}
            <a href="https://basta-frontend.adeo.no/create/customcredential" target="new">
              custom serviceusers
            </a>{" "}
            in{" "}
            <a href="https://basta-frontend.adeo.no" target="new">
              Basta
            </a>{" "}
            without having to create an application in fasit first.
          </p>
          <p>If you really need to create a new application, please contact us on Slack #aura</p>
        </CardText>
      </Card>
    )
  }

  render() {
    const { showNewApplicationForm, mode, application } = this.props
    return (
      <Modal show={showNewApplicationForm} onHide={this.closeForm.bind(this)}>
        <Modal.Header>
          <Modal.Title>
            {icons.application} &emsp;
            {mode && `${capitalize(mode)} application ${mode !== "new" ? application.name : ""}`}
            <button
              id="resetBtn"
              type="reset"
              className="btn btn-link pull-right"
              onClick={this.closeForm.bind(this)}
            >
              <strong>X</strong>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.showNewApplicationAlert()}
          <FormString
            label="name"
            editMode={true}
            value={this.state.name}
            handleChange={this.handleChange.bind(this)}
          />
          <FormString
            label="groupid"
            editMode={true}
            value={this.state.groupid}
            handleChange={this.handleChange.bind(this)}
          />
          <FormString
            label="artifactid"
            editMode={true}
            value={this.state.artifactid}
            handleChange={this.handleChange.bind(this)}
          />
          <FormString
            label="portoffset"
            editMode={true}
            value={this.state.portoffset.toString()}
            handleChange={this.handleChange.bind(this)}
          />
          <div className="col-xs-12" style={{ height: 15 + "px" }} />
        </Modal.Body>
        <Modal.Footer>
          <FormComment value={this.state.comment} handleChange={this.handleChange.bind(this)} />
          <br />
          <div className="row">
            <div className="row col-lg-10 col-lg-offset-2">{this.showSubmitButton()}</div>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}
NewApplicationForm.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    showNewApplicationForm: state.applications.showNewApplicationForm,
    application: state.application_fasit.data,
    mode: state.applications.mode
  }
}

export default connect(mapStateToProps)(NewApplicationForm)
