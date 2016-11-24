import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Search from '../common/Search'
import SearchResults from './SearchResults'
import {fetchAllElementLists} from '../../actionCreators/element_lists'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {showResults: true};
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(fetchAllElementLists(search.searchString))

    }

    render() {
        const {search} = this.props
        if (!search.searchString) {
            return (
                <div>
                    <div className="row home-brand-logo-container">
                        <div className="col-md-12">
                            <img src="images/fasit-stempel.png" className="home-brand-logo "/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <Search />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <SearchResults />
        )
    }
}
Home.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
    search: state.search
})

export default connect(mapStateToProps)(Home)
