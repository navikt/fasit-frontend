import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import Select from 'react-select'

import {FormString, FormList, FormSecret} from '../common/Forms'

import {showNewNodeForm} from '../../actionCreators/node'
import {submitNewNodeForm} from '../../actionCreators/node_newNodeForm'

class NewNodeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hostname: "",
            username: "",
            password: "",
            type: "",
            environment: "",
            environmentclass: "",
            zone: ""
        }
    }


    resetLocalState() {
        this.setState({
            hostname: "",
            username: "",
            password: "",
            type: "",
            environment: "",
            environmentclass: "",
            zone: ""
        })
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmitForm() {
        const {dispatch} = this.props
        const value = {
            hostname: this.state.hostname,
            username: this.state.username,
            password: {value: this.state.password},
            type: this.state.type,
            environment: this.state.environment,
            environmentclass: this.state.environmentclass,
        }
        if (!(this.state.environmentclass === 'u'))
            value["zone"] = this.state.zone
        dispatch(submitNewNodeForm(value))
    }

    closeForm() {
        const {dispatch} = this.props
        this.resetLocalState()
        dispatch(showNewNodeForm(false))
    }

    convertToSelectObject(values) {
        return values.map(value => {
            return {value: value, label: value}
        })
    }

    showSubmitButton() {
        const {hostname, username, password, type, environmentclass, environment, zone} = this.state
        if (hostname && username && password && type && environmentclass) {
            if ((environment && zone) || (environmentclass === 'u')) {
                return (
                    <button type="submit"
                            className="btn btn-primary pull-right"
                            onClick={this.handleSubmitForm.bind(this, true)}>Submit
                    </button>
                )
            }
        }
        return <button type="submit" className="btn btn-primary pull-right disabled">Submit</button>

    }

    render() {
        const {environmentClasses, showNewNodeForm, nodeTypes} = this.props
        return (
            <Modal show={showNewNodeForm} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>New node</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormString
                        label="hostname"
                        editMode={true}
                        value={this.state.hostname}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="username"
                        editMode={true}
                        value={this.state.username}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormString
                        label="password"
                        editMode={true}
                        value={this.state.password}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormList
                        label="type"
                        editMode={true}
                        value={this.state.type}
                        handleChange={this.handleChange.bind(this)}
                        options={nodeTypes}
                    />
                    <FormList
                        label="environmentclass"
                        editMode={true}
                        value={this.state.environmentclass}
                        handleChange={this.handleChange.bind(this)}
                        options={environmentClasses}
                    />
                    {this.environmentSelector()}
                    {this.zoneSelector()}
                    <div className="col-xs-12" style={{height: 15 + 'px'}}></div>
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

    environmentSelector() {
        const {environments} = this.props
        const {environmentclass} = this.state
        if (environmentclass && environmentclass !== 'u') {
            const filteredEnvironments = environments.filter((env) => {
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
        const {zones} = this.props
        const {environmentclass} = this.state
        if (environmentclass && environmentclass !== 'u') {
            return (
                <FormList
                    label="zone"
                    editMode={true}
                    value={this.state.zone}
                    handleChange={this.handleChange.bind(this)}
                    options={zones}
                />)
        }
    }

}
NewNodeForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        showNewNodeForm: state.nodes.showNewNodeForm,
        nodeTypes: state.nodes.nodeTypes,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        zones: state.environments.zones
    }
}

export default connect(mapStateToProps)(NewNodeForm)
