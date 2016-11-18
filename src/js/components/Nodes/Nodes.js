import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Node from './Node'
import NodesStatistics from './NodesStatistics'
import ElementList from '../common/ElementList'

import {fetchNodeList, changePage} from '../../actionCreators/nodes_list'

class Nodes extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, filters, nodes} = this.props
        dispatch(fetchNodeList(filters, nodes.currentPage))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, filters, nodes} = this.props
        if (filters != nextProps.filters || nodes.currentPage !== nextProps.nodes.currentPage) {
            console.log("fetching page")
            dispatch(fetchNodeList(nextProps.filters, nextProps.nodes.currentPage))
        }
    }

    render() {
        const {nodes, dispatch} = this.props
        const total_count = nodes.headers.total_count
        const lastPage = Math.floor(total_count / 10) ? Math.floor(total_count / 10) : "?"
        const toFirstPage = ()=>dispatch(changePage(0))
        const toLastPage = ()=>dispatch(changePage(lastPage))
        const toNextPage = ()=>dispatch(changePage(nodes.currentPage + 1, lastPage))
        const toPrevPage = ()=>dispatch(changePage(nodes.currentPage - 1))
        return (
            <div className="main-page">
                <div className="col-md-2 nopadding">
                        <ElementList
                            type="nodes"
                            data={nodes}
                            toFirstPage={toFirstPage}
                            toLastPage={toLastPage}
                            toNextPage={toNextPage}
                            toPrevPage={toPrevPage}
                            current={nodes.currentPage +1}
                            last = {lastPage}
                            total = {total_count}

                        />
                    </div>

                <div className="col-md-10">
                    {this.props.params.node ? <Node hostname={this.props.params.node}/> : <NodesStatistics />}
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