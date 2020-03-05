import React, { Component } from "react"
import Select from "react-select"
import { connect } from "react-redux"
import {
  changeFilter,
  clearFilters,
  setFilter,
  submitFilterString
} from "../../actionCreators/element_lists"
import { isEmptyObject } from "../../utils"

const LIFECYCLE_STATUSES = ["stopped", "alerted"]

class Filters extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, location } = this.props

    if (!isEmptyObject(location.query)) {
      dispatch(setFilter(location.query))
    }
  }

  handleChangeFilter(filterName, filterValue) {
    const { dispatch, filter } = this.props
    dispatch(changeFilter(filterName, filterValue))
    dispatch(submitFilterString(filter.context, 0))
  }

  convertToSelectObject(values) {
    return values.map(value => {
      return { value, label: value }
    })
  }

  environmentFilter() {
    // if environmentclass is set, display only environments in that environmentclass
    const { filter } = this.props
    const filteredEnvironments = this.props.environments.filter(env => {
      if (!filter.filters.environmentclass) {
        return true
      } else {
        return env.environmentclass === filter.filters.environmentclass
      }
    })

    return (
      <div className="form-group Select-environment">
        <Select
          resetValue=""
          placeholder="Env."
          name="form-field-name"
          value={filter.filters.environment}
          options={this.convertToSelectObject(filteredEnvironments.map(env => env.name))}
          onChange={e => this.handleChangeFilter("environment", e.value)}
        />
      </div>
    )
  }

  applicationFilter() {
    return (
      <div className="form-group Select-application">
        <Select
          resetValue=""
          placeholder="App."
          name="form-field-name"
          value={this.props.filter.filters.application}
          options={this.convertToSelectObject(this.props.applicationNames)}
          onChange={e => this.handleChangeFilter("application", e.value)}
        />
      </div>
    )
  }

  zoneFilter() {
    const { filter } = this.props
    return (
      <div className="form-group Select-environmentclass">
        <Select
          resetValue=""
          placeholder="Zone"
          name="form-field-zone"
          disabled={filter.filters.environmentclass === "" && filter.filters.environment === ""}
          value={filter.filters.zone}
          options={this.convertToSelectObject(this.props.zones)}
          onChange={e => this.handleChangeFilter("zone", e.value)}
        />
      </div>
    )
  }

  classFilter() {
    return (
      <div className="form-group Select-environmentclass">
        <Select
          resetValue=""
          placeholder="Class"
          name="form-field-name"
          value={this.props.filter.filters.environmentclass}
          options={this.convertToSelectObject(this.props.environmentClasses)}
          onChange={e => this.handleChangeFilter("environmentclass", e.value)}
        />
      </div>
    )
  }

  nodeTypeFilter() {
    return (
      <div className="form-group Select-nodetype">
        <Select
          resetValue=""
          placeholder="Type"
          name="form-field-name"
          value={this.props.filter.filters.type}
          options={this.convertToSelectObject(this.props.nodeTypes)}
          onChange={e => this.handleChangeFilter("type", e.value)}
        />
      </div>
    )
  }

  resourceTypeFilter() {
    return (
      <div className="form-group Select-resourcetype">
        <Select
          resetValue=""
          placeholder="Type"
          name="form-field-name"
          value={this.props.filter.filters.type}
          options={this.convertToSelectObject(this.props.resourceTypes)}
          onChange={e => this.handleChangeFilter("type", e.value)}
        />
      </div>
    )
  }

  lifecycleFilter() {
    return (
      <div className="form-group Select-resourcetype">
        <Select
          resetValue=""
          placeholder="Lifecycle status"
          name="form-field-name"
          value={this.props.filter.filters.status}
          options={this.convertToSelectObject(LIFECYCLE_STATUSES)}
          onChange={e => this.handleChangeFilter("status", e.value)}
        />
      </div>
    )
  }

  aliasFilter() {
    return (
      <div className="form-group Input-alias">
        <input
          placeholder="Alias"
          className="form-control"
          style={{ height: "34px" }}
          type="text"
          value={this.props.filter.filters.alias}
          onChange={e => this.handleChangeFilter("alias", e.target.value)}
        />
      </div>
    )
  }

  generateFiltersFromContext() {
    const { filter } = this.props

    switch (filter.context) {
      case "applications":
        return <div className="form-inline filters">{this.lifecycleFilter()}</div>
      case "instances":
        return (
          <div className="form-inline filters">
            {this.classFilter()}
            {this.environmentFilter()}
            {this.applicationFilter()}
            {this.lifecycleFilter()}
          </div>
        )
      case "nodes":
        return (
          <div className="form-inline filters">
            {this.classFilter()}
            {this.environmentFilter()}
            {this.nodeTypeFilter()}
            {this.lifecycleFilter()}
          </div>
        )
      case "environments":
        return (
          <div className="form-inline filters">
            {this.classFilter()}
            {this.lifecycleFilter()}
          </div>
        )
      case "resources":
        return (
          <form className="form-inline filters">
            {this.aliasFilter()}
            {this.classFilter()}
            {this.environmentFilter()}
            {this.applicationFilter()}
            {this.zoneFilter()}
            {this.resourceTypeFilter()}
            {this.lifecycleFilter()}
          </form>
        )
    }
  }

  render() {
    return <div>{this.generateFiltersFromContext()}</div>
  }
}
const mapStateToProps = state => {
  return {
    filter: state.filter,
    environments: state.environments.environments,
    applicationNames: state.applications.applicationNames,
    environmentClasses: state.environments.environmentClasses,
    nodeTypes: state.nodes.nodeTypes,
    zones: state.environments.zones,
    resourceTypes: state.resources.resourceTypes.sort(),
    location: state.routing.locationBeforeTransitions
  }
}

export default connect(mapStateToProps)(Filters)
