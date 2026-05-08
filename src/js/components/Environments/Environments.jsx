import React, {useEffect} from "react";
import {connect} from "react-redux";
import EnvironmentCard from "./EnvironmentCard";
import Filters from "../Navigation/Filters";
import Environment from "./Environment";
import {submitFilterString} from "../../actionCreators/element_lists";

function Environments({ dispatch, environments, match, totalCount }) {
    useEffect(() => {
        if(!match.params.environment) {
            dispatch(submitFilterString("environments", 0))
        }
    }, [match.params.environment])

    if (match.params.environment) {
        return <Environment name={match.params.environment} clusterName={match.params.cluster}/>
    }

    return (
        <div className="main-content-container">
            <div className="row">
                <div className="col-sm-6 col-12">
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

const mapStateToProps = (state) => {
    return {
        environments: state.environments.data,
        totalCount: state.environments.headers.total_count
    }
}

export default connect(mapStateToProps)(Environments)

