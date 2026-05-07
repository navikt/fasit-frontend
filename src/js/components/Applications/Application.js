import React, { useState, useEffect, useRef } from "react"
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
import NotFound from "../NotFound"

export function Application({ name, application, user, dispatch, query, revisions, instances, resourceModalVisible, requestFailed }) {
  const [displayDeleteForm, setDisplayDeleteForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [comment, setComment] = useState("")

  const prevNameRef = useRef(name)
  const prevRevisionRef = useRef(query.revision)

  useEffect(() => {
    dispatch(fetchFasitData(name, query.revision))
    dispatch(fetchApplicationInstances(name))
  }, [])

  useEffect(() => {
    const prevName = prevNameRef.current
    const prevRevision = prevRevisionRef.current

    if (name !== prevName || query.revision !== prevRevision) {
      setComment("")

      if (query.revision != prevRevision) {
        dispatch(fetchFasitData(name, query.revision))
      }
      if (name != prevName) {
        dispatch(fetchFasitData(name, query.revision))
        dispatch(fetchApplicationInstances(name))
      }
    }
    prevNameRef.current = name
    prevRevisionRef.current = query.revision
  })

  const handleSubmitForm = (key, form, cmnt, component) => {
    if (component === "deleteApplication") {
      setDisplayDeleteForm(false)
      setComment("")
    }
    dispatch(submitForm(key, form, cmnt, component))
  }

  const toggleComponentDisplay = (component) => {
    if (component === "displayDeleteForm") {
      setDisplayDeleteForm(!displayDeleteForm)
    } else if (component === "editMode") {
      if (editMode) {
        setEditMode(false)
        setComment("")
      } else {
        setEditMode(true)
      }
    }
  }

  const applicationInfo = (app) => {
    return (
      <List>
        <ListItem>
          <ListItemText
            primary={`${app.groupid}:${app.artifactid}`}
            secondary="Group id:artifact id"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={app.portoffset.toString()}
            secondary="Port offset"
          />
        </ListItem>
      </List>
    )
  }

  let lifecycle = {}
  let authorized = false

  if (requestFailed) {
    if (requestFailed.startsWith("404")) {
      return <NotFound />
    }
    return (
      <div>
        Retrieving application {name} failed with the following message:
        <br />
        <pre><i>{requestFailed}</i></pre>
      </div>
    )
  }

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
                subheader={applicationInfo(application)}
              />
              <CardActions>
                <ToolButtons
                  disabled={!authorized || resourceModalVisible}
                  onEditClick={() => dispatch(displayModal("application", true, "edit"))}
                  onDeleteClick={() => toggleComponentDisplay("displayDeleteForm")}
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
          displayDeleteForm={displayDeleteForm}
          onClose={() => toggleComponentDisplay("displayDeleteForm")}
          onSubmit={() => handleSubmitForm(name, null, comment, "deleteApplication")}
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
const mapStateToProps = state => {
  return {
    application: state.application_fasit.data,
    requestFailed: state.application_fasit.requestFailed,
    user: state.user,
    config: state.configuration,
    revisions: state.revisions,
    query: parseQuery(state.router.location.search),
    instances: state.application_instances.data,
    resourceModalVisible: state.resources.showNewResourceForm
  }
}

export default connect(mapStateToProps)(Application)
