import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {setSearchString} from '../../actionCreators/filters'
import {fetchElementList, submitSearchString} from '../../actionCreators/element_lists'

class Search extends Component {
    constructor(props) {
        super(props)
    }

/*    submitSearchString(e) {
        const {search, dispatch} = this.props
        const elementTypes = ['nodes', 'environments', 'applications', 'instances', 'resources']
        dispatch(setSearchString(e.target.value))

        switch (this.props.searchContext) {
            case 'nodes':
                dispatch(fetchElementList(search, "nodes"))
                return
            case 'environments':
                dispatch(fetchElementList(search, "environments"))
                return
            case 'applications':
                dispatch(fetchElementList(search, "applications"))
                return
            case 'instances':
                dispatch(fetchElementList(search, "instances"))
                return
            case 'resources':
                dispatch(fetchElementList(search, "resources"))
                return
            default:
                elementTypes.forEach((e) => {
                    dispatch(fetchElementList(search, e))
                })
                return
        }
    }*/

    render() {
        const location = this.props.location.pathname.split('/')[1] || "anything"
        const {searchString, dispatch} = this.props
        return (
            <div>
                <input
                    type="text"
                    className="form-control search-field-text-input"
                    id="search"
                    placeholder={'Search for ' + location}
                    value={searchString}
                    onChange={(e) => dispatch(submitSearchString(location, e.target.value))}
                />
            </div>
        )
    }
}

Search.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
    searchString: state.search.searchString
})

export default connect(mapStateToProps)(Search)
