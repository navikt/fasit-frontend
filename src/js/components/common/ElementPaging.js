import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {submitSearchString} from '../../actionCreators/element_lists'

class ElementPaging extends Component {
    constructor(props) {
        super(props)
        this.state = {page: 0}
    }

    changePage(changeTo, lastPage) {
        const {dispatch, search} = this.props
        const page = this.state.page
        switch (changeTo) {
            case "first":
                this.setState({page: 0})
                dispatch(submitSearchString(search.context, search.searchString, 0))
                break
            case "last":
                this.setState({page: lastPage})
                dispatch(submitSearchString(search.context, search.searchString, lastPage))
                break
            case "next":
                if (page < lastPage) {
                    this.setState({page: page + 1})
                    dispatch(submitSearchString(search.context, search.searchString, page + 1))
                }
                break
            case "prev":
                if (page > 0) {
                    this.setState({page: page - 1})
                    dispatch(submitSearchString(search.context, search.searchString, page - 1))
                }
                break

        }
    }

    render() {
        const {search, nodes, resources, environments, applications, instances} = this.props
        const total_count = this.props[search.context].headers.total_count
        const lastPage = Math.floor(total_count / 10) ? Math.floor(total_count / 10) : "?"
        return (
            <div className="element-list-paging">

                <div className="btn-group btn-group-justified">
                    <a className="btn btn-link " onClick={this.changePage.bind(this, "first", lastPage)}><i
                        className="fa fa-angle-double-left" aria-hidden="true"/></a>
                    <a className="btn btn-link " onClick={this.changePage.bind(this, "prev", lastPage)}><i
                        className="fa fa-angle-left" aria-hidden="true"/></a>
                    <div className="element-list-paging-number">
                        {this.state.page + 1} / {!isNaN(lastPage) ? lastPage + 1 : lastPage}
                    </div>
                    <a className="btn btn-link " onClick={this.changePage.bind(this, "next", lastPage)}><i
                        className="fa fa-angle-right" aria-hidden="true"/></a>
                    <a className="btn btn-link " onClick={this.changePage.bind(this, "last", lastPage)}><i
                        className="fa fa-angle-double-right" aria-hidden="true"/></a>
                </div>
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    return {
        search: state.search,
        nodes: state.nodes,
        resources: state.resources,
        environments: state.environments,
        application: state.application,
        instances: state.instances,
    }
}

export default connect(mapStateToProps)(ElementPaging)