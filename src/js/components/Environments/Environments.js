import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import moment from 'moment'

import Environment from './Environment'
import EnvironmentsStatistics from './EnvironmentsStatistics'


class Environments extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
        //dispatch(fetchEnvironmentsList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
            //dispatch(fetchEnvironmentsList(nextProps.filters))
        }
    }
    generateEnvironmentsList(){
        const { environments } = this.props
        if (environments.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (environments.requestFailed)
            return <pre>{environments.requestFailed}</pre>
        return environments.data.map((item, index)=> {
            return (
                <Link key={index} to={'/environments/'+item.name} className="search-result" activeClassName='search-result-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.name}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.environmentclass} <b> | </b>
                        {moment(item.created).format('ll')}
                    </div>
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-2 item-list">
                    {this.generateEnvironmentsList()}
                </div>
                <div className="col-md-10">
                    {this.props.params.environment ? <Environment name={this.props.params.environment}/>: <EnvironmentsStatistics />}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        environments: state.environments,
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps)(Environments)