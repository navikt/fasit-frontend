import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import Select from 'react-select'

import { fetchNodeTypes } from '../../actionCreators/fetchNodeTypes'
import { fetchEnvironmentNames } from '../../actionCreators/fetchEnvironmentNames'
import { showNewNodeForm } from '../../actionCreators/node_formActions'
import { submitNewNodeForm, setNewNodeFormValue, clearNewNodeForm } from '../../actionCreators/node_newNodeForm'

class NodeFasitViewNewNodeForm extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchNodeTypes())
    }
    componentDidUpdate(nextProps) {
        const {dispatch, form} = this.props
        if (form.environmentclass != nextProps.form.environmentclass){
            dispatch(fetchEnvironmentNames({environmentclass: form.environmentclass}))
        }
    }
    handleSubmitForm() {
        const { form, dispatch } = this.props
        const value = {
            password: {value: form.password},
            type: form.type,
            environment: form.environment,
            environmentclass: form.environmentclass,
            hostname: form.hostname,
            username: form.username
        }
        if (!(form.environmentclass === 'u'))
            value["zone"] = form.zone
        dispatch(submitNewNodeForm(value))
    }
    closeForm() {
        const { dispatch } = this.props
        dispatch(clearNewNodeForm())
        dispatch(showNewNodeForm(false))
    }

    handleFormValue(field, event) {
        this.props.dispatch(setNewNodeFormValue(field, event.target.value))
    }

    handleSelectValue(field, value) {
        this.props.dispatch(setNewNodeFormValue(field, value.value))
    }

    convertToSelectObject(values) {
        return values.map(value => {
            return {value: value, label: value}
        })
    }
    showSubmitButton() {
        const { form } = this.props
        if (!form.environment || !form.environmentclass || !form.hostname || !form.password || !form.type || !form.username)
            return <button type="submit" className="btn btn-primary pull-right disabled">Submit</button>
        if (!(form.environmentclass === 'u') && !form.zone)
            return <button type="submit" className="btn btn-primary pull-right disabled">Submit</button>
        return (
            <button type="submit"
                    className="btn btn-primary pull-right"
                    onClick={this.handleSubmitForm.bind(this, true)}>Submit
            </button>
            )
    }
    showZoneSelector() {
        const {zones, form } = this.props
        if ( form.environmentclass && form.environmentclass !== 'u') {
            return (
                <span>
                    <label form="inputType" className="col-md-3 control-label edit-label">Zone</label>
                    <div className="col-md-9">
                        <Select
                            backspaceRemoves={false}
                            clearable={false}
                            className="select-type-dropdown"
                            type="text"
                            name="node-type"
                            value={form.zone}
                            options={this.convertToSelectObject(zones)}
                            onChange={this.handleSelectValue.bind(this, "zone")}

                        />
                    </div>
                </span>
            )

        }
    }
    showEnvironmentSelector() {
        const {environmentNames, form } = this.props
        if (form.environmentclass && environmentNames.length > 0) {
            return (
                <span>
                    <label form="inputType" className="col-md-3 control-label edit-label">Environment</label>
                    <div className="col-md-9">
                        <Select
                            backspaceRemoves={false}
                            clearable={false}
                            className="select-type-dropdown"
                            type="text"
                            name="node-type"
                            value={form.environment}
                            options={this.convertToSelectObject(environmentNames)}
                            onChange={this.handleSelectValue.bind(this, "environment")}

                        />
                    </div>
                </span>
            )

        }
    }


    render() {
        const {form, environmentClasses, showNewNodeForm, nodeTypes} = this.props
        return (
            <Modal show={showNewNodeForm} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>New node</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    options={this.convertToSelectObject(nodeTypes)}
                                    onChange={this.handleSelectValue.bind(this, "type")}

                                />
                            </div>
                            <label form="inputType" className="col-md-3 control-label edit-label">Environment
                                class</label>
                            <div className="col-md-9">
                                <Select
                                    backspaceRemoves={false}
                                    clearable={false}
                                    className="select-type-dropdown"
                                    type="text"
                                    name="node-type"
                                    value={form.environmentclass}
                                    options={this.convertToSelectObject(environmentClasses)}
                                    onChange={this.handleSelectValue.bind(this, "environmentclass")}

                                />
                            </div>
                        </div>
                        <div className="form-group edit-form">

                        </div>
                        <div className="form-group edit-form">
                            {this.showEnvironmentSelector()}
                            {this.showZoneSelector()}

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
                        <div className="col-xs-12" style={{height: 15 + 'px'}}></div>
                        <div className="btn-block">
                            <div className="col-lg-10 col-lg-offset-2">

                            </div>
                        </div>
                    </fieldset>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-block">
                        <div className="col-lg-10 col-lg-offset-2">
                            {this.showSubmitButton()}

                            <button type="reset" className="btn btn-default btn-space pull-right"
                                    onClick={this.closeForm.bind(this)}>Close
                            </button>

                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

        )
    }
}
NodeFasitViewNewNodeForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        fasitData: state.node_fasit.data,
        showNewNodeForm: state.nodeData.showNewNodeForm,
        form: state.node_newNodeForm,
        nodeTypes: state.search.nodeTypes,
        environmentClasses: state.environments.environmentClasses,
        zones: state.environments.zones,
        environmentNames: state.search.environmentNames

    }
}

export default connect(mapStateToProps)(NodeFasitViewNewNodeForm)
