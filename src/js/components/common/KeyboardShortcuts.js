import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import { displayModal } from '../../actionCreators/common'


class KeyboardShortcuts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {dispatch, visibility} = this.props
            return (
                <Modal bsSize="small" show={visibility} onHide={() => dispatch(displayModal("shortcuts", false))}>
                    <Modal.Header>
                        <Modal.Title>Keyboard shortcuts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="keyboardButton">X</div>

                        <pre>wunderbar</pre>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="close" className="btn btn-default btn-space pull-right"
                                onClick={() => dispatch(displayModal("shortcuts", false))}>Close
                        </button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
KeyboardShortcuts.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        visibility: state.navsearch.displayShortcuts,
    }
}

export default connect(mapStateToProps)(KeyboardShortcuts)
