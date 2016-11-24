import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import SearchInput from '../common/SearchInput'
import SearchResults from './SearchResults'
import {fetchAllElementLists} from '../../actionCreators/element_lists'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {showResults: true};
    }

    componentDidMount() {
        const {dispatch, search} = this.props
        dispatch(fetchAllElementLists(search.searchString))

    }

    render() {
        const {search, environments, applications, instances, nodes, resources} = this.props
        console.log(environments, applications, instances, nodes, resources)

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
                            <SearchInput />
                        </div>
                        <br />
                    </div>
                    <div className="row">
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
                </div>
            )
        }
        return (
            <SearchResults />
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.routing.locationBeforeTransitions,
    search: state.search,
    nodes: state.nodes,
    resources: state.resources,
    instances: state.instances,
    environments: state.environments,
})

export default connect(mapStateToProps)(Search)
