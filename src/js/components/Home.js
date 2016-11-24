import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {submitSearchString} from '../actionCreators/element_lists'


class Home extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {dispatch, searchString, location} = this.props
        const context = location.pathname.split('/')[1] || "anything"
        return (
            <div>
                <div className="home-brand-logo-container">
                    <div className="col-md-12">
                        <img src="images/fasit-stempel.png" className="home-brand-logo "/>
                    </div>
                </div>
                <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <form>
                        <input
                            type="text"
                            className="form-control search-field-text-input"
                            ref="searchField"
                            placeholder={'Search for ' + context}
                            value={searchString}
                            onChange={(e) => dispatch(submitSearchString(context, e.target.value))}
                        />
                        <button
                            type="submit"
                            className="search-field-button btn-grey"
                            onClick={(e) => {
                                e.preventDefault();
                                browserHistory.push("/search")
                            }}
                        ><i className="fa fa-search"/></button>
                    </form>
                    <br />
                </div>
                <div className="col-md-9 col-md-offset-2 col-sm-8 col-sm-offset-2">
                    <ul className="nav nav-pills search-entity-types">
                        <li className="">
                            <Link to="/environments">
                                <i className="fa fa-sitemap"/>&nbsp;&nbsp;Environments&nbsp;&nbsp;</Link>
                        </li>
                        <li>
                            <Link to="/applications">
                                <i className="fa fa-cube"/>&nbsp;&nbsp;Applications</Link>
                        </li>
                        <li>
                            <Link to="/instances">
                                <i className="fa fa-cubes"/>&nbsp;&nbsp;Instances</Link>
                        </li>
                        <li>
                            <Link to="/nodes">
                                <i className="fa fa-server"/>&nbsp;&nbsp;Nodes</Link>

                        </li>
                        <li>
                            <Link to="/resources">
                                <i className="fa fa-cogs"/>&nbsp;&nbsp;Resources</Link>
                        </li>
                    </ul>
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.routing.locationBeforeTransitions,
        searchString: state.search.searchString
    }
}

export default connect(mapStateToProps)(Home)
