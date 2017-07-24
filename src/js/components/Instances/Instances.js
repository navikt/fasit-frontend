import React, {Component} from "react";
import {connect} from "react-redux";
import ElementPaging from "../common/ElementPaging";
import ElementList from "../common/ElementList";
import Filters from "../Navigation/Filters";
import Instance from "./Instance";
import {submitFilterString} from "../../actionCreators/element_lists";

class Instances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(submitFilterString("instances", 0))
    }

    render() {
        const {instances, totalCount} = this.props

        if (this.props.params.instance)
            return <Instance id={this.props.params.instance} />
        return (
            <div className="main-content-container">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <Filters />
                    </div>
                    <div className="col-sm-3 col-sm-offset-1 col-xs-3">
                        {/*<ElementPaging />*/}
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="row element-list-container">
                        <h4>{totalCount} instances</h4>
                        <ElementList type="instances" data={instances}/>
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
        totalCount: state.instances.headers.total_count
    }
}

export default connect(mapStateToProps)(Instances)