import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { FormComment, FormString } from "../common/Forms"
import { Card } from "../common/Card"
import { submitForm } from "../../actionCreators/common"
import Alert from "react-bootstrap/Alert"

export class NewApplicationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      artifactid: "",
      groupid: "",
      portoffset: "0",
      comment: "",
    }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  handleSubmitForm() {
    const { dispatch } = this.props
    const { name, artifactid, groupid, portoffset, comment } = this.state
    const form = {
      name,
      artifactid,
      groupid,
      portoffset,
    }

    dispatch(submitForm(form.name, form, comment, "newApplication"))
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
        <div style={{ overflow: "hidden", paddingBottom: "1rem" }}>
          <button
            type="submit"
            className="btn btn-primary pull-right"
            onClick={this.handleSubmitForm.bind(this, true)}
          >
            Submit
          </button>
        </div>
      )
    }
    return (
      <div style={{ overflow: "hidden", paddingBottom: "1rem" }}>
        <button type="submit" className="btn btn-primary pull-right disabled">
          Submit
        </button>
      </div>
    )
  }

  showNewApplicationAlert() {
    return (
      <div style={{ paddingTop: "1rem" }}>
        <Alert transition={false} variant="warning">
          <Alert.Heading>
            Creation of new applications is disabled
          </Alert.Heading>
          <p>
            New applications should be build for the{" "}
            <a href="https://nais.io" target="new">
              nais
            </a>{" "}
            plattform and deployed using naiserator which is not using fasit.
          </p>
          <p>
            Did you know that you can create{" "}
            <a
              href="https://basta-frontend.adeo.no/create/customcredential"
              target="new"
            >
              custom serviceusers
            </a>{" "}
            in{" "}
            <a href="https://basta-frontend.adeo.no" target="new">
              Basta
            </a>{" "}
            without having to create an application in fasit first.
          </p>
          <p>
            If you really need to create a new application, please contact us on
            Slack #aura
          </p>
        </Alert>
      </div>
    )
  }

  render() {
    return (
      <div className="col-md-6">
        {this.showNewApplicationAlert()}
        <Card title="New application">
          <FormString
            label="name"
            value={this.state.name}
            handleChange={this.handleChange.bind(this)}
          />
          <FormString
            label="groupid"
            value={this.state.groupid}
            handleChange={this.handleChange.bind(this)}
          />
          <FormString
            label="artifactid"
            value={this.state.artifactid}
            handleChange={this.handleChange.bind(this)}
          />
          <FormString
            label="portoffset"
            value={this.state.portoffset.toString()}
            handleChange={this.handleChange.bind(this)}
          />

          <FormComment
            value={this.state.comment}
            handleChange={this.handleChange.bind(this)}
          />
          <div className="formPadding">{this.showSubmitButton()}</div>
        </Card>
      </div>
    )
  }
}
NewApplicationForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    showNewApplicationForm: state.applications.showNewApplicationForm,
    application: state.application_fasit.data,
    mode: state.applications.mode,
  }
}

export default connect(mapStateToProps)(NewApplicationForm)
