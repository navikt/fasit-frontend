import React, {Component, PropTypes} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormString, FormDropDown, FormComment} from "../common/Forms";
import {displayModal, submitForm} from "../../actionCreators/common";

class NewNodeForm extends Component {
    constructor(props) {
        super(props)
        this.initialState()
    }

    initialState() {
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

    componentWillReceiveProps(next) {
        if (next.mode === "edit" || next.mode === "copy") {
            const {hostname, username, type, environment, environmentclass, zone} = next.node.data
            const password = next.node.currentPassword

            this.setState({
                hostname, username, type, environment, environmentclass, zone, password
            })
        }
        else {
            this.initialState()
        }
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmitForm() {
        const {dispatch, mode} = this.props
        const {hostname, username, password, type, environment, environmentclass, comment} = this.state
        const form = {
            hostname,
            username,
            password: {value: password},
            type,
            environment,
            environmentclass,
        }
        if (!(environmentclass === 'u')) {
            form["zone"] = this.state.zone
        }

        if (mode === "edit") {
            dispatch(submitForm(form.hostname, form, comment, "node"))
        }
        else {
            dispatch(submitForm(form.hostname, form, comment, "newNode"))
        }

    }

    closeForm() {
        const {dispatch} = this.props
        this.initialState()
        dispatch(displayModal("node", false))
    }

    showSubmitButton() {
        const {hostname, username, password, type, environmentclass, environment, zone} = this.state
        if (hostname && username && password && type && environmentclass && environment) {
            if ((zone) || (environmentclass === 'u')) {
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
        const {environmentClasses, showNewNodeForm, nodeTypes, mode} = this.props
        return (
            <Modal show={showNewNodeForm} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>New node
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={this.closeForm.bind(this)}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormString
                        label="hostname"
                        editMode={mode !== "edit"}
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
                    <FormDropDown
                        label="type"
                        editMode={true}
                        value={this.state.type}
                        handleChange={this.handleChange.bind(this)}
                        options={nodeTypes}
                    />
                    <FormDropDown
                        label="environmentclass"
                        editMode={mode !== "edit"}
                        value={this.state.environmentclass}
                        handleChange={this.handleChange.bind(this)}
                        options={environmentClasses}
                    />
                    {this.environmentSelector()}
                    {this.zoneSelector()}
                    <div className="col-xs-12" style={{height: 15 + 'px'}}></div>
                </Modal.Body>
                <Modal.Footer>
                    <FormComment
                        value={this.state.comment}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <br/>
                    <div className="row">
                        <div className="row col-lg-10 col-lg-offset-2">
                            {this.showSubmitButton()}
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

    environmentSelector() {
        const {environments, mode} = this.props
        const {environmentclass} = this.state
        if (environmentclass) {
            const filteredEnvironments = environments.filter((env) => {
                if (!environmentclass) {
                    return true
                } else {
                    return env.environmentclass === environmentclass
                }
            })

            return (
                <FormDropDown
                    label="environment"
                    editMode={mode !== "edit"}
                    value={this.state.environment}
                    handleChange={this.handleChange.bind(this)}
                    options={filteredEnvironments.map((env) => env.name)}
                />)
        }
    }

    zoneSelector() {
        const {zones, mode} = this.props
        const {environmentclass} = this.state
        if (environmentclass && environmentclass !== 'u') {
            return (
                <FormDropDown
                    label="zone"
                    editMode={mode !== "edit"}
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
        zones: state.environments.zones,
        node: state.node_fasit,
        mode: state.nodes.mode
    }
}

export default connect(mapStateToProps)(NewNodeForm)
