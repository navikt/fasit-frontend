import React, {useEffect} from "react";
import {connect} from "react-redux";
import ResourceCard from "./ResourceCard";
import ElementPaging from "../common/ElementPaging";
import Filters from "../Navigation/Filters";
import Resource from "./Resource";
import {submitFilterString} from "../../actionCreators/element_lists";

function Resources({ dispatch, resources, totalCount, match }) {
    useEffect(() => {
        if(!match.params.resource) {
            dispatch(submitFilterString("resources", 0))
        }
    }, [match.params.resource])

    if (match.params.resource) {
        return <Resource id={match.params.resource}/>
    }
    return (
        <div className="main-content-container">
            <div className="row">
                <div className="col-sm-12">
                    <Filters />
                </div>
            </div>
            <div className="col-sm-10">
                <div className="row">
                    <h4>{totalCount} resources</h4>
                    {resources.map((item, index)=> {
                            return <ResourceCard resource={item} key={index}/>
                        })
                    }
                    <div className="col-sm-2 ms-auto">
                        <ElementPaging />
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        resources: state.resources.data,
        totalCount: state.resources.headers.total_count,
        isFetching: state.resources.isFetching,
        location: state.router.location
    }
}

export default connect(mapStateToProps)(Resources)