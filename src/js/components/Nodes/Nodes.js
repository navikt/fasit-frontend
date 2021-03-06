import React, { Component } from "react";
import { connect } from "react-redux";
import NodeCard from "./NodesCard";
import ElementPaging from "../common/ElementPaging";
import Filters from "../Navigation/Filters";
import Node from "./Node";
import { submitFilterString } from "../../actionCreators/element_lists";

class Nodes extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch, params } = this.props
        if (!params.node) {
            dispatch(submitFilterString("nodes", 0))
        }
    }

    render() {
        const { nodes, totalCount, params } = this.props


        if (params.node) {
            return <Node hostname={params.node} />
        }

        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <Filters />
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row">
                        <h4>{totalCount} nodes</h4>
                        {nodes.map((item, index) => <NodeCard node={item} key={index} />)}
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
        nodes: state.nodes.data,
        totalCount: state.nodes.headers.total_count,
        isFetching: state.nodes.isFetching
    }
}

export default connect(mapStateToProps)(Nodes)