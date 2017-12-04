import React, { Component } from "react";
import { connect } from "react-redux";
import EnvironmentCard from "./EnvironmentCard";
import Filters from "../Navigation/Filters";
import Environment from "./Environment";
import { submitFilterString } from "../../actionCreators/element_lists";

class Environments extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(submitFilterString("environments", 0))
    }

    render() {
        const { environments, params, totalCount } = this.props

        if (params.environment)
            return <Environment name={params.environment} clusterName={params.cluster} />
        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <Filters  />
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row">
                        <h4>{totalCount} environments</h4>
                        {environments.map((item, index) => {
                            return <EnvironmentCard environment={item} key={index} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        environments: state.environments.data,
        totalCount: state.environments.headers.total_count
    }
}

export default connect(mapStateToProps)(Environments)

