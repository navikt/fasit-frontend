import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import ElementPaging from '../common/ElementPaging'
import ElementList from '../common/ElementList'
import Filters from '../Navigation/Filters'
import Instance from './Instance'
import {submitSearchString} from '../../actionCreators/element_lists'

class Instances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(submitSearchString("instances", search.searchString, 0))
    }

    render() {
        const {instances} = this.props

        if (this.props.params.instance)
            return <Instance id={this.props.params.instance} />
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
                        <h4>{instances.headers.total_count} instances</h4>
                        <ElementList type="instances" data={instances}/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        instances: state.instances,
        search: state.search
    }
}

export default connect(mapStateToProps)(Instances)