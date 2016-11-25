import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {fetchEnvironmentNames} from '../../actionCreators/environment_names'
import {fetchResourceTypes} from '../../actionCreators/resource_types'
import {fetchNodeTypes} from '../../actionCreators/node_types'
import {fetchElementList, changeFilter} from '../../actionCreators/element_lists'


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
        if (search.filters != nextProps.search.filters){
            const elementTypes = ['nodes', 'environments', 'applications', 'instances', 'resources']
            switch (search.context) {
                case 'nodes':
                    dispatch(fetchElementList(nextProps.search, "nodes"))
                    return
                case 'environments':
                    dispatch(fetchElementList(nextProps.search, "environments"))
                    return
                case 'applications':
                    dispatch(fetchElementList(nextProps.search, "applications"))
                    return
                case 'instances':
                    dispatch(fetchElementList(nextProps.search, "instances"))
                    return
                case 'resources':
                    dispatch(fetchElementList(nextProps.search, "resources"))
                    return
                default:
                    elementTypes.forEach((e) => {
                        dispatch(fetchElementList(nextProps.search, e))
                    })
                    return
            }
        }
    }

    handleChangeFilter(filtername, e) {
        const {dispatch} = this.props
        dispatch(changeFilter(filtername, e.value))
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
                    onChange={this.handleChangeFilter.bind(this, "environment")}
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
                    onChange={this.handleChangeFilter.bind(this, "application")}

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
                    onChange={this.handleChangeFilter.bind(this, "environmentclass")}
                />
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
                    onChange={this.handleChangeFilter.bind(this, "type")}
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
                    onChange={this.handleChangeFilter.bind(this, "resourcetype")}

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
                    onChange={this.handleChangeFilter.bind(this, "name")}
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
                        {this.nameFilter()}
                        {this.classFilter()}
                        {this.environmentFilter()}
                        {this.applicationFilter()}
                        {this.resourceTypeFilter()}
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
