import React, {Component} from "react";
import {connect} from "react-redux";
import ElementPaging from "../common/ElementPaging";
import InstanceCard from "./InstanceCard";
import Filters from "../Navigation/Filters";
import Instance from "./Instance";
import {submitFilterString} from "../../actionCreators/element_lists";

class Instances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch, match } = this.props
        if(!match.params.instance) {
            dispatch(submitFilterString("instances", 0))
        }
    }

    render() {
        const { instances, totalCount, match } = this.props

        if (match.params.instance)
            return <Instance id={match.params.instance} />
        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <Filters />
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row">
                        <h4>{totalCount} instances</h4>
                        {instances.map((item, index) => <InstanceCard instance={item} key={index} />)}
                        <div className="col-sm-2 ms-auto">
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