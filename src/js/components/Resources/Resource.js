import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchFasitData } from "../../actionCreators/resource"
import { displayModal, deleteElement } from "../../actionCreators/common"
import { validAuthorization } from "../../utils/"
import { getResourceTypeName, resourceTypes } from "../../utils/resourceTypes"
import { Card, CardItem } from "../common/Card"
import { styles } from "../../commonStyles/commonInlineStyles"
import NotFound from "../NotFound"
import {
  CurrentRevision,
  RevisionsView,
  DeleteElementForm,
  ToolButtons,
  Spinner,
} from "../common/"

import { getQueryParam } from "../../utils/"
const initialState = {
  displayDeleteForm: false,
}

function vaultUrl(vaultPath) {
  const baseUrl = "https://vault.adeo.no/ui/vault/secrets/"
  const replaced = vaultPath.replace(
    /^([\w-]+)\/data\/(.*)\/[\w-]+$/,
    "$1/show/$2"
  )
  return baseUrl + replaced
}

class Resource extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props
    const revision = getQueryParam(location.search, "revision")
    dispatch(fetchFasitData(match.params.resource, revision))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, location, match } = this.props
    const resourceId = match.params.resource
    const revision = getQueryParam(location.search, "revision")
    const nextPropsResourceId = nextProps.match.params.resource
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    )

    if (nextPropsResourceId != resourceId) {
      dispatch(fetchFasitData(nextPropsResourceId))
    }

    if (nextPropsRevision != revision) {
      dispatch(fetchFasitData(resourceId, nextPropsRevision))
    }
  }

  buildFormData() {
    const { resource } = this.props
    const form = {
      alias: resource.alias,
      type: resource.type,
      properties: resource.properties,
      scope: resource.scope,
    }

    if (Object.keys(this.props.currentSecrets).length > 0) {
      form.secrets = {}
      Object.keys(this.props.currentSecrets).forEach((k) => {
        form.secrets[k] = { value: this.props.currentSecrets[k] }
      })
    }

    if (Object.keys(resource.files).length > 0) {
      form.files = files
    }

    return form
  }

  deleteResource(key) {
    const { dispatch } = this.props
    this.toggleComponentDisplay("displayDeleteForm")
    dispatch(deleteElement(key, "resource"))
  }

  toggleComponentDisplay(component) {
    this.setState({ [component]: !this.state[component] })
  }

  handleChange(field, value, parent) {
    if (parent) {
      const parentState = this.state[parent]
      parentState[field] = value
      this.setState({ parent: parentState })
    } else {
      this.setState({ [field]: value })
    }
  }

  renderResourceProperties() {
    const { resource } = this.props
    const type = this.getResourceType(resource.type)
    return (
      <React.Fragment>
        {type.properties.map((p) => this.renderProperty(p, resource))}
      </React.Fragment>
    )
  }

  renderProperty(property, resource) {
    const propertyName = property.displayName
    const key = property.name
    const { properties, files } = resource

    switch (property.type) {
      case "textbox":
      case "dropdown":
        return (
          <CardItem key={key} label={propertyName} value={properties[key]} />
        )
      case "link":
        return (
          <CardItem
            key={key}
            label={propertyName}
            value={property.linkTitle || properties[key]}
            linkTo={properties[key]}
          />
        )
      case "textarea":
        return (
          <CardItem
            key={key}
            className="text-overflow"
            label={propertyName}
            value={properties[key]}
          />
        )
      case "vaultPath":
      case "secret":
        const secret = resource.secrets[key]
        if (secret != null && secret.vaultpath != null) {
          return (
            <CardItem
              key={key}
              value={secret.vaultpath}
              linkTo={vaultUrl(secret.vaultpath)}
              label={`${propertyName} (Vault Path)`}
            />
          )
        } else {
          return (
            <CardItem
              key={key}
              label={propertyName}
              value="Secrets are no longer visible in Fasit UI. All secrets should be moved to Vault and resource updated to point to Vault path."
            />
          )
        }
      case "file":
        return (
          <CardItem
            key={key}
            label={propertyName}
            value={files[key].filename}
            linkTo={files[key].ref}
          />
        )
    }
  }

  exposedByApplication() {
    const exposedBy = this.props.fasit.data.exposedby
    if (exposedBy) {
      const displayString = `${exposedBy.application} (${exposedBy.version}) in ${exposedBy.environment}`
      return (
        <CardItem
          key={exposedBy.id}
          label="Exposed by"
          value={displayString}
          linkTo={`/instances/${exposedBy.id}`}
        />
      )
    }
  }

  scopeDisplayString(scope) {
    const envClass = scope.environmentclass || "-"
    const environment = scope.environment || "-"
    const zone = scope.zone || "-"
    const application = scope.application || "-"

    return `${envClass} | ${zone} | ${environment} | ${application}`
  }

  render() {
    const { fasit, match, location, revisions, resource, user } = this.props
    const resourceId = match.params.resource
    const revision = getQueryParam(location.search, "revision")

    if (fasit.requestFailed) {
      if (fasit.requestFailed.startsWith("404")) {
        return <NotFound />
      }
      return (
        <div>
          Retrieving resource {resourceId} failed with the following message:
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

    let authorized = false
    authorized = validAuthorization(user, fasit.data.accesscontrol)

    return (
      <div>
        <div className="row">
          <CurrentRevision revisionId={revision} revisions={revisions} />
          <div className="col-md-8" style={styles.cardPadding}>
            <Card
              title={`${getResourceTypeName(resource.type)} ${resource.alias}`}
              subtitle={this.scopeDisplayString(resource.scope)}
            >
              {this.renderResourceProperties()}
              {this.exposedByApplication()}
              {resource.type.toLowerCase() === "deploymentmanager" && (
                <CardItem
                  label="WebSphere admin console"
                  value={resource.properties.hostname}
                  linkTo={`https://${resource.properties.hostname}:9043/ibm/console`}
                />
              )}
              <ToolButtons
                disabled={!authorized}
                onDeleteClick={() =>
                  this.toggleComponentDisplay("displayDeleteForm")
                }
              />
            </Card>
          </div>

          <RevisionsView
            id={resourceId}
            currentRevision={revision}
            component="resource"
            location={location}
          />
        </div>

        <div className="row">
          <div className="col-md-8" style={styles.cardPadding}>
            <Card title="Used by">
              {!fasit.data.usedbyapplications ||
              fasit.data.usedbyapplications.length == 0 ? (
                <CardItem value="No application instances are using this resource. " />
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Environment</th>
                      <th>Instance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fasit.data.usedbyapplications
                      .sort((a, b) =>
                        a.environment.localeCompare(b.environment)
                      )
                      .map((instance, idx) => {
                        return (
                          <tr key={idx}>
                            <td>
                              <Link
                                to={`/environments/${instance.environment}`}
                              >
                                {instance.environment}
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/resources/${instance.id}`}
                              >{`${instance.application}:${instance.version}`}</Link>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
        </div>

        {
          <DeleteElementForm
            displayDeleteForm={this.state.displayDeleteForm}
            id={resourceId}
            onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
            onSubmit={() => this.deleteResource(resourceId)}
          />
        }
      </div>
    )
  }

  getResourceType(typeKey) {
    const key = Object.keys(resourceTypes).filter(
      (resourceType) => resourceType.toLowerCase() === typeKey.toLowerCase()
    )[0]
    return resourceTypes[key]
  }
}

const mapStateToProps = (state) => {
  return {
    fasit: state.resource_fasit,
    resource: state.resource_fasit.data,
    currentSecrets: state.resource_fasit.currentSecrets,
    revisions: state.revisions,
    config: state.configuration,
    revisions: state.revisions,
    user: state.user,
  }
}

export default connect(mapStateToProps)(Resource)
