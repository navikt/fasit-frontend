import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {FormString, FormDropDown, FormComment} from '../common/Forms'

import {showNewComponentForm} from '../../actionCreators/common'
import {submitForm} from '../../actionCreators/common'

class NewEnvironmentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            environmentclass: "",
            comment: ""
        }
    }


    resetLocalState() {
        this.setState({
            name: "",
            environmentclass: "",
            comment: ""
        })
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    handleSubmitForm() {
        const {dispatch} = this.props
        const {name, environmentclass, comment} = this.state
        const form = {
            name,
            environmentclass,
        }
        dispatch(submitForm(form.name, form, comment, "newEnvironment"))
    }

    closeForm() {
        const {dispatch} = this.props
        this.resetLocalState()
        dispatch(showNewComponentForm("environment", false))
    }

    showSubmitButton() {
        const {name, environmentclass} = this.state
        if (name && environmentclass) {
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
        const {environmentClasses, showNewEnvironmentForm} = this.props
        return (
            <Modal show={showNewEnvironmentForm} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>New environment
                        <button type="reset" className="btn btn-link pull-right"
                                onClick={this.closeForm.bind(this)}><strong>X</strong>
                        </button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormString
                        label="name"
                        editMode={true}
                        value={this.state.name}
                        handleChange={this.handleChange.bind(this)}
                    />
                    <FormDropDown
                        label="environmentclass"
                        editMode={true}
                        value={this.state.environmentclass}
                        handleChange={this.handleChange.bind(this)}
                        options={environmentClasses}
                    />
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
}
NewEnvironmentForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        showNewEnvironmentForm: state.environments.showNewEnvironmentForm,
        environmentClasses: state.environments.environmentClasses,
        environments: state.environments.environments,
        zones: state.environments.zones
    }
}

export default connect(mapStateToProps)(NewEnvironmentForm)
