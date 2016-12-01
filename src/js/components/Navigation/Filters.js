import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {fetchEnvironmentNames} from '../../actionCreators/environment_names'
import {fetchResourceTypes} from '../../actionCreators/resource_types'
import {fetchNodeTypes} from '../../actionCreators/node_types'
import {fetchElementList, changeFilter, submitSearchString} from '../../actionCreators/element_lists'


class Filters extends Component {
    constructor(props) {
        super(props)

        this.names = ['app1', 'app2', 'app3', 'app4']
        this.applications = ['app1', 'app2', 'app3', 'app4']
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(fetchEnvironmentNames(search.filters))
        dispatch(fetchResourceTypes())
        dispatch(fetchNodeTypes())
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, search} = this.props
        if (search.filters.environmentclass != nextProps.search.filters.environmentclass) {
            dispatch(fetchEnvironmentNames(nextProps.search.filters))
        }
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
        return (
            <div className="Select-environment">
                <Select
                    resetValue=""
                    placeholder="Env."
                    name="form-field-name"
                    value={this.props.search.filters.environment}
                    options={this.convertToSelectObject(this.props.environmentNames)}
                    onChange={(e) => this.handleChangeFilter("environment", e.value)}
                />
            </div>
        )
    }

    applicationFilter() {
        return (
            <div className="Select-application">
                <Select
                    resetValue=""
                    placeholder="App."
                    name="form-field-name"
                    value={this.props.search.filters.application}
                    options={this.convertToSelectObject(this.applications)}
                    onChange={(e) => this.handleChangeFilter("application", e.value)}

                />
            </div>
        )
    }

    classFilter() {
        return (
            <div className="Select-environmentclass">
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
            <div className="Select-nodetype">
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
            <div className="Select-resourcetype">
                <Select
                    resetValue=""
                    placeholder="Type"
                    name="form-field-name"
                    value={this.props.filters.resourcetype}
                    options={this.convertToSelectObject(this.props.resourceTypes)}
                    onChange={(e) => this.handleChangeFilter("resourcetype", e.value)}

                />
            </div>
        )
    }

    nameFilter() {
        return (
            <div className="Select-name">
                <Select
                    resetValue=""
                    placeholder="Name"
                    name="form-field-name"
                    value={this.props.filters.name}
                    options={this.convertToSelectObject(this.names)}
                    onChange={(e) => this.handleChangeFilter("name", e.value)}
                />
            </div>
        )
    }

    generateFiltersFromContext() {
        const {search} = this.props
        switch (search.context) {
            case "applications":
                return (
                    <div className="filters">
                    </div>
                )

            case "instances":
                return (
                    <div className="filters">
                        {this.classFilter()}
                        {this.environmentFilter()}
                    </div>
                )
            case "nodes":
                return (
                    <div className="filters">
                        {this.classFilter()}
                        {this.environmentFilter()}
                        {this.nodeTypeFilter()}
                    </div>
                )
            case "environments":
                return (
                    <div className="filters">
                        {this.classFilter()}
                    </div>
                )
            case "resources":
                return (
                    <div className="filters">
                        {/*this.nameFilter()*/}
                        {this.classFilter()}
                        {this.environmentFilter()}
                        {this.applicationFilter()}
                        {/*this.resourceTypeFilter()*/}
                    </div>
                )
            default:
                return (
                    <div className="filters">
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
        environmentNames: state.environments.environmentNames,
        environmentClasses: state.environments.environmentClasses,
        nodeTypes: state.nodes.nodeTypes,
        resourceTypes: state.resources.resourceTypes
    }
}

export default connect(mapStateToProps)(Filters)
