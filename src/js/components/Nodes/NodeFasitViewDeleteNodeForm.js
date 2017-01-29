import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import { deleteNode, showDeleteNodeForm } from '../../actionCreators/node'


class NodeFasitViewNewNodeForm extends Component {
    constructor(props) {
        super(props)
    }

    closeForm() {
        this.props.dispatch(showDeleteNodeForm(false))
    }
    handleDeleteNode(){
        const { dispatch, hostname } = this.props
        dispatch(deleteNode(hostname))
    }
    render() {
        const { showDeleteFasitNodeForm, hostname } = this.props
        return (
            <Modal show={showDeleteFasitNodeForm} onHide={this.closeForm.bind(this)}>
                <Modal.Header>
                    <Modal.Title>Delete node</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Going to delete node {hostname}

                    Are you sure?

                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-block">
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="submit" className="btn btn-danger pull-right"
                                    onClick={this.handleDeleteNode.bind(this)}>Delete
                            </button>
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

const mapStateToProps = (state, ownProps) => {
    return {
        hostname: ownProps.hostname,
        showDeleteFasitNodeForm: state.nodes.showDeleteFasitNodeForm
    }
}

export default connect(mapStateToProps)(NodeFasitViewNewNodeForm)
