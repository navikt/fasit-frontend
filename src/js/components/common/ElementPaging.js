import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {submitFilterString} from '../../actionCreators/element_lists'

export class ElementPaging extends Component {
    constructor(props) {
        super(props)
        this.state = {page: 0}
    }

    // always reset to page 0 if search or filters have changed
    componentWillReceiveProps(nextProps){
        const {filter} = this.props
        if ( filter.filters !== nextProps.filter.filters){
            this.setState({page:0})
        }
    }

    changePage(changeTo, lastPage) {
        const {dispatch, filter} = this.props
        const page = this.state.page
        switch (changeTo) {
            case "first":
                this.setState({page: 0})
                dispatch(submitFilterString(filter.context, 0))
                break
            case "last":
                this.setState({page: lastPage})
                dispatch(submitFilterString(filter.context, lastPage))
                break
            case "next":
                if (page < lastPage) {
                    this.setState({page: page + 1})
                    dispatch(submitFilterString(filter.context, page + 1))
                }
                break
            case "prev":
                if (page > 0) {
                    this.setState({page: page - 1})
                    dispatch(submitFilterString(filter.context, page - 1))
                }
                break
        }
    }

    render() {
        const {filter} = this.props
        const total_count = this.props[filter.context].headers.total_count
        const lastPage = calculateLastPage(total_count)
        return (
            <div className="element-list-paging">
                <div className="btn-group btn-group-justified">
                    <a className="btn btn-link" id="first" onClick={this.changePage.bind(this, "first", lastPage)}><i
                        className="fa fa-angle-double-left" aria-hidden="true"/></a>
                    <a className="btn btn-link " id="prev" onClick={this.changePage.bind(this, "prev", lastPage)}><i
                        className="fa fa-angle-left" aria-hidden="true"/></a>
                    <div className="element-list-paging-number">
                        {this.state.page + 1} / {lastPage + 1}
                    </div>
                    <a className="btn btn-link" id="next" onClick={this.changePage.bind(this, "next", lastPage)}><i
                        className="fa fa-angle-right" aria-hidden="true"/></a>
                    <a className="btn btn-link " id="last" onClick={this.changePage.bind(this, "last", lastPage)}><i
                        className="fa fa-angle-double-right" aria-hidden="true"/></a>
                </div>
            </div>
        )
    }
}

const calculateLastPage = (totalCount) => {
    const PER_PAGE = 10
    if (!totalCount){
        return "?"
    } else if (totalCount <= PER_PAGE){
        return 0
    } else {
        return Math.ceil(totalCount / PER_PAGE)
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        nodes: state.nodes,
        resources: state.resources,
        environments: state.environments,
        applications: state.applications,
        instances: state.instances,
    }
}

export default connect(mapStateToProps)(ElementPaging)