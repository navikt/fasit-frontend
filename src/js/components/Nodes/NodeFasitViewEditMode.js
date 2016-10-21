import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import { fetchNodeTypes } from '../../actionCreators/node_types'

import { showEditNodeForm, showSubmitEditNodeForm } from '../../actionCreators/node_formActions'
import { setEditNodeFormValues, clearEditNodeForm } from '../../actionCreators/node_editNodeForm'


import NodeFasitViewSubmitForm from './NodeFasitViewSubmitForm'
import NodeFasitViewSubmitFormStatus from './NodeFasitViewSubmitFormStatus'


class NodeFasitViewEditMode extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(setEditNodeFormValues('all'))
        dispatch(fetchNodeTypes())
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(showEditNodeForm(false))
        dispatch(clearEditNodeForm())
    }

    handleFormValue(field, event) {
        const { dispatch } = this.props
    dispatch(setEditNodeFormValues(field, event.target.value))
    }

    handleSelectValue(field, value) {
        const { dispatch } = this.props
        dispatch(setEditNodeFormValues(field, value.value))
    }

    handleCancelEditMode() {
        const { dispatch } = this.props
        dispatch(showEditNodeForm(false))
    }

    handleSubmitForm(value) {
        const { dispatch } = this.props
        dispatch(showSubmitEditNodeForm(value))
    }
    convertToSelectObject(values){
        return values.map(value => {
            return {value: value, label: value}
        })
    }

    showForm() {
        const { form } = this.props
        if (Object.keys(form).length > 0) {
            return (
                <div>
                    <div className="information-main">
                        <div className="information-main-header">
                            <div className="information-main-title">
                                <span><i className="fa fa-laptop fa-fw"></i>&nbsp;&nbsp;Editing <span className="pull-right">{form.hostname}</span></span>
                            </div>
                        </div>
                        <div className="information-main-body">
                            <fieldset>
                                <div className="form-group edit-form">
                                    <label form="inputHostname" className="col-md-3 control-label edit-label">Hostname</label>
                                    <div className="col-md-9">
                                        <input id="inputHostname" className="form-control" type="text"
                                               value={form.hostname}
                                               onChange={this.handleFormValue.bind(this, "hostname")}
                                        />
                                    </div>
                                </div>
                                <div className="form-group edit-form">
                                    <label form="inputType" className="col-md-3 control-label edit-label">Type</label>
                                    <div className="col-md-9">
                                        <Select
                                            backspaceRemoves={false}
                                            clearable={false}
                                            className="select-type-dropdown"
                                            type="text"
                                            name="node-type"
                                            value={form.type}
                                            options={this.convertToSelectObject(this.props.types)}
                                            onChange={this.handleSelectValue.bind(this, "type")}

                                        />

                                    </div>
                                </div>
                                <div className="form-group edit-form">
                                    <label form="inputUsername" className="col-md-3 control-label edit-label">Username</label>
                                    <div className="col-md-9">
                                        <input id="inputHostname" className="form-control" type="text"
                                               value={form.username}
                                               onChange={this.handleFormValue.bind(this, "username")}
                                        />
                                    </div>
                                </div>
                                <div className="form-group edit-form">
                                    <label form="inputUsername" className="col-md-3 control-label edit-label">Password</label>
                                    <div className="col-md-9">
                                        <input id="inputHostname" className="form-control" type="text"
                                               value={form.password}
                                               onChange={this.handleFormValue.bind(this, "password")}
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12" style={{height:15 +'px'}}></div>
                                <div className="btn-block">
                                    <div className="col-lg-10 col-lg-offset-2">
                                        <button type="submit" className="btn btn-primary pull-right"
                                                onClick={this.handleSubmitForm.bind(this, true)}>Submit
                                        </button>
                                        <button type="reset" className="btn btn-default btn-space pull-right"
                                                onClick={this.handleCancelEditMode.bind(this)}>Cancel
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                    </div>
                </div>

            )
        }
        return <div><i className="fa fa-spinner fa-pulse fa-3x"></i></div>
    }

    render() {

        return (
            <div>
                {this.showForm()}
                <NodeFasitViewSubmitForm />
                <NodeFasitViewSubmitFormStatus />
            </div>
        )
    }
}
NodeFasitViewEditMode.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        form: state.node_editNodeForm,
        types: state.nodes.nodeTypes,
    }
}

export default connect(mapStateToProps)(NodeFasitViewEditMode)
