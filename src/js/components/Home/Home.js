import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {setSearchString, changeFilter} from '../../actionCreators/filters'
import {fetchElementList} from '../../actionCreators/element_lists'
import Filters from '../Navigation/Filters'
import SearchResults from './SearchResults'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {showResults:false};
    }
    componentWillReceiveProps(nextProps){
        //if (nextProps.location.pathname === "/") this.setState({showResults:false})
        //console.log("showresults:",this.state.showResults)
    }

    submitSearchString(e) {
        const {search, dispatch} = this.props
        const elementTypes = ['nodes', 'environments', 'applications', 'instances', 'resources']

        if (e.charCode == 13 || e.type === "click") {
            this.setState({showResults:true})

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
        }
    }

    render() {
        const location = this.props.location.pathname.split('/')[1] || "anything"
        const {searchString, dispatch} = this.props
        return (
            <div className="text-center">

                <br />
                <br />
                <span><img src="images/fasit-stempel.png" className="home-brand-logo"/>
                <div className="home-brand-name"></div></span>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <input
                            type="search"
                            className="form-control search-field-text-input"
                            id="search"
                            placeholder={'Search for ' + location}
                            value={searchString}
                            onChange={(e) => dispatch(setSearchString(e.target.value))}
                            onKeyPress={this.submitSearchString.bind(this)}
                        />
                        <button type="button" className="search-field-button btn-grey"
                                onClick={this.submitSearchString.bind(this)}><i className="fa fa-arrow-right"/></button>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-left">
                        <Filters />
                    </div>
                </div>
                {this.state.showResults ? <SearchResults /> : <div />}


            </div>
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
