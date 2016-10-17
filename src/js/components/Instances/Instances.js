import classString from 'react-classset'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Instance from './Instance'
import { fetchInstancesList, setActiveInstance } from '../../actionCreators/fetchInstancesList'

class Instances extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { dispatch, filters } = this.props
        dispatch(fetchInstancesList(filters))
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, filters } = this.props
        if (filters != nextProps.filters) {
            dispatch(fetchInstancesList(nextProps.filters))
        }
    }
    getItemCardClass(selected){
        return classString({
            'search-result': true,
            'active': selected
        })
    }
    handleSelect(index) {
        this.props.dispatch(setActiveInstance(index))
    }
    generateInstancesList(){
        const { instances, activeIndex } = this.props
        if (this.props.isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!instances || instances.length === 0)
            return <p>Unable to find any instances matching your query</p>
        return instances.map((item, index)=> {
            return (
                <div key={index} onClick={this.handleSelect.bind(this, index)}
                     className={this.getItemCardClass(index === activeIndex)}>
                    <h4><i className="fa fa-laptop fa-fw"></i> &nbsp;{item.application}</h4>
                    <i className="fa fa-globe fa-fw"></i> {item.environment} <b> | </b>
                    {item.cluster ? item.cluster.name : ""}
                </div>
            )
        })
    }

    render() {
        const instances = this.props.instances
        const activeIndex = Number.parseInt(this.props.activeIndex)
        return (
            <div>
                <div className="col-md-2">
                    {this.generateInstancesList()}

                </div>
                <div className="col-md-7">
                    {instances[activeIndex]?<Instance/>:""}
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Todo:
                        </div>
                        <div className="panel-body">
                            <ul>
                                <li>hvilken app</li>
                                <li>hvilke noder kjører den på</li>
                                <li>ressurser brukt</li>
                                <li>ressurser eksponert</li>
                                <li>hvem er konsumentene mine?</li>
                                <li>miljø</li>
                                <li>versjon</li>
                                <li>grafana</li>
                                <li>lenke til rapporter</li>
                                <li>deployer?</li>
                                <li>tidspunkt for deploy</li>
                                <li>kostnader? ("hvor mye koster pesys i prod?")</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        instances: state.instances.data,
        activeIndex: state.instances.active,
        isFetching: state.instances.isFetching,
        filters: state.search.filters
    }
}

export default connect(mapStateToProps)(Instances)