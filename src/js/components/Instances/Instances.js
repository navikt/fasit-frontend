import React, { Component } from "react";
import { connect } from "react-redux";
import ElementPaging from "../common/ElementPaging";
import InstanceCard from "./InstanceCard";
import Filters from "../Navigation/Filters";
import Instance from "./Instance";
import { submitFilterString } from "../../actionCreators/element_lists";

class Instances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(submitFilterString("instances", 0))
    }

    render() {
        const { instances, totalCount, isFetching , params } = this.props

        if (params.instance)
            return <Instance id={params.instance} />
        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <Filters />
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row">
                        <h4>{totalCount} instances</h4>
                        {instances.map((item, index) => <InstanceCard instance={item} key={index} />)}
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
        instances: state.instances.data,
        totalCount: state.instances.headers.toal_count,
        isFetching: state.instances.isFetching
    }
}

export default connect(mapStateToProps)(Instances)