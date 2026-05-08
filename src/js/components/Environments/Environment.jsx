import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import history from "../../history"
import { parseQuery } from "../../utils/queryParser"
import {
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  Security,
  ToolButtons
} from "../common/index"
import { displayModal, submitForm } from "../../actionCreators/common"
import { validAuthorization } from "../../utils/index"
import EnvironmentClusters from "./EnvironmentClusters"
import EnvironmentNodes from "./EnvironmentNodes"
import EnvironmentInstances from "./EnvironmentInstances"
import { fetchEnvironment } from "../../actionCreators/environment"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { Card, CardActions, CardHeader } from "@mui/material"
import NotFound from "../NotFound"

export function Environment({ name, environment, user, query, revisions, dispatch, resourceModalVisible, requestFailed }) {
  const [displayClusters, setDisplayClusters] = useState(true)
  const [displayNodes, setDisplayNodes] = useState(false)
  const [displayInstances, setDisplayInstances] = useState(false)
  const [displayDeleteForm, setDisplayDeleteForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [comment, setComment] = useState("")
  const [adgroups, setAdgroups] = useState([])

  useEffect(() => {
    setComment("")
    if (Object.keys(environment).length > 0) {
      setAdgroups(environment.accesscontrol.adgroups)
    }
  }, [name, query.revision, environment]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(fetchEnvironment(name, query.revision))
  }, [name, query.revision]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitForm = (id, form, cmt, component) => {
    if (component === "deleteEnvironment") {
      setDisplayDeleteForm(false)
      setComment("")
    }
    dispatch(submitForm(id, form, cmt, component))
    if (component === "deleteEnvironment") {
      history.push("/environments")
    }
  }

  const selectTab = (tab) => {
    switch (tab) {
      case "clusters":
        setDisplayClusters(true)
        setDisplayNodes(false)
        setDisplayInstances(false)
        return
      case "nodes":
        setDisplayClusters(false)
        setDisplayNodes(true)
        setDisplayInstances(false)
        return
      case "instances":
        setDisplayClusters(false)
        setDisplayNodes(false)
        setDisplayInstances(true)
        return
    }
  }

  const envName = environment.name
  const envClass = environment.environmentclass
  let lifecycle = {}

  let authorized = false

  if (requestFailed) {
    if (requestFailed.startsWith("404")) {
      return <NotFound />
    }
    return (
      <div>
        Retrieving environment {name} failed with the following message:
        <br />
        <pre><i>{requestFailed}</i></pre>
      </div>
    )
  }

  if (Object.keys(environment).length > 0) {
    authorized = validAuthorization(user, environment.accesscontrol)
    lifecycle = environment.lifecycle
  }

  return (
    <div className="row">
      <div className="col-md-6" style={styles.cardPadding}>
        <CurrentRevision revisionId={query.revision} revisions={revisions} />
        <Card>
          <CardHeader avatar={icons.environment} title="Environment" slotProps={{title: {style: styles.bold}}} />
          <CardHeader title={`${envName}`} subheader={`Environment class: ${envClass} `} />
          <CardActions>
            <ToolButtons
              disabled={!authorized || resourceModalVisible}
              onEditClick={() => dispatch(displayModal("environment", true, "edit"))}
              onDeleteClick={() => setDisplayDeleteForm(!displayDeleteForm)}
              onCopyClick={() => dispatch(displayModal("environment", true, "copy"))}
              editMode={editMode}
            />
          </CardActions>
        </Card>

        <Lifecycle lifecycle={lifecycle} authorized={authorized} />
      </div>

      <div className="col-md-4">
        <History id={name} currentRevision={query.revision} component="environment" />
        <Security accesscontrol={environment.accesscontrol} />
      </div>

      {/*Content view*/}
      <div className="col-12">
        <ul className="nav nav-tabs">
          <li className={displayClusters ? "active" : ""}>
            <Link
              to={`/environments/${envName}/clusters`}
              onClick={() => selectTab("clusters")}
            >
              Clusters
            </Link>
          </li>
          <li className={displayNodes ? "active" : ""}>
            <Link to={`/environments/${envName}/nodes`} onClick={() => selectTab("nodes")}>
              Nodes
            </Link>
          </li>
          <li className={displayInstances ? "active" : ""}>
            <Link
              to={`/environments/${envName}/instances`}
              onClick={() => selectTab("instances")}
            >
              Instances
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-12">
        <div className="col-12" style={{ height: 20 + "px" }}></div>
        {displayClusters ? <EnvironmentClusters environment={envName} /> : null}
        {displayNodes ? <EnvironmentNodes environment={envName} /> : ""}
        {displayInstances ? <EnvironmentInstances environment={envName} /> : ""}
      </div>
      <DeleteElementForm
        displayDeleteForm={displayDeleteForm}
        onClose={() => setDisplayDeleteForm(!displayDeleteForm)}
        onSubmit={() => handleSubmitForm(envName, null, comment, "deleteEnvironment")}
        id={envName}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    environment: state.environment_fasit.data,
    requestFailed: state.environment_fasit.requestFailed,
    environmentClasses: state.environments.environmentClasses,
    revisions: state.revisions,
    query: parseQuery(state.router.location.search),
    resourceModalVisible: state.resources.showNewResourceForm
  }
}

export default connect(mapStateToProps)(Environment)
