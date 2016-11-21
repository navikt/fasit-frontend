import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import ElementPaging from '../common/ElementPaging'

import {clearNodesList, fetchElementList, changePage} from '../../actionCreators/element_lists'

class Nodes extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        //dispatch(clearNodesList())
    }

    componentDidMount() {
        const {dispatch, filters, currentPage} = this.props
        //dispatch(changePage(0))
        //dispatch(fetchElementList(filters, currentPage, "nodes"))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, filters, currentPage} = this.props
        if (filters != nextProps.filters || currentPage !== nextProps.currentPage) {
            //dispatch(fetchElementList(nextProps.filters, nextProps.currentPage, "nodes"))
        }
    }

    render() {
        const {nodes, dispatch, currentPage} = this.props
        const total_count = nodes.headers.total_count
        const lastPage = Math.floor(total_count / 10) ? Math.floor(total_count / 10) : "?"
        const toFirstPage = ()=>dispatch(changePage(0))
        const toLastPage = ()=>dispatch(changePage(lastPage))
        const toNextPage = ()=>dispatch(changePage(currentPage + 1, lastPage))
        const toPrevPage = ()=>dispatch(changePage(currentPage - 1))
        if (nodes.data.length > 0) {
            return (
                <div>

                    <ElementPaging
                        toFirstPage={toFirstPage}
                        toLastPage={toLastPage}
                        toNextPage={toNextPage}
                        toPrevPage={toPrevPage}
                        current={currentPage + 1}
                        last={lastPage}
                        total={total_count}
                    />
                </div>
            )
        }
        return <div />
    }
}


const mapStateToProps = (state) => {
    return {
        nodes: state.nodes,
        filters: state.search.filters,
        currentPage: state.search.activePage
    }
}

export default connect(mapStateToProps)(Nodes)