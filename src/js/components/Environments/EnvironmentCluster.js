import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {fetchEnvironmentCluster} from "../../actionCreators/environment"
import {CollapsibleMenu, CollapsibleMenuItem, FormString, Lifecycle, RevisionsView, ToolButtons} from "../common"


class EnvironmentCluster extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, params} = this.props
        if (params.environment && params.clusterName)
            dispatch(fetchEnvironmentCluster(params.environment, params.clusterName))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, params} = this.props
        if ((params.environment != nextProps.params.environment || params.clusterName != nextProps.params.clusterName) && nextProps.params.environment && nextProps.params.clusterName) {
            dispatch(fetchEnvironmentCluster(nextProps.params.environment, nextProps.params.clusterName))
        }
    }

    render() {
        const {cluster, authorized} = this.props
        let lifecycle = (Object.keys(cluster).length > 0) ? cluster.data.lifecycle : {}
        return (cluster.isFetching) ? <i className="fa fa-spinner fa-pulse fa-2x"> </i> :
            <div>
                <div className="row">
                    {/*Heading*/}
                    <ToolButtons
                        authorized={authorized}
                        onEditClick={() => this.toggleComponentDisplay("editMode")}
                        onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                        onCopyClick={() => console.log("Copy,copycopy!")}
                    />
                </div>
                {/*Form*/}
                <div className="col-md-6 ">
                    <FormString
                        label="name"
                        value={cluster.data.clustername}
                    />
                    <FormString
                        label="zone"
                        value={cluster.data.zone}
                    />
                    <FormString
                        label="environment class"
                        value={cluster.data.environment}
                    />
                    {/*Lifecycle*/}
                    <div className="col-xs-12" style={{height: 30 + "px"}}></div>

                    <div className="row">
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => console.error("you need to do something about this")}/>
                    </div>
                </div>

                {/*Side menu*/}
                <CollapsibleMenu>
                    <CollapsibleMenuItem label="History">
{/*
                        <RevisionsView id={clusterName} component="clusters"/>
*/}
                    </CollapsibleMenuItem>
                </CollapsibleMenu>
            </div>
    }
}

const mapStateToProps = (state) => {
    return {
        cluster: state.environment_cluster_fasit,

    }
}

export default connect(mapStateToProps)(EnvironmentCluster)