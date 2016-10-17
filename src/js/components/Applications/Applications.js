import React, {Component, PropTypes} from 'react'
import classString from 'react-classset'

import Application from './Application'
import {connect} from 'react-redux'
import { fetchApplicationsList, setActiveApplication } from '../../actionCreators/fetchApplicationsList'

class Applications extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
        dispatch(fetchApplicationsList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch, filters} = this.props
        if (filters != nextProps.filters)
            dispatch(fetchApplicationsList(nextProps.filters))
    }

    fetchApplications(){
        return [{"name": "OpenAM", "gid": "no.nav.esso", "aid": "openam"},
            {"name": "a-inntekt", "gid": "no.nav", "aid": "a-inntekt"},
            {"name": "aareg-core", "gid": "no.nav.aareg-core", "aid": "aareg-core-config"},
            {"name": "aareg-splitter", "gid": "no.nav.aareg-splitter", "aid": "aareg-splitter-config"}]
    }
    getItemCardClass(selected){
        return classString({
            'search-result': true,
            'active': selected
        })
    }
    handleSelectApplication(index) {
        this.props.dispatch(setActiveApplication(index))
    }
    generateApplicationsList(){
        const { applications, activeIndex } = this.props
        if (this.props.isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!applications || applications.length === 0)
            return <p>Unable to find any nodes matching your query</p>
        return applications.map((item, index)=> {
            return (
                <div key={index} onClick={this.handleSelectApplication.bind(this, index)}
                     className={this.getItemCardClass(index === activeIndex)}>
                    <h4><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.name}</h4>
                    <i className="fa fa-globe fa-fw"></i> {item.groupid}
                </div>
            )
        })
    }
    render() {
        const applications = this.props.applications
        const activeIndex = Number.parseInt(this.props.activeIndex)
        return (
            <div>
                <div className="col-md-2">
                    {this.generateApplicationsList()}
                </div>
                <div className="col-md-10">
                    {applications[activeIndex]?<Application/>:""}

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        applications: state.applications.data,
        activeIndex: state.applications.active,
        filters: state.search.filters,
        isFetching: state.applications.isFetching
    }
}

export default connect(mapStateToProps)(Applications)