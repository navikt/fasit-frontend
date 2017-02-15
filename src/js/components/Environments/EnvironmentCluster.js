import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {fetchEnvironmentCluster} from "../../actionCreators/environment"
import {CollapsibleMenu, CollapsibleMenuItem, DeleteElementForm, FormBox, FormString, FormList, Lifecycle, RevisionsView, ToolButtons} from "../common"
import {validAuthorization} from '../../utils/'
import {submitForm} from '../../actionCreators/common'


class EnvironmentCluster extends Component {
    constructor(props) {
        super(props)

        this.state={
            displayDeleteForm: false,
            displaySubmitForm: false,
            editMode: false,
            comment:"",
            clustername: "",
            zone: "",
            environmentclass: "",
            environment: "",
            loadbalancerurl: "",
            applications: []
        }
    }
    componentDidMount() {
        const {dispatch, params, cluster} = this.props
        console.log(cluster)
        this.setState({
            clustername: cluster.data.clustername,
            zone: cluster.data.zone,
            environmentclass: cluster.data.environmentclass,
            environment: cluster.data.environment,
            loadbalancerurl: cluster.data.loadbalancerurl,
            applications: cluster.data.applications,
            comment: ""
        })
        if (params.environment && params.clusterName)
            dispatch(fetchEnvironmentCluster(params.environment, params.clusterName))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, params} = this.props
        this.setState({
            clustername: nextProps.cluster.data.clustername,
            zone: nextProps.cluster.data.zone,
            environmentclass: nextProps.cluster.data.environmentclass,
            environment: nextProps.cluster.data.environment,
            loadbalancerurl: nextProps.cluster.data.loadbalancerurl,
            applications: nextProps.cluster.data.applications,
            comment: ""
        })
        if ((params.environment != nextProps.params.environment || params.clusterName != nextProps.params.clusterName) && nextProps.params.environment && nextProps.params.clusterName) {
            dispatch(fetchEnvironmentCluster(nextProps.params.environment, nextProps.params.clusterName))
        }
    }

    resetLocalState() {
        const {cluster} = this.props
        this.setState({
            clustername: cluster.data.clustername,
            zone: cluster.data.zone,
            environmentclass: cluster.data.environmentclass,
            environment: cluster.data.environment,
            loadbalancerurl: cluster.data.loadbalancerurl,
            applications: cluster.data.applications,
            comment: ""

        })
    }

    toggleComponentDisplay(component) {
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode)
            this.resetLocalState()

    }

    render() {
        const {cluster, user, params, environments} = this.props
        const {editMode, displaySubmitForm, clustername, zone, environmentclass, loadbalancerurl, applications} = this.state
        let authorized = (Object.keys(cluster).length > 0) ? validAuthorization(user, cluster.data.accesscontrol) : false
        let lifecycle = (Object.keys(cluster).length > 0) ? cluster.data.lifecycle : {}
        return (cluster.isFetching) ? <i className="fa fa-spinner fa-pulse fa-2x"> </i> :
            <div>
                <div className="row">
                    {/*Heading*/}
                    <ToolButtons
                        authorized={authorized}
                        onEditClick={() => this.toggleComponentDisplay("editMode")}
                        onDeleteClick={() => this.setState({displayDeleteForm: !this.state.editMode})}
                        onCopyClick={() => console.log("Copy,copycopy!")}
                    />
                </div>
                {/*Form*/}
                <div className="col-md-6 row">
                    <FormString
                        label="name"
                        editMode={editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={clustername}
                    />
                    <FormString
                        label="zone"
                        editMode={editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={zone}
                    />
                    <FormString
                        label="loadbalancerurl"
                        editMode={editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={loadbalancerurl}
                    />
                    <FormList
                        label="environmentclass"
                        editMode={editMode}
                        value={environmentclass}
                        handleChange={this.handleChange.bind(this)}
                        options={environments.environmentClasses}
                    />
                    <FormBox
                        label="Applications"
                        editMode={editMode}
                        value={this.state.applications}
                        handleChange={this.handleChange.bind(this)}
                        options={applications}
                    />
                    {this.environmentSelector()}
                    {this.zoneSelector()}
                    {/*Submit / Cancel buttons*/}
                    <br />
                    {this.state.editMode ?
                        <div className="btn-block">
                            <button type="submit" className="btn btn-sm btn-primary pull-right"
                                    onClick={() => this.setState({displaySubmitForm: !displaySubmitForm})}>Submit
                            </button>
                            <button type="reset" className="btn btn-sm btn-default btn-space pull-right"
                                    onClick={() => this.setState({editMode: !editMode})}>Cancel
                            </button>
                        </div>
                        : ""
                    }

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

                {/*Misc. modals*/}
                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.setState({displayDeleteForm: false})}
                    onSubmit={() => this.handleSubmitForm(params.clusterName, {env:params.environment}, this.state.comment, "deleteCluster")}
                    id={params.clusterName}
                    handleChange={(comment, value) => this.setState({comment: value})}
                    comment={this.state.comment}

                />
            </div>
    }
    handleSubmitForm(id, form, comment, component) {
        const {dispatch} = this.props
        if (component == "cluster") {
            this.setState({displaySubmitForm: !this.state.displaySubmitForm})
            this.setState({editMode: !this.state.editMode})
        } else if (component === "deleteCluster") {
            this.setState({displayDeleteForm: !this.state.displayDeleteForm})
            this.setState({comment: ""})
        }
        dispatch(submitForm(id, form, comment, component))
    }
    handleChange(field, value) {
        this.setState({[field]: value})
    }
    environmentSelector() {
        const {environments} = this.props
        const {environmentclass, environment, editMode} = this.state
        if (environmentclass) {
            const filteredEnvironments = environments.environments.filter((env) => {
                if (!environmentclass) {
                    return true
                } else {
                    return env.environmentclass === environmentclass
                }
            })
            return (
                <FormList
                    label="environment"
                    editMode={editMode}
                    value={environment}
                    handleChange={this.handleChange.bind(this)}
                    options={filteredEnvironments.map((env) => env.name)}
                />)
        }
    }

    zoneSelector() {
        const {environments} = this.props
        const {environmentclass, zone, editMode} = this.state
        if (environmentclass && environmentclass !== 'u') {
            return (
                <FormList
                    label="zone"
                    editMode={editMode}
                    value={zone}
                    handleChange={this.handleChange.bind(this)}
                    options={environments.zones}
                />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        environments: state.environments,
        cluster: state.environment_cluster_fasit,
        user: state.user
    }
}

export default connect(mapStateToProps)(EnvironmentCluster)