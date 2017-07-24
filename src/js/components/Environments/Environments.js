import React, {Component} from "react";
import {connect} from "react-redux";
import ElementList from "../common/ElementList";
import Filters from "../Navigation/Filters";
import Environment from "./Environment";
import {submitFilterString} from "../../actionCreators/element_lists";

class Environments extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(submitFilterString("environments", 0))
    }

    render() {
        const {environments, params} = this.props
        if (this.props.params.environment)
            return <Environment name={params.environment} clusterName={params.cluster} />
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
                        <h4>{environments.headers.total_count} environments</h4>
                        <ElementList type="environments" data={environments}/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        environments: state.environments,
    }
}

export default connect(mapStateToProps)(Environments)

