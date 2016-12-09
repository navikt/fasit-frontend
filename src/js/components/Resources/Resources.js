import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import ElementPaging from '../common/ElementPaging'
import ElementList from '../common/ElementList'
import Filters from '../Navigation/Filters'
import Resource from './Resource'
import {submitSearchString} from '../../actionCreators/element_lists'

class Resources extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(submitSearchString("resources", search.searchString, 0))
    }

    render() {
        const {resources} = this.props

        if (this.props.params.resource)
            return <Resource id={this.props.params.resource} />
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
                        <h4>{resources.headers.total_count} resources</h4>
                        <ElementList type="resources" data={resources}/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        resources: state.resources,
        search: state.search
    }
}

export default connect(mapStateToProps)(Resources)