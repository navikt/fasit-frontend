import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import Select from 'react-select'

import { fetchNodeTypes } from '../../actionCreators/node_types'
import { fetchEnvironmentNames } from '../../actionCreators/environment_names'
import { showNewNodeForm } from '../../actionCreators/node_formActions'
import { submitNewNodeForm, setNewNodeFormValue, clearNewNodeForm } from '../../actionCreators/node_newNodeForm'

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {showLogin} = this.props
        return (
            <Modal show={showLogin} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label form="name" className="control-label">Adeo-ident</label>
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="x123456"
                                value={this.state.username}
                                onChange={this.handleChange.bind(this, "username")}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label form="password" className="control-label">Password</label>
                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="fa fa-lock fa-lg"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange.bind(this, "password")}
                            />
                        </div>
                    </div>

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
Login.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        showNewNodeForm: state.nodes.showNewNodeForm,
    }
}

export default connect(mapStateToProps)(Login)
