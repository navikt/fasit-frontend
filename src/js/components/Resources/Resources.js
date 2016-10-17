import classString from 'react-classset'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Resource from './Resource'
import { fetchResourcesList, setActiveResource } from '../../actionCreators/fetchResourcesList'

class Resources extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
        dispatch(fetchResourcesList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
            dispatch(fetchResourcesList(nextProps.filters))
        }
    }
    getItemCardClass(selected){
        return classString({
            'search-result': true,
            'active': selected
        })
    }
    handleSelectResource(index) {
        this.props.dispatch(setActiveResource(index))
    }
    generateResourcesList(){
        const { resources, activeIndex } = this.props
        if (this.props.isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!resources || resources.length === 0)
            return <p>Unable to find any nodes matching your query</p>
        return resources.map((item, index)=> {
            return (
                <div key={index} onClick={this.handleSelectResource.bind(this, index)}
                     className={this.getItemCardClass(index === activeIndex)}>
                    <h4><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.alias}</h4>
                    <i className="fa fa-globe fa-fw"></i> {item.type} <b> | </b>
                </div>
            )
        })
    }

    render() {
        const resources = this.props.resources
        const activeIndex = Number.parseInt(this.props.activeIndex)

        return (
            <div>
                <div className="col-md-2">
                    {this.generateResourcesList()}

                </div>
                <div className="col-md-10">
                    {resources[activeIndex]?<Resource/>:""}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        resources: state.resources.data,
        activeIndex: state.resources.active,
        isFetching: state.resources.isFetching,
        filters: state.search.filters
    }
}

export default connect(mapStateToProps)(Resources)