import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import ElementPaging from '../common/ElementPaging'
import ElementList from '../common/ElementList'
import Filters from '../Navigation/Filters'
import Application from './Application'
import {submitSearchString} from '../../actionCreators/element_lists'

class Applications extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(submitSearchString("applications", search.searchString, 0))
    }

    render() {
        const {applications} = this.props

        if (this.props.params.application) {
            return <Application name={this.props.params.application} />
        } else {
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
                            <h4>{applications.headers.total_count} applications</h4>
                            <ElementList type="applications" data={applications}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        applications: state.applications,
        search: state.search
    }
}

export default connect(mapStateToProps)(Applications)