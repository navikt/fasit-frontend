import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {setSearchString, changeFilter} from '../actionCreators/filters'
import Filters from './Navigation/Filters'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    submitSearchString(e) {
        const {searchString, dispatch} = this.props
        if (e.charCode == 13 || e.type === "click") {
            switch (this.props.searchContext) {
                case 'nodes':
                    dispatch(changeFilter('hostname', searchString))
                    return
                case 'environments':
                    dispatch(changeFilter('environment', searchString))
                    return
                case 'applications':
                    dispatch(changeFilter('application', searchString))
                    return
                case 'instances':
                    this.props.dispatch(changeFilter('instances', searchString))
                    return
                case 'resources':
                    dispatch(changeFilter('alias', searchString))
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
                <span><img src="images/fasit-stempel.png" alt="FASIT" className="home-brand-logo"/>
                <div className="home-brand-name"></div></span>
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <span classNam>
                        <input
                            type="search"
                            className="form-control search-field-text-input"
                            id="search"
                            placeholder={'Search for ' + location}
                            value={searchString}
                            onChange={(e) => dispatch(setSearchString(e.target.value))}
                            onKeyPress={this.submitSearchString.bind(this)}
                        />
                        <button type="button" className="search-field-button btn-grey" onClick={this.submitSearchString.bind(this)}><i className="fa fa-arrow-right" /></button>
                            </span>
                    </div>

                </div>
                <br />
                <br />
                <br />
                <br />
                <Filters />
                {location === 'anything' ? <div className="col-md-4 col-md-offset-4 alert alert-dismissible alert-danger">
                    <strong>Isjda!</strong><br />Generelt søk er ikke ferdig på backend ennå.<br /> Velg en kategori i sidemenyen</div> : <div />}

            </div>
        )
    }
}
Home.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
    searchString: state.search.searchString,
    searchContext: state.search.context
})

export default connect(mapStateToProps)(Home)
