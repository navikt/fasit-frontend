import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {submitNavSearch} from '../../actionCreators/common'


class NavSearch extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {dispatch} = this.props
        return (<form>
            <input
                type="text"
                className="form-control search-field-text-input"
                ref="searchField"
                placeholder={'Search for ' + context}
                value={searchString}
                onChange={(e) => dispatch(submitNavSearch(e.target.value))}
            />
            <button
                type="submit"
                className="search-field-button btn-grey"
                onClick={(e) => {
                    e.preventDefault();
                    browserHistory.push("/search")
                }}
            ><i className="fa fa-search"/></button>
        </form>)
    }
}
NavSearch.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        form: state.submit_form,
    }
}

export default connect(mapStateToProps)(NavSearch)
