import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {validAuthorization, oldRevision} from '../../utils/'
import {fetchFasitData} from '../../actionCreators/application'
import {submitForm} from '../../actionCreators/common'
import ApplicationInstances from './ApplicationInstances'
import {DeleteElementForm, SecurityView, ToolButtons, AccessControl} from '../common/'

import {
    CollapsibleMenu,
    CollapsibleMenuItem,
    CurrentRevision,
    FormString,
    Lifecycle,
    RevisionsView,
    SubmitForm
} from '../common/'

class Application extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displaySubmitForm: false,
            displayDeleteForm: false,
            displayAccessControlForm: false,
            editMode: false,
            adgroups: [],
            comment: ""
        }
    }

    componentDidMount() {
        const {dispatch, name, query} = this.props
        dispatch(fetchFasitData(name, query.revision))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, name, query} = this.props
        this.setState({
            name: nextProps.application.data.name,
            artifactid: nextProps.application.data.artifactid,
            groupid: nextProps.application.data.groupid,
            portoffset: nextProps.application.data.portoffset,
            comment: ""
        })
        if (Object.keys(nextProps.application.data).length > 0) {
            this.setState({adgroups: nextProps.application.data.accesscontrol.adgroups})
        }
        if (nextProps.query.revision != query.revision) {
            dispatch(fetchFasitData(name, nextProps.query.revision))
        }
        if (nextProps.name != name) {
            dispatch(fetchFasitData(nextProps.name, nextProps.query.revision))
        }
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props
        if (component == "application" && this.state.displaySubmitForm) {
            this.toggleComponentDisplay("displaySubmitForm")
            this.toggleComponentDisplay("editMode")
        } else if (component === "deleteApplication") {
            this.toggleComponentDisplay("displayDeleteForm")
            this.setState({comment: ""})
        } else if (component === "application" && this.state.displayAccessControlForm) {
            this.toggleComponentDisplay("displayAccessControlForm")
        }
        dispatch(submitForm(key, form, comment, component))
    }

    resetLocalState() {
        const {application} = this.props
        this.setState({
            name: application.data.name,
            artifactid: application.data.artifactid,
            groupid: application.data.groupid,
            portoffset: application.data.portoffset
        })
    }

    toggleComponentDisplay(component) {
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode)
            this.resetLocalState()

    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    render() {
        const {name, application, user, dispatch, query, revisions} = this.props
        const {comment, adgroups} = this.state
        const showRevision = oldRevision(revisions, query.revision)
        let lifecycle = {}
        let authorized = false

        if (Object.keys(application).length > 0) {
            authorized = validAuthorization(user, application.data.accesscontrol)
            lifecycle = application.lifecycle
        }
        return (
            <div className="row">
                {/*Heading*/}
                {showRevision ?
                    <CurrentRevision revisionId={query.revision} revisions={revisions}/>
                    : <ToolButtons
                        authorized={authorized}
                        onEditClick={() => this.toggleComponentDisplay("editMode")}
                        onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                        onCopyClick={() => console.log("Copy,copycopy!")}
                        editMode={this.state.editMode}
                    />
                }

                {/*Form*/}
                <div className={showRevision ? "col-md-6 disabled-text-color" : "col-md-6"}>
                    <FormString
                        label="name"
                        editMode={this.state.editMode}
                        value={this.state.name}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="artifactid"
                        editMode={this.state.editMode}
                        value={this.state.artifactid}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="groupid"
                        editMode={this.state.editMode}
                        value={this.state.groupid}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="portoffset"
                        editMode={this.state.editMode}
                        value={this.state.portoffset}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <br />

                    {/*Submit / Cancel buttons*/}
                    {this.state.editMode ?
                        <div className="btn-block">
                            <button type="submit" className="btn btn-sm btn-primary pull-right"
                                    onClick={() => this.toggleComponentDisplay("displaySubmitForm")}>Submit
                            </button>
                            <button type="reset" className="btn btn-sm btn-default btn-space pull-right"
                                    onClick={() => this.toggleComponentDisplay("editMode")}>Cancel
                            </button>
                        </div>
                        : ""
                    }

                    {/*Lifecycle*/}
                    <div className="row">
                        <Lifecycle lifecycle={lifecycle}
                                   rescueAction={() => dispatch(rescueApplication(name))}
                                   authorized={authorized}/>
                    </div>
                    <ApplicationInstances name={name}/>

                </div>
                {/*Side menu*/}

                <CollapsibleMenu>
                    <CollapsibleMenuItem label="History" defaultExpanded={true}>
                        <RevisionsView id={name} currentRevision={query.revision} component="application"/>
                    </CollapsibleMenuItem>
                    <CollapsibleMenuItem label="Security">
                        <SecurityView accesscontrol={application.data.accesscontrol}
                                      displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                    </CollapsibleMenuItem>
                </CollapsibleMenu>

                {/* Misc. modals*/}
                <AccessControl
                    displayAccessControlForm={this.state.displayAccessControlForm}
                    onClose={() => this.toggleComponentDisplay("displayAccessControlForm")}
                    onSubmit={() => this.handleSubmitForm(name, {
                            name: application.data.name,
                            groupid: application.data.groupid,
                            artifactid: application.data.artifactid,
                            portoffset: application.data.portoffset,
                            accesscontrol: {adgroups}
                        }
                        , comment, "application")}
                    id={name}
                    value={adgroups}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}
                />
                <SubmitForm
                    display={this.state.displaySubmitForm}
                    onSubmit={(key, form, comment, component) => this.handleSubmitForm(key, form, comment, component)}
                    onClose={() => this.toggleComponentDisplay("displaySubmitForm")}
                    component="application"
                    newValues={{
                        name: this.state.name,
                        groupid: this.state.groupid,
                        artifactid: this.state.artifactid,
                        portoffset: this.state.portoffset,

                    }}
                    originalValues={{
                        name: application.data.name,
                        groupid: application.data.groupid,
                        artifactid: application.data.artifactid,
                        portoffset: application.data.portoffset,
                    }}
                    additionalValues={{}}
                />
                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onSubmit={() => this.handleSubmitForm(name, null, comment, "deleteApplication")}
                    id={name}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}
                />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        application: state.application_fasit,
        user: state.user,
        name: ownProps.name,
        config: state.configuration,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

export default connect(mapStateToProps)(Application)
