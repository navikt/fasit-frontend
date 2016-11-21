import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import Application from './Application'
import ApplicationsStatistics from './ApplicationsStatistics'


class Applications extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
      //  dispatch(fetchApplicationsList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
        //    dispatch(fetchApplicationsList(nextProps.filters))
        }
    }
    generateApplicationsList(){
        const { applications } = this.props
        if (applications.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (applications.requestFailed)
            return <pre>{applications.requestFailed}</pre>
        return applications.data.map((item, index)=> {
            return (
                <Link key={index} to={'/applications/'+item.name} className="search-result" activeClassName='search-result-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.name}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.groupid} <b> | </b>
                    </div>
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-2 item-list">
                    {this.generateApplicationsList()}
                </div>
                <div className="col-md-10">
                    {this.props.params.application ? <Application name={this.props.params.application}/>: <ApplicationsStatistics />}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        applications: state.applications,
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps)(Applications)