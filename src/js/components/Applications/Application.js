import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils/'
import {fetchFasitData} from '../../actionCreators/application_fasit'
import {submitForm} from '../../actionCreators/submit_form'
import classString from 'react-classset'
import {FormString, FormList, FormSecret} from '../common/Forms'
import {Lifecycle, SubmitFormStatus, SubmitForm} from '../common/'

class Application extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displaySubmitForm: false,
            editMode: false,
            deleteMode: false,
        }
    }

    componentDidMount() {
        const {dispatch, name} = this.props
        dispatch(fetchFasitData(name))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.fasit.data.name,
            artifactid: nextProps.fasit.data.artifactid,
            groupid: nextProps.fasit.data.groupid,
            portoffset: nextProps.fasit.data.portoffset
        })
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props
        this.toggleComponentDisplay("displaySubmitForm")
        this.toggleComponentDisplay("editMode")
        dispatch(submitForm(key, form, comment, component))
    }

    resetLocalState() {
        const {fasit} = this.props
        this.setState({
            name: fasit.data.name,
            artifactid: fasit.data.artifactid,
            groupid: fasit.data.groupid,
            portoffset: fasit.data.portoffset
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

    arrowDirection(component) {
        return classString({
            "fa": true,
            "fa-fw": true,
            "fa-angle-right": !this.state[component],
            "fa-angle-down": this.state[component]
        })
    }

    buttonClasses(authenticated, edit) {
        return classString({
            "btn": true,
            "btn-link": true,
            "topnav-button": true,
            "topnav-button-active": this.state.editMode && edit,
            "disabled": !authenticated
        })
    }

    render() {
        const {name, fasit, user, dispatch} = this.props
        let authenticated = false
        let lifecycle = {}
        if (Object.keys(fasit.data).length > 0) {
            authenticated = checkAuthentication(user, fasit.data.accesscontrol)
            lifecycle = fasit.data.lifecycle
        }
        return (
            <div className="row">
                <div className="col-xs-12 row main-data-container">

                    {/*Heading*/}
                    <div className="col-sm-1 hidden-xs">
                        <h4><i className="fa fa-cube fa-fw"/></h4>
                    </div>
                    <div className="col-sm-3 hidden-xs FormLabel main-data-title text-overflow">
                        <strong>{name}</strong></div>
                    <div className="col-sm-2 nopadding">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated, "edit")}
                                        onClick={authenticated ? () => this.toggleComponentDisplay("editMode") : () => {
                                            }}
                                >
                                    <i className="fa fa-wrench fa-2x"/>
                                </button>
                            </li>
                            <li>
                                <button type="button"
                                        className={this.buttonClasses(authenticated)}
                                        onClick={authenticated ? () => this.toggleComponentDisplay("deleteMode") : () => {
                                            }}
                                >
                                    <i className="fa fa-trash fa-2x"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/*Form*/}
                <div className="col-md-6">
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
                                   rescueAction={() => dispatch(rescueNode(hostname))}/>
                    </div>
                </div>
                {/*Side menu*/}
                {/*Side menu*/}

                <div className="col-md-5 col-md-offset-1">
                    <div className="list-group">
                        <a className="list-group-item node-list-item"
                           onClick={() => this.toggleComponentDisplay("displayRevisions")}>
                            <i className={this.arrowDirection("displayRevisions")}/>&emsp;
                            Revisions
                        </a>
                        {this.state.displayRevisions ? <RevisionsView hostname={hostname}/> : <div />}
                    </div>
                </div>

                {/* Misc. modals*/}
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
                        name: fasit.data.name,
                        groupid: fasit.data.groupid,
                        artifactid: fasit.data.artifactid,
                        portoffset: fasit.data.portoffset,
                    }}
                    additionalValues={{}}
                />
                <SubmitFormStatus />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        fasit: state.application_fasit,
        user: state.user,
        name: ownProps.name,
        config: state.configuration,
    }
}

export default connect(mapStateToProps)(Application)
