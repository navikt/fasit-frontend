import React, {Component} from "react";
import {connect} from "react-redux";
import Filters from "../Navigation/Filters";
import Application from "./Application";
import ApplicationCard from "./ApplicationCard";
import {submitFilterString} from "../../actionCreators/element_lists";

class Applications extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(submitFilterString("applications", 0))
    }

    render() {
        const {applications, totalCount, isFetching} = this.props

        if (isFetching) {
            return <div className="element-list"><i className="fa fa-spinner fa-pulse fa-2x"></i></div>
        }

        if (this.props.params.application) {
            return <Application name={this.props.params.application}/>
        } else {
            return (
                <div className="main-content-container">
                    <div className="row col-sm-10">
                        <div className="col-sm-6 col-xs-12">
                            <Filters />
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <h4>{totalCount} applications</h4>
                            {applications.map((item, index) => {
                                return <ApplicationCard application={item} key={index}/>
                            })
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        applications: state.applications.data,
        totalCount: state.applications.headers.total_count,
        isFetching: state.applications.isFetching
    }
}

export default connect(mapStateToProps)(Applications)