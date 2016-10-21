import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import Resource from './Resource'
import ResourcesStatistics from './ResourcesStatistics'

import { fetchResourcesList } from '../../actionCreators/resources_list'

class Resources extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
        dispatch(fetchResourcesList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
            dispatch(fetchResourcesList(nextProps.filters))
        }
    }
    generateResourcesList(){
        const { resources } = this.props
        if (resources.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (resources.requestFailed)
            return <pre>{resources.requestFailed}</pre>
        return resources.data.map((item, index)=> {
            return (
                <Link key={index} to={'/resources/'+item.alias} className="search-result" activeClassName='search-result-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.alias}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.scope.environment} <b> | </b>
                    </div>
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-2 item-list">
                    {this.generateResourcesList()}
                </div>
                <div className="col-md-10">
                    {this.props.params.resource ? <Resource name={this.props.params.resource}/>: <ResourcesStatistics />}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        resources: state.resources,
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps)(Resources)