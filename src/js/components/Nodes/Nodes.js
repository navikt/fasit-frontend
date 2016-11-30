import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import ElementPaging from '../common/ElementPaging'
import ElementList from '../common/ElementList'
import SearchResults from '../Search/SearchResults'
import Filters from '../Search/Filters'
import Node from './Node'
import {submitSearchString, changePage} from '../../actionCreators/element_lists'

class Nodes extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(submitSearchString("nodes", search.searchString, 0))
    }

    render() {
        const {nodes, dispatch, search} = this.props

        if (this.props.params.node)
            return <Node hostname={this.props.params.node} />// <div>{this.props.params.node}</div>
        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <Filters />
                    </div>
                    <div className="col-sm-3 col-sm-offset-1 col-xs-3">
                        <ElementPaging />
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row element-list-container">
                        <h4>{nodes.headers.total_count} nodes</h4>
                        <ElementList type="nodes" data={nodes}/>
                    </div>
                </div>
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    return {
        nodes: state.nodes,
        search: state.search
    }
}

export default connect(mapStateToProps)(Nodes)