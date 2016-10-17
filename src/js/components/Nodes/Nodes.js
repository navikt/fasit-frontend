import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Node from './Node'
import NodesStatistics from './NodesStatistics'

import { fetchNodeList } from '../../actionCreators/nodes_list'

class Nodes extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
        dispatch(fetchNodeList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
            dispatch(fetchNodeList(nextProps.filters))
        }
    }
    generateNodesList(){
        const { nodes } = this.props
        if (nodes.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (nodes.requestFailed)
            return <pre>{nodes.requestFailed}</pre>
        return nodes.data.map((item, index)=> {
            return (
                <Link key={index} to={'/nodes/'+item.hostname} className="search-result" activeClassName='search-result-active'>
                    <div>
                    <h5><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.hostname}</h5>
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
                    {this.generateNodesList()}
                </div>
                <div className="col-md-10">
                    {this.props.params.node ? <Node hostname={this.props.params.node}/>: <NodesStatistics />}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        nodes: state.nodes,
        filters: state.search.filters,
    }
}

export default connect(mapStateToProps)(Nodes)