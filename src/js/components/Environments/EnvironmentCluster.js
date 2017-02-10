import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {fetchEnvironmentCluster} from "../../actionCreators/environment"
import {CollapsibleMenu, CollapsibleMenuItem, DeleteElementForm, FormString, FormList, Lifecycle, RevisionsView, ToolButtons} from "../common"
import {validAuthorization} from '../../utils/'
import {submitForm} from '../../actionCreators/common'


class EnvironmentCluster extends Component {
    constructor(props) {
        super(props)

        this.state={
            displayDeleteForm: false,
            displaySubmitForm: false,
            editMode: false,
            comment:""
        }
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
        const {cluster, user, params} = this.props
        const {editMode, displaySubmitForm, displayDeleteForm} = this.state
        let authorized = (Object.keys(cluster).length > 0) ? validAuthorization(user, cluster.data.accesscontrol) : false
        let lifecycle = (Object.keys(cluster).length > 0) ? cluster.data.lifecycle : {}
        return (cluster.isFetching) ? <i className="fa fa-spinner fa-pulse fa-2x"> </i> :
            <div>
                <div className="row">
                    {/*Heading*/}
                    <ToolButtons
                        authorized={authorized}
                        onEditClick={() => this.setState({editMode:!this.state.editMode})}
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
                        value={cluster.data.clustername}
                    />
                    <FormString
                        label="zone"
                        editMode={editMode}
                        handleChange={this.handleChange.bind(this)}
                        value={cluster.data.zone}
                    />
                    <FormList
                        label="environmentclass"
                        editMode={true}
                        value={this.state.environmentclass}
                        handleChange={this.handleChange.bind(this)}
                        options={environments.environmentClasses}
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
        const {environmentclass} = this.state
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
                    editMode={true}
                    value={this.state.environment}
                    handleChange={this.handleChange.bind(this)}
                    options={filteredEnvironments.map((env) => env.name)}
                />)
        }
    }

    zoneSelector() {
        const {environments} = this.props
        const {environmentclass} = this.state
        if (environmentclass && environmentclass !== 'u') {
            return (
                <FormList
                    label="zone"
                    editMode={true}
                    value={this.state.zone}
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