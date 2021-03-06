import React, {Component} from "react";
import {connect} from "react-redux";
import ResourceCard from "./ResourceCard";
import ElementPaging from "../common/ElementPaging";
import Filters from "../Navigation/Filters";
import Resource from "./Resource";
import {submitFilterString} from "../../actionCreators/element_lists";

class Resources extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, params} = this.props
        if(!params.resource) {
            dispatch(submitFilterString("resources", 0))
        }
    }


    render() {
        const {resources, totalCount, params} = this.props

        if (params.resource) {
            return <Resource id={params.resource}/>
        }
        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-12">
                        <Filters />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <h4>{totalCount} resources</h4>
                        {resources.map((item, index)=> {
                                return <ResourceCard resource={item} key={index}/>
                            })
                        }
                        <div className="col-sm-2 pull-right">
                            <ElementPaging />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    return {
        resources: state.resources.data,
        totalCount: state.resources.headers.total_count,
        isFetching: state.resources.isFetching,
        location: state.routing.locationBeforeTransitions
    }
}

export default connect(mapStateToProps)(Resources)