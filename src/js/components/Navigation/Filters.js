import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  //  changeFilter,
  // submitFilterString,
  fetchRestResourceOfType,
} from "../../actionCreators/element_lists";
import { isEmptyString } from "../../utils";
import { getQueryParam } from "../../utils";

const initialState = {
  environment: "",
  environmentclass: "",
  type: "",
  status: "",
  application: "",
  zone: "",
  alias: "",
};

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.setFilter();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentPage = getQueryParam(this.props.location.search, "page") || 0;
    const nextPropsPage = getQueryParam(nextProps.location.search, "page") || 0;

    if (currentPage !== nextPropsPage) {
      const context = nextProps.location.pathname.split("/")[1];
      this.props.dispatch(
        fetchRestResourceOfType(context, { ...this.state, page: nextPropsPage })
      );
    }
  }

  setFilter() {
    if (!isEmptyString(location.search)) {
      const { location } = this.props;
      const context = location.pathname.split("/")[1];

      const parsedParms = new URLSearchParams(location.search);
      let filters = { ...this.state };
      parsedParms.forEach((value, key) => {
        filters[key] = value;
      });

      this.setState(filters);
      this.props.dispatch(fetchRestResourceOfType(context, filters));
    }
  }

  handleChangeFilter(filterName, filterValue) {
    const { dispatch, context } = this.props;
    const filters = { ...this.state, [filterName]: filterValue };
    this.setState(filters);
    dispatch(fetchRestResourceOfType(context, filters));
  }

  convertToSelectObject(values) {
    return values.map((value) => {
      return { value, label: value };
    });
  }

  mapToValueObject(value) {
    return value ? { label: value, value } : null;
  }

  environmentFilter() {
    // if environmentclass is set, display only environments in that environmentclass
    const { environmentclass, environment } = this.state;
    const filteredEnvironments = this.props.environments.filter((env) => {
      if (!environmentclass) {
        return true;
      } else {
        return env.environmentclass === environmentclass;
      }
    });

    return (
      <div className="form-group Select-environment">
        <Select
          resetValue=""
          isClearable={true}
          placeholder="Env."
          style={{ width: "134px" }}
          name="form-field-name"
          value={this.mapToValueObject(environment)}
          options={this.convertToSelectObject(
            filteredEnvironments.map((env) => env.name)
          )}
          onChange={(e) =>
            this.handleChangeFilter("environment", e ? e.value : null)
          }
        />
      </div>
    );
  }

  applicationFilter() {
    return (
      <div className="form-group Select-application">
        <Select
          resetValue=""
          isClearable={true}
          placeholder="App."
          name="form-field-name"
          value={this.mapToValueObject(this.state.application)}
          options={this.convertToSelectObject(this.props.applicationNames)}
          onChange={(e) =>
            this.handleChangeFilter("application", e ? e.value : null)
          }
        />
      </div>
    );
  }

  zoneFilter() {
    const { environmentclass, environment, zone } = this.state;

    return (
      <div className="form-group Select-environmentclass">
        <Select
          resetValue=""
          placeholder="Zone"
          isClearable={true}
          name="form-field-zone"
          disabled={environmentclass === "" && environment === ""}
          value={this.mapToValueObject(zone)}
          options={this.convertToSelectObject(this.props.zones)}
          onChange={(e) => this.handleChangeFilter("zone", e ? e.value : null)}
        />
      </div>
    );
  }

  classFilter() {
    const { environmentclass } = this.state;
    return (
      <div className="form-group Select-environmentclass">
        <Select
          resetValue=""
          placeholder="Class"
          isClearable={true}
          name="form-field-name"
          value={this.mapToValueObject(environmentclass)}
          options={this.convertToSelectObject(this.props.environmentClasses)}
          onChange={(e) =>
            this.handleChangeFilter("environmentclass", e ? e.value : null)
          }
        />
      </div>
    );
  }

  nodeTypeFilter() {
    const { type } = this.state;
    return (
      <div className="form-group Select-nodetype">
        <Select
          resetValue=""
          placeholder="Type"
          isClearable={true}
          name="form-field-name"
          value={this.mapToValueObject(type)}
          options={this.convertToSelectObject(this.props.nodeTypes)}
          onChange={(e) => this.handleChangeFilter("type", e ? e.value : null)}
        />
      </div>
    );
  }

  resourceTypeFilter() {
    const { type } = this.state;
    return (
      <div className="form-group Select-resourcetype">
        <Select
          resetValue=""
          placeholder="Type"
          isClearable={true}
          name="form-field-name"
          value={this.mapToValueObject(type)}
          options={this.convertToSelectObject(this.props.resourceTypes)}
          onChange={(e) => this.handleChangeFilter("type", e ? e.value : null)}
        />
      </div>
    );
  }

  aliasFilter() {
    const { alias } = this.state;
    return (
      <div className="form-group Input-alias">
        <input
          placeholder="Alias"
          className="form-control"
          style={{ height: "36px", width: "200px" }}
          type="text"
          value={alias}
          onChange={(e) => this.handleChangeFilter("alias", e.target.value)}
        />
      </div>
    );
  }

  generateFiltersFromContext() {
    const { context } = this.props;

    switch (context) {
      case "instances":
        return (
          <div className="form-inline filters">
            {this.classFilter()}
            {this.environmentFilter()}
            {this.applicationFilter()}
          </div>
        );
      case "nodes":
        return (
          <div className="form-inline filters">
            {this.classFilter()}
            {this.environmentFilter()}
            {this.nodeTypeFilter()}
          </div>
        );

      case "resources":
        return (
          <form className="form-inline filters">
            {this.aliasFilter()}
            {this.classFilter()}
            {this.environmentFilter()}
            {this.applicationFilter()}
            {this.zoneFilter()}
            {this.resourceTypeFilter()}
            {/*this.lifecycleFilter()*/}
          </form>
        );
    }
  }

  render() {
    return <div>{this.generateFiltersFromContext()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    environments: state.environments.environments,
    applicationNames: state.applications.applicationNames,
    environmentClasses: state.environments.environmentClasses,
    nodeTypes: state.nodes.nodeTypes,
    zones: state.environments.zones,
    resourceTypes: state.resources.resourceTypes.sort(),
  };
};

export default connect(mapStateToProps)(Filters);
