import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {changeFilter, submitSearchString} from '../../actionCreators/element_lists'


class Filters extends Component {
    constructor(props) {
        super(props)
    }

    handleChangeFilter(filterName, filterValue) {
        const {dispatch, search} = this.props
        dispatch(changeFilter(filterName, filterValue))
        dispatch(submitSearchString(search.context, search.searchString, 0))
    }

    convertToSelectObject(values) {
        return values.map(value => {
            return {value, label: value}
        })
    }

    environmentFilter() {
        // if environmentclass is set, display only environments in that environmentclass
        const filteredEnvironments = this.props.environments.filter((env) => {
            if (!this.props.search.filters.environmentclass){
                return true
            } else {
                return env.environmentclass === this.props.search.filters.environmentclass
            }
        })

        return (
            <div className="form-group Select-environment">
                <Select
                    resetValue=""
                    placeholder="Env."
                    name="form-field-name"
                    value={this.props.search.filters.environment}
                    options={this.convertToSelectObject(filteredEnvironments.map((env) => env.name))}
                    onChange={(e) => this.handleChangeFilter("environment", e.value)}
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
                    value={this.props.search.filters.application}
                    options={this.convertToSelectObject(this.props.applicationNames)}
                    onChange={(e) => this.handleChangeFilter("application", e.value)}
                />
            </div>
        )
    }

    zoneFilter() {
        return (
            <div className="form-group Select-environmentclass">
                <Select
                    resetValue=""
                    placeholder="Zone"
                    name="form-field-zone"
                    disabled={this.props.search.filters.environmentclass === '' && this.props.search.filters.environment === ''}
                    value={this.props.search.filters.zone}
                    options={this.convertToSelectObject(this.props.zones)}
                    onChange={(e) => this.handleChangeFilter("zone", e.value)}
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
                    value={this.props.search.filters.environmentclass}
                    options={this.convertToSelectObject(this.props.environmentClasses)}
                    onChange={(e) => this.handleChangeFilter("environmentclass", e.value)}/>
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
                    value={this.props.search.filters.type}
                    options={this.convertToSelectObject(this.props.nodeTypes)}
                    onChange={(e) => this.handleChangeFilter("type", e.value)}
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
                    value={this.props.search.filters.resourcetype}
                    options={this.convertToSelectObject(this.props.resourceTypes)}
                    onChange={(e) => this.handleChangeFilter("resourcetype", e.value)}
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
                    style={{height: "34px"}}
                    type="text"
                    value={this.props.search.filters.alias}
                    onChange={(e) => this.handleChangeFilter("alias", e.target.value)}
                />
            </div>
        )
    }

    generateFiltersFromContext() {
        const {search} = this.props
        switch (search.context) {
            case "applications":
                return (
                    <div className="form-inline filters">
                    </div>
                )

            case "instances":
                return (
                    <div className="form-inline filters">
                        {this.classFilter()}
                        {this.environmentFilter()}
                        {this.applicationFilter()}
                    </div>
                )
            case "nodes":
                return (
                    <div className="form-inline filters">
                        {this.classFilter()}
                        {this.environmentFilter()}
                        {this.nodeTypeFilter()}
                    </div>
                )
            case "environments":
                return (
                    <div className="form-inline filters">
                        {this.classFilter()}
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

                    </form>
                )
            default:
                return (
                    <div className="form-inline  filters">
                        {this.classFilter()}
                        {this.environmentFilter()}
                        {this.nodeTypeFilter()}
                        {this.applicationFilter()}
                    </div>
                )
        }
    }

    render() {
        return (<div>
                {this.generateFiltersFromContext()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        search: state.search,
        environments: state.environments.environments,
        applicationNames: state.applications.applicationNames,
        environmentClasses: state.environments.environmentClasses,
        nodeTypes: state.nodes.nodeTypes,
        zones: state.environments.zones,
        resourceTypes: state.resources.resourceTypes.sort()
    }
}

export default connect(mapStateToProps)(Filters)
