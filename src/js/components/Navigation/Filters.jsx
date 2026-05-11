import React, { useEffect } from "react"
import Select from "react-select"
import { connect } from "react-redux"
import {
  changeFilter,
  clearFilters,
  setFilter,
  submitFilterString
} from "../../actionCreators/element_lists"
import { isEmptyObject } from "../../utils/stringUtils"

const LIFECYCLE_STATUSES = ["stopped", "alerted"]

function Filters({ dispatch, filter, environments, applicationNames, environmentClasses, nodeTypes, zones, resourceTypes, location }) {

  useEffect(() => {
    const query = Object.fromEntries(new URLSearchParams(location.search))
    if (!isEmptyObject(query)) {
      dispatch(setFilter(query))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeFilter = (filterName, filterValue) => {
    dispatch(changeFilter(filterName, filterValue))
    dispatch(submitFilterString(filter.context, 0))
  }

  const convertToSelectObject = (values) => {
    return values.map(value => {
      return { value, label: value }
    })
  }

  const environmentFilter = () => {
    const filteredEnvironments = environments.filter(env => {
      if (!filter.filters.environmentclass) {
        return true
      } else {
        return env.environmentclass === filter.filters.environmentclass
      }
    })

    const options = convertToSelectObject(filteredEnvironments.map(env => env.name))
    return (
      <div className="form-group Select-environment">
        <Select
          isClearable
          placeholder="Env."
          value={options.find(o => o.value === filter.filters.environment) || null}
          options={options}
          onChange={e => handleChangeFilter("environment", e ? e.value : "")}
        />
      </div>
    )
  }

  const applicationFilter = () => {
    const options = convertToSelectObject(applicationNames)
    return (
      <div className="form-group Select-application">
        <Select
          isClearable
          placeholder="App."
          value={options.find(o => o.value === filter.filters.application) || null}
          options={options}
          onChange={e => handleChangeFilter("application", e ? e.value : "")}
        />
      </div>
    )
  }

  const zoneFilter = () => {
    const options = convertToSelectObject(zones)
    return (
      <div className="form-group Select-environmentclass">
        <Select
          isClearable
          placeholder="Zone"
          isDisabled={filter.filters.environmentclass === "" && filter.filters.environment === ""}
          value={options.find(o => o.value === filter.filters.zone) || null}
          options={options}
          onChange={e => handleChangeFilter("zone", e ? e.value : "")}
        />
      </div>
    )
  }

  const classFilter = () => {
    const options = convertToSelectObject(environmentClasses)
    return (
      <div className="form-group Select-environmentclass">
        <Select
          isClearable
          placeholder="Class"
          value={options.find(o => o.value === filter.filters.environmentclass) || null}
          options={options}
          onChange={e => handleChangeFilter("environmentclass", e ? e.value : "")}
        />
      </div>
    )
  }

  const nodeTypeFilter = () => {
    const options = convertToSelectObject(nodeTypes)
    return (
      <div className="form-group Select-nodetype">
        <Select
          isClearable
          placeholder="Type"
          value={options.find(o => o.value === filter.filters.type) || null}
          options={options}
          onChange={e => handleChangeFilter("type", e ? e.value : "")}
        />
      </div>
    )
  }

  const resourceTypeFilter = () => {
    const options = convertToSelectObject(resourceTypes)
    return (
      <div className="form-group Select-resourcetype">
        <Select
          isClearable
          placeholder="Type"
          value={options.find(o => o.value === filter.filters.type) || null}
          options={options}
          onChange={e => handleChangeFilter("type", e ? e.value : "")}
        />
      </div>
    )
  }

  const lifecycleFilter = () => {
    const options = convertToSelectObject(LIFECYCLE_STATUSES)
    return (
      <div className="form-group Select-resourcetype">
        <Select
          isClearable
          placeholder="Lifecycle status"
          value={options.find(o => o.value === filter.filters.status) || null}
          options={options}
          onChange={e => handleChangeFilter("status", e ? e.value : "")}
        />
      </div>
    )
  }

  const aliasFilter = () => {
    return (
      <div className="form-group Input-alias">
        <input
          placeholder="Alias"
          className="form-control"
          style={{ height: "34px" }}
          type="text"
          value={filter.filters.alias}
          onChange={e => handleChangeFilter("alias", e.target.value)}
        />
      </div>
    )
  }

  const generateFiltersFromContext = () => {
    switch (filter.context) {
      case "applications":
        return <div className="form-inline filters">{lifecycleFilter()}</div>
      case "instances":
        return (
          <div className="form-inline filters">
            {classFilter()}
            {environmentFilter()}
            {applicationFilter()}
            {lifecycleFilter()}
          </div>
        )
      case "nodes":
        return (
          <div className="form-inline filters">
            {classFilter()}
            {environmentFilter()}
            {nodeTypeFilter()}
            {lifecycleFilter()}
          </div>
        )
      case "environments":
        return (
          <div className="form-inline filters">
            {classFilter()}
            {lifecycleFilter()}
          </div>
        )
      case "resources":
        return (
          <form className="form-inline filters">
            {aliasFilter()}
            {classFilter()}
            {environmentFilter()}
            {applicationFilter()}
            {zoneFilter()}
            {resourceTypeFilter()}
            {lifecycleFilter()}
          </form>
        )
    }
  }

  return <div>{generateFiltersFromContext()}</div>
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
