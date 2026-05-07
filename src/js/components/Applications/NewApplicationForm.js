import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { Modal } from "../common/Modal"
import { connect } from "react-redux"
import { FormComment, FormString } from "../common/Forms"
import { capitalize } from "../../utils"
import { displayModal, submitForm } from "../../actionCreators/common"
import { Card, CardHeader, CardContent } from "@mui/material"
import { icons, styles } from "../../commonStyles/commonInlineStyles"

export function NewApplicationForm({ dispatch, showNewApplicationForm, application, mode }) {
  const [name, setName] = useState("")
  const [artifactid, setArtifactid] = useState("")
  const [groupid, setGroupid] = useState("")
  const [portoffset, setPortoffset] = useState("0")
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (mode === "edit" || mode === "copy") {
      setName(application.name)
      setGroupid(application.groupid)
      setArtifactid(application.artifactid)
      setPortoffset(application.portoffset)
    } else {
      resetLocalState()
    }
  }, [mode, application]) // eslint-disable-line react-hooks/exhaustive-deps

  const resetLocalState = () => {
    setName("")
    setArtifactid("")
    setGroupid("")
    setPortoffset("0")
    setComment("")
  }

  const handleChange = (field, value) => {
    switch (field) {
      case "name": setName(value); break
      case "artifactid": setArtifactid(value); break
      case "groupid": setGroupid(value); break
      case "portoffset": setPortoffset(value); break
      case "comment": setComment(value); break
    }
  }

  const handleSubmitForm = () => {
    const form = {
      name,
      artifactid,
      groupid,
      portoffset
    }

    if (mode === "edit") {
      dispatch(submitForm(application.name, form, comment, "application"))
    } else {
      dispatch(submitForm(form.name, form, comment, "newApplication"))
    }
  }

  const closeForm = () => {
    resetLocalState()
    dispatch(displayModal("application", false))
  }

  const showSubmitButton = () => {
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
          className="btn btn-primary float-end"
          onClick={handleSubmitForm}
        >
          Submit
        </button>
      )
    }
    return (
      <button type="submit" className="btn btn-primary float-end disabled">
        Submit
      </button>
    )
  }

  const showNewApplicationAlert = () => {
    return (
      <Card style={styles.cardPadding}>
        <CardHeader
          title="Creation of new applications has been disabled"
          slotProps={{title: {style: styles.bold}}}
          avatar={icons.warning}
        />

        <CardContent>
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
        </CardContent>
      </Card>
    )
  }

  return (
    <Modal show={showNewApplicationForm} enforceFocus={false} onHide={closeForm}>
      <Modal.Header>
        <Modal.Title>
          {icons.application} &emsp;
          {mode && `${capitalize(mode)} application ${mode !== "new" ? application.name : ""}`}
          <button
            id="resetBtn"
            type="reset"
            className="btn btn-link float-end"
            onClick={closeForm}
          >
            <strong>X</strong>
          </button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showNewApplicationAlert()}
        <FormString
          label="name"
          editMode={true}
          value={name}
          handleChange={handleChange}
        />
        <FormString
          label="groupid"
          editMode={true}
          value={groupid}
          handleChange={handleChange}
        />
        <FormString
          label="artifactid"
          editMode={true}
          value={artifactid}
          handleChange={handleChange}
        />
        <FormString
          label="portoffset"
          editMode={true}
          value={portoffset.toString()}
          handleChange={handleChange}
        />
        <div className="col-xs-12" style={{ height: 15 + "px" }} />
      </Modal.Body>
      <Modal.Footer>
        <FormComment value={comment} handleChange={handleChange} />
        <br />
        <div className="row">
          <div className="row col-lg-10 col-lg-offset-2">{showSubmitButton()}</div>
        </div>
      </Modal.Footer>
    </Modal>
  )
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
