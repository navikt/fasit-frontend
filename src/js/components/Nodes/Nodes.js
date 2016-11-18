import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Node from './Node'
import NodesStatistics from './NodesStatistics'

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

    generateNodesList() {
        const {nodes} = this.props
        if (nodes.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>
        else if (nodes.requestFailed)
            return <pre>{nodes.requestFailed}</pre>
        return nodes.data.map((item, index)=> {
            return (
                <Link key={index} to={'/nodes/' + item.hostname} className="element-list-item"
                      activeClassName='element-list-item-active'>
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
        const {nodes, dispatch} = this.props
        const total_count = nodes.headers.total_count
        const lastPage = Math.floor(total_count / 10) ? Math.floor(total_count / 10) : "?"
        return (
            <div className="main-page">
                <div className="col-md-2 nopadding">
                    <div className="element-list">
                        {this.generateNodesList()}
                    </div>
                    <div className="element-list-paging">
                        <hr style={{border: 1 + 'px  solid #ddd'}} />

                        <div className="btn-group btn-group-justified">
                            <a className="btn btn-default" onClick={()=>dispatch(changePage(0))}>{"<<"}</a>
                            <a className="btn btn-default"
                               onClick={()=>dispatch(changePage(nodes.currentPage - 1))}>{"<"}</a>
                            <div className="element-list-paging-number">
                                {nodes.currentPage + 1} / {!isNaN(lastPage) ? lastPage + 1 : lastPage}
                            </div>
                            <a className="btn btn-default"
                               onClick={()=>dispatch(changePage(nodes.currentPage + 1, lastPage))}>{">"}</a>
                            <a className="btn btn-default" onClick={()=>dispatch(changePage(lastPage))}>{">>"}</a>
                        </div>
                        <h4 className="text-center">{total_count} results</h4>

                        <div className="element-list-paging-summary">
                        </div>
                    </div>
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