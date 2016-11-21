import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'

import Instance from './Instance'
import InstancesStatistics from './InstancesStatistics'


class Instances extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
      //  dispatch(fetchInstancesList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
     //       dispatch(fetchInstancesList(nextProps.filters))
        }
    }
    generateInstancesList(){
        const { instances } = this.props
        if (instances.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (instances.requestFailed)
            return <pre>{instances.requestFailed}</pre>
        return instances.data.map((item, index)=> {
            return (
                <Link key={index} to={'/instances/'+item.application} className="search-result" activeClassName='search-result-active'>
                    <div>
                        <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.application}</h5>
                        <i className="fa fa-globe fa-fw"></i> {item.environment} <b> | </b>
                        {item.cluster ? item.cluster.name : ""}
                    </div>
                </Link>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-2 item-list">
                    {this.generateInstancesList()}
                </div>
                <div className="col-md-10">
                    {this.props.params.instance ? <Instance name={this.props.params.instance}/>: <InstancesStatistics />}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        instances: state.instances,
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps)(Instances)