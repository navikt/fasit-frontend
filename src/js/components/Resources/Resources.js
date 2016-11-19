import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Resource from './Resource'
import ResourcesStatistics from './ResourcesStatistics'
import ElementPaging from '../common/ElementPaging'

import {clearResourcesList, fetchElementList, changePage} from '../../actionCreators/element_lists'

class Resources extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(clearResourcesList())
    }

    componentDidMount() {
        const {dispatch, filters, currentPage} = this.props
        dispatch(changePage(0))
        dispatch(fetchElementList(filters, currentPage, "resources"))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, filters, currentPage} = this.props
        if (filters != nextProps.filters || currentPage !== nextProps.currentPage) {
            dispatch(fetchElementList(nextProps.filters, nextProps.currentPage, "resources"))
        }
    }

    render() {
        const {resources, dispatch, currentPage} = this.props
        const total_count = resources.headers.total_count
        const lastPage = Math.floor(total_count / 10) ? Math.floor(total_count / 10) : "?"
        const toFirstPage = ()=>dispatch(changePage(0))
        const toLastPage = ()=>dispatch(changePage(lastPage))
        const toNextPage = ()=>dispatch(changePage(currentPage + 1, lastPage))
        const toPrevPage = ()=>dispatch(changePage(currentPage - 1))
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
}


const mapStateToProps = (state) => {
    return {
        resources: state.resources,
        filters: state.search.filters,
        currentPage: state.configuration.elementListPage
    }
}

export default connect(mapStateToProps)(Resources)