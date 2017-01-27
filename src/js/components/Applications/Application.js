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
        }
    }

    componentDidMount() {
        const {dispatch, name} = this.props
        dispatch(fetchFasitData(name))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hostname: nextProps.fasit.data.hostname,
            username: nextProps.fasit.data.username,
            type: nextProps.fasit.data.type,
            password: nextProps.fasit.currentPassword
        })
    }

    resetLocalState() {
        const {fasit} = this.props
        this.setState({
            hostname: fasit.data.hostname,
            username: fasit.data.username,
            type: fasit.data.type,
            password: ""
        })
    }

    toggleDisplaySecret() {
        const {dispatch} = this.props
        if (this.state.displaySecret)
            dispatch(fetchApplicationPassword())
        dispatch(clearApplicationPassword())
        this.setState({displaySecret: !this.state.displaySecret})


    }

    toggleComponentDisplay(component) {
        const {dispatch} = this.props
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode)
            this.resetLocalState()
        if (component === "editMode" && !this.state.editMode)
            dispatch(fetchApplicationPassword())


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
