import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import { changeFilter } from '../../actionCreators/navigation'
import { fetchEnvironmentNames } from '../../actionCreators/fetchEnvironmentNames'
import { fetchResourceTypes } from '../../actionCreators/resource_types'
import { fetchNodeTypes } from '../../actionCreators/node_types'

class Filters extends Component {
    constructor(props){
        super(props)

        this.resourceTypes = ['webserviceendpoint', 'baseurl', 'queue', 'datasource']
        this.environmentClasses = ['u', 't', 'q', 'p']
        this.names = ['app1', 'app2', 'app3', 'app4']
        this.applications = ['app1', 'app2', 'app3', 'app4']
    }
    componentDidMount(){
        const { dispatch, filters} = this.props
        dispatch(fetchEnvironmentNames(filters))
        dispatch(fetchResourceTypes())
        dispatch(fetchNodeTypes())
    }
    componentWillReceiveProps(nextProps){
        const { dispatch, filters} = this.props

        if (filters.environmentclass != nextProps.filters.environmentclass) {
            dispatch(fetchEnvironmentNames(nextProps.filters))
        }
    }

    handleChangeFilter(filtername, event){
        this.props.dispatch(changeFilter(filtername, event))

    }
    convertToSelectObject(values){
        return values.map(value => {
            return {value: value, label: value}
        })
    }

    environmentFilter(){
        return (
            <div className="Select-environment">
                <Select
                    resetValue=""
                    placeholder="Env."
                    name="form-field-name"
                    value={this.props.filters.environment}
                    options={this.convertToSelectObject(this.props.environmentNames)}
                    onChange={this.handleChangeFilter.bind(this, "environment")}
                />
            </div>
        )
    }
    applicationFilter(){
        return (
            <div className="Select-application">
                <Select
                    resetValue=""
                    placeholder="App."
                    name="form-field-name"
                    value={this.props.filters.application}
                    options={this.convertToSelectObject(this.applications)}
                    onChange={this.handleChangeFilter.bind(this, "application")}

                />
            </div>
        )
    }
    classFilter(){
        return (
            <div className="Select-environmentclass">
                <Select
                    resetValue=""
                    placeholder="Class"
                    name="form-field-name"
                    value={this.props.filters.environmentclass}
                    options={this.convertToSelectObject(this.environmentClasses)}
                    onChange={this.handleChangeFilter.bind(this, "environmentclass")}

                />
            </div>
        )
    }
    nodeTypeFilter(){
        return (
            <div className="Select-nodetype">
                <Select
                    resetValue=""
                    placeholder="Type"
                    name="form-field-name"
                    value={this.props.filters.type}
                    options={this.convertToSelectObject(this.props.nodeTypes)}
                    onChange={this.handleChangeFilter.bind(this, "type")}

                />
            </div>
        )
    }
    resourceTypeFilter(){
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
    nameFilter(){
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
    generateFiltersFromContext(){
        switch (this.props.context) {
            case "":
                return (<div></div>)
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
        }
    }
    render(){
        return (<div>
                {this.generateFiltersFromContext()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        filters: state.search.filters,
        context: state.search.context,
        environmentNames: state.search.environmentNames,
        nodeTypes: state.nodes.nodeTypes,
        resourceTypes: state.resources.resourceTypes
    }
}

export default connect(mapStateToProps)(Filters)
