import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Search from '../common/Search'
import SearchResults from './SearchResults'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {showResults: true};
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.searchBox)
    }

    render() {
        const {search} = this.props
        if(!search.searchString) {
            return (
                <div className="">
                    <div className="row home-brand-logo-container">
                        <br />
                        <br />
                        <img src="images/fasit-stempel.png" className="home-brand-logo "/>
                        <br />
                        <br />
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <Search />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <Search></Search>
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
