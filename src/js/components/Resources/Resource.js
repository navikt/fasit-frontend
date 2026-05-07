import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { parseQuery } from "../../utils/queryParser"
import { List, ListItem, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import { validAuthorization } from "../../utils"
import { fetchFasitData } from "../../actionCreators/resource"
import { displayModal, submitForm } from "../../actionCreators/common"
import { getResourceTypeName, resourceTypeIcon, resourceTypes } from "../../utils/resourceTypes"
import { ResourceInstances } from "./ResourceInstances"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"
import { styles } from "../../commonStyles/commonInlineStyles"
import NotFound from "../NotFound"
import WebsphereManagementConsole from "../common/WebsphereManagementConsole"
import {
  CurrentRevision,
  DeleteElementForm,
  History,
  Lifecycle,
  SecretToggle,
  Security,
  ToolButtons,
  Spinner
} from "../common/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const initialState = {
  secretVisible: false,
  displayDeleteForm: false,
  comment: ""
}

function vaultUrl(vaultPath) {
  const baseUrl = "https://vault.adeo.no/ui/vault/secrets/"
  const replaced = vaultPath.replace(/^([\w-]+)\/data\/(.*)\/[\w-]+$/, "$1/show/$2")
  return baseUrl + replaced
}

function Resource({ dispatch, id, fasit, user, query, revisions, resource, currentSecrets, resourceModalVisible }) {
  const [secretVisible, setSecretVisible] = useState(initialState.secretVisible)
  const [displayDeleteForm, setDisplayDeleteForm] = useState(initialState.displayDeleteForm)
  const [comment, setComment] = useState(initialState.comment)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (query) {
      dispatch(fetchFasitData(id, query.revision))
    } else {
      dispatch(fetchFasitData(id))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSecretVisible(initialState.secretVisible)
    setDisplayDeleteForm(initialState.displayDeleteForm)
    setComment(initialState.comment)
    dispatch(fetchFasitData(id))
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(fetchFasitData(id, query.revision))
  }, [query.revision]) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteResource = (key) => {
    setDisplayDeleteForm(prev => !prev)
    dispatch(submitForm(key, null, null, "deleteResource"))
  }

  const toggleComponentDisplay = (component) => {
    if (component === "displayDeleteForm") {
      setDisplayDeleteForm(prev => !prev)
    }
  }

  const toggleDisplaySecret = () => {
    setSecretVisible(prev => !prev)
  }

  const getResourceType = (typeKey) => {
    const key = Object.keys(resourceTypes).filter(
      resourceType => resourceType.toLowerCase() === typeKey.toLowerCase()
    )[0]
    return resourceTypes[key]
  }

  const renderProperty = (property, res) => {
    const propertyName = property.displayName
    const key = property.name
    const { properties, files } = res

    switch (property.type) {
      case "textbox":
      case "dropdown":
        return (
          <ListItem
            key={key}
            style={{ paddingTop: "0px", paddingBottom: "14px" }}
          >
            <ListItemText
              primary={properties[key]}
              secondary={propertyName}
            />
          </ListItem>
        )
      case "link":
        return (
          <ListItem
            key={key}
            style={{ paddingTop: "0px", paddingBottom: "14px" }}
          >
            <ListItemText
              primary={
                <Link to={properties[key]} target="new">
                  {property.linkTitle || properties[key]}
                </Link>
              }
              secondary={propertyName}
            />
          </ListItem>
        )
      case "textarea":
        return (
          <ListItem
            key={key}
            style={{ paddingTop: "0px", paddingBottom: "14px" }}
            className="text-overflow"
          >
            <ListItemText
              primary={
                <pre>
                  <code>{properties[key]}</code>
                </pre>
              }
              secondary={propertyName}
            />
          </ListItem>
        )
      case "vaultPath":
      case "secret":
        const secret = res.secrets[key]
        if (secret != null && secret.vaultpath != null) {
          return (
            <ListItem
              key={key}
              style={{ paddingTop: "0px", paddingBottom: "14px" }}
              className="text-overflow"
            >
              <ListItemText
                primary={
                  <span>
                    <a href={vaultUrl(secret.vaultpath)}>{secret.vaultpath}</a>
                  </span>
                }
                secondary={`${propertyName} (Vault Path)`}
              />
            </ListItem>
          )
        } else {
          const secretText = currentSecrets[key]
            ? currentSecrets[key].value
            : "No secret stored for this revision"

          return (
            <ListItem
              key={key}
              style={{ paddingTop: "0px", paddingBottom: "14px" }}
              className="text-overflow"
            >
              <ListItemText
                primary={
                  <div>
                    {secretVisible ? secretText : "*********"}
                    <SecretToggle
                      user={user}
                      accesscontrol={resource.accesscontrol}
                      secretVisible={secretVisible}
                      toggleHandler={() => toggleDisplaySecret()}
                      dispatch={dispatch}
                    />
                  </div>
                }
                secondary={propertyName}
              />
            </ListItem>
          )
        }
      case "file":
        return (
          <ListItem
            key={key}
            style={{ paddingTop: "0px", paddingBottom: "14px" }}
            className="text-overflow"
          >
            <ListItemText
              primary={
                <Link to={files[key].ref} target="new">
                  <FontAwesomeIcon className="file" fixedWidth />
                  {files[key].filename}
                </Link>
              }
              secondary={propertyName}
            />
          </ListItem>
        )
    }
  }

  const renderResourceProperties = () => {
    const type = getResourceType(resource.type)
    return <List>{type.properties.map((p, key) => renderProperty(p, resource))}</List>
  }

  const exposedByApplication = () => {
    const exposedBy = fasit.data.exposedby
    if (exposedBy) {
      const displayString = `${exposedBy.application} (${exposedBy.version}) in ${exposedBy.environment}`
      return (
        <ListItem
          key={exposedBy.id}
          style={{ paddingTop: "0px", paddingBottom: "14px" }}
          className="text-overflow"
        >
          <ListItemText
            primary={<Link to={`/instances/${exposedBy.id}`}>{displayString}</Link>}
            secondary="Exposed by"
          />
        </ListItem>
      )
    }
  }

  const scopeDisplayString = (scope) => {
    const envClass = scope.environmentclass || "-"
    const environment = scope.environment || "-"
    const zone = scope.zone || "-"
    const application = scope.application || "-"

    return `${envClass} | ${zone} | ${environment} | ${application}`
  }

  const showModal = (mode) => {
    dispatch(displayModal("resource", true, mode))
  }

  let authorized = false
  let lifecycle = {}

  if (fasit.requestFailed) {
    if (fasit.requestFailed.startsWith("404")) {
      return <NotFound />
    }
    return (
      <div>
        Retrieving resource {id} failed with the following message:
        <br />
        <pre>
          <i>{fasit.requestFailed}</i>
        </pre>
      </div>
    )
  }

  if (fasit.isFetching || Object.keys(resource).length === 0) {
    return <Spinner />
  }

  if (Object.keys(resource).length > 0) {
    authorized = validAuthorization(user, fasit.data.accesscontrol)
    lifecycle = fasit.data.lifecycle
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-8" style={styles.cardPadding}>
          {<CurrentRevision revisionId={query.revision} revisions={revisions} />}
          <Card>
            <CardHeader
              avatar={resourceTypeIcon(resource.type)}
              slotProps={{title: {style: styles.bold}}}
              title={`${getResourceTypeName(resource.type)} ${resource.alias}`}
              subheader={scopeDisplayString(resource.scope)}
            />
            <CardContent>
              {renderResourceProperties()}
              {exposedByApplication()}
              {resource.type.toLowerCase() === "deploymentmanager" && (
                <WebsphereManagementConsole hostname={resource.properties.hostname} />
              )}
            </CardContent>
            <CardActions>
              <ToolButtons
                disabled={!authorized || resourceModalVisible}
                onEditClick={() => showModal("edit")}
                onDeleteClick={() => toggleComponentDisplay("displayDeleteForm")}
                onCopyClick={() => showModal("copy")}
                editMode={editMode}
              />
            </CardActions>
          </Card>
          <Lifecycle lifecycle={lifecycle} />
        </div>

        <div className="col-md-4">
          <History id={id} currentRevision={query.revision} component="resource" />
          <Security accesscontrol={fasit.data.accesscontrol} />
        </div>
      </div>

      <div className="row col-md-8">
        <ResourceInstances instances={fasit.data.usedbyapplications} />
      </div>

      <DeleteElementForm
        displayDeleteForm={displayDeleteForm}
        id={id}
        onClose={() => toggleComponentDisplay("displayDeleteForm")}
        onSubmit={() => deleteResource(id)}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    fasit: state.resource_fasit,
    resource: state.resource_fasit.data,
    currentSecrets: state.resource_fasit.currentSecrets,
    revisions: state.revisions,
    user: state.user,
    config: state.configuration,
    query: parseQuery(state.router.location.search),
    resourceModalVisible: state.resources.showNewResourceForm
  }
}

export default connect(mapStateToProps)(Resource)
