import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {FormString, FormList, FormComment} from '../common/Forms'

import {showNewComponentForm} from '../../actionCreators/common'
import {submitForm} from '../../actionCreators/common'

class NewClusterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clustername: "",
            environment: "",
            environmentclass: "",
            zone: "",
            comment: ""
        }
    }


    resetLocalState() {
        this.setState({
            clustername: "",
            environment: "",
            environmentclass: "",
            zone: "",
            comment: ""
        })
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmitForm() {
        const {dispatch} = this.props
        const {clustername, environment, environmentclass, zone, comment} = this.state
        const form = {
            clustername,
            environment,
            environmentclass,
            zone,
            comment
        }
        dispatch(submitForm(form.clustername, form, comment, "newCluster"))
    }

    closeForm() {
        const {dispatch} = this.props
        this.resetLocalState()
        dispatch(showNewComponentForm("cluster", false))
    }

    showSubmitButton() {
        const {clustername, environment, environmentclass, zone} = this.state
        if (clustername && environment && environmentclass && zone) {
            return (
                <button type="submit"
                        className="btn btn-primary pull-right"
                        onClick={this.handleSubmitForm.bind(this, true)}>Submit
                </button>
            )
        }
        return <button type="submit" className="btn btn-primary pull-right disabled">Submit</button>

    }

    render() {
        const {environments} = this.props
        return (
            <Modal show={environments.showNewClusterForm} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>New cluster
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={this.closeForm.bind(this)}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormString
                        label="clustername"
                        editMode={true}
                        value={this.state.clustername}
                        handleChange={this.handleChange.bind(this)}
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
                    <div className="col-xs-12" style={{height: 15}}></div>
                </Modal.Body>
                <Modal.Footer>
                    <FormComment
                        value={this.state.comment}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <br />
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


NewClusterForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        environments: state.environments,
    }
}

export default connect(mapStateToProps)(NewClusterForm)