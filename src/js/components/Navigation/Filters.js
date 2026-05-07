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
    const query = Object.fromEntries(new URLSearchParams(location.search))
    if (!isEmptyObject(query)) {
      dispatch(setFilter(query))
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

    const options = this.convertToSelectObject(filteredEnvironments.map(env => env.name))
    return (
      <div className="form-group Select-environment">
        <Select
          isClearable
          placeholder="Env."
          value={options.find(o => o.value === filter.filters.environment) || null}
          options={options}
          onChange={e => this.handleChangeFilter("environment", e ? e.value : "")}
        />
      </div>
    )
  }

  applicationFilter() {
    const options = this.convertToSelectObject(this.props.applicationNames)
    return (
      <div className="form-group Select-application">
        <Select
          isClearable
          placeholder="App."
          value={options.find(o => o.value === this.props.filter.filters.application) || null}
          options={options}
          onChange={e => this.handleChangeFilter("application", e ? e.value : "")}
        />
      </div>
    )
  }

  zoneFilter() {
    const { filter } = this.props
    const options = this.convertToSelectObject(this.props.zones)
    return (
      <div className="form-group Select-environmentclass">
        <Select
          isClearable
          placeholder="Zone"
          isDisabled={filter.filters.environmentclass === "" && filter.filters.environment === ""}
          value={options.find(o => o.value === filter.filters.zone) || null}
          options={options}
          onChange={e => this.handleChangeFilter("zone", e ? e.value : "")}
        />
      </div>
    )
  }

  classFilter() {
    const options = this.convertToSelectObject(this.props.environmentClasses)
    return (
      <div className="form-group Select-environmentclass">
        <Select
          isClearable
          placeholder="Class"
          value={options.find(o => o.value === this.props.filter.filters.environmentclass) || null}
          options={options}
          onChange={e => this.handleChangeFilter("environmentclass", e ? e.value : "")}
        />
      </div>
    )
  }

  nodeTypeFilter() {
    const options = this.convertToSelectObject(this.props.nodeTypes)
    return (
      <div className="form-group Select-nodetype">
        <Select
          isClearable
          placeholder="Type"
          value={options.find(o => o.value === this.props.filter.filters.type) || null}
          options={options}
          onChange={e => this.handleChangeFilter("type", e ? e.value : "")}
        />
      </div>
    )
  }

  resourceTypeFilter() {
    const options = this.convertToSelectObject(this.props.resourceTypes)
    return (
      <div className="form-group Select-resourcetype">
        <Select
          isClearable
          placeholder="Type"
          value={options.find(o => o.value === this.props.filter.filters.type) || null}
          options={options}
          onChange={e => this.handleChangeFilter("type", e ? e.value : "")}
        />
      </div>
    )
  }

  lifecycleFilter() {
    const options = this.convertToSelectObject(LIFECYCLE_STATUSES)
    return (
      <div className="form-group Select-resourcetype">
        <Select
          isClearable
          placeholder="Lifecycle status"
          value={options.find(o => o.value === this.props.filter.filters.status) || null}
          options={options}
          onChange={e => this.handleChangeFilter("status", e ? e.value : "")}
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
    location: state.router.location
  }
}

export default connect(mapStateToProps)(Filters)
