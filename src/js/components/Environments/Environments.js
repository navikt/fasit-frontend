import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import classString from 'react-classset'
import moment from 'moment'
import Environment from './Environment'

import {fetchEnvironmentsList, setActiveEnvironment} from '../../actionCreators/fetchEnvironmentsList'

class Environemnts extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, filters} = this.props
        dispatch(fetchEnvironmentsList(filters))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, filters} = this.props
        if (filters != nextProps.filters) {
            dispatch(fetchEnvironmentsList(nextProps.filters))


        }
    }

    getItemCardClass(selected){
        return classString({
            'search-result': true,
            'active': selected
        })
    }
    handleSelectEnvironment(index) {
        this.props.dispatch(setActiveEnvironment(index))
    }
    generateEnvironmentsList(){
        const { environments, activeIndex } = this.props
        if (this.props.isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!environments || environments.length === 0)
            return <p>Unable to find any environments matching your query</p>
        return environments.map((item, index)=> {
            return (
                <div key={index} onClick={this.handleSelectEnvironment.bind(this, index)}
                     className={this.getItemCardClass(index === activeIndex)}>
                    <h4><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.name}</h4>
                    <i className="fa fa-globe fa-fw"></i> {item.environmentclass} <b> | </b>
                    {moment(item.created).format('ll')}
                </div>
            )
        })
    }

    render() {
        const environments = this.props.environments
        const activeIndex = Number.parseInt(this.props.activeIndex)
        return (
            <div>
                <div className="col-md-2">
                    {this.generateEnvironmentsList()}

                </div>
                <div className="col-md-10">
                    {environments[activeIndex]?<Environment/>:""}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        environments: state.environments.data,
        activeIndex: state.environments.active,
        isFetching: state.environments.isFetching,
        filters: state.search.filters
    }
}

export default connect(mapStateToProps)(Environemnts)

