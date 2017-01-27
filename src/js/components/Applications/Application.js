import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils/'
import {fetchFasitData} from '../../actionCreators/application_fasit'

import classString from 'react-classset'
import {FormString, FormList, FormSecret} from '../common/Forms'


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
        const {name, fasit, user} = this.props
        let authenticated = false
        if (Object.keys(fasit.data).length > 0) {
            authenticated = checkAuthentication(user, fasit.data.accesscontrol)
        }
            return(
                <div className="row">
                    <div className="col-xs-12 row main-data-container">
                        <div className="col-sm-1 hidden-xs">
                            <h4><i className="fa fa-cube fa-fw" /></h4>
                        </div>
                        <div className="col-sm-3 hidden-xs FormLabel main-data-title text-overflow">
                            <strong>{name}</strong></div>
                        <div className="col-sm-2 nopadding">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <button type="button"
                                            className={this.buttonClasses(authenticated, "edit")}
                                            onClick={authenticated ? () => this.toggleComponentDisplay("editMode") : () => {}}
                                    >
                                        <i className="fa fa-wrench fa-2x"/>
                                    </button>
                                </li>
                                <li>
                                    <button type="button"
                                            className={this.buttonClasses(authenticated)}
                                            onClick={authenticated ? () => this.toggleComponentDisplay("deleteMode") : () => {}}
                                    >
                                        <i className="fa fa-trash fa-2x"/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <FormString
                            label="name"
                            editMode={this.state.editMode}
                            value={this.state.name}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <FormString
                            label="artifact Id"
                            editMode={this.state.editMode}
                            value={this.state.artifactid}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <FormString
                            label="group Id"
                            editMode={this.state.editMode}
                            value={this.state.groupid}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <FormString
                            label="port offset"
                            editMode={this.state.editMode}
                            value={this.state.portoffset}
                            handleChange={this.handleChange.bind(this)}
                        />
                        <br />
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
                    </div>
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
