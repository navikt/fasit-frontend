import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {submitSearchString} from '../../actionCreators/element_lists'

class SearchInput extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.searchField).focus();
    }


    render() {
        const location = this.props.location.pathname.split('/')[1] || "anything"
        const {searchString, dispatch} = this.props
        return (
            <div>
                <input
                    type="text"
                    className={searchString ? "form-control search-field-text-input-active": "form-control search-field-text-input"}
                    ref="searchField"
                    placeholder={'Search for ' + location}
                    value={searchString}
                    onChange={(e) => dispatch(submitSearchString(location, e.target.value))}
                />
            </div>
        )
    }
}

SearchInput.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
    searchString: state.search.searchString
})

export default connect(mapStateToProps)(SearchInput)
