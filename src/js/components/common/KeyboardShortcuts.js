import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {toggleHelp} from '../../actionCreators/common'


class KeyboardShortcuts extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {dispatch, visibility} = this.props
        return (
            <Modal bsSize="small" show={visibility} onHide={() => dispatch(toggleHelp())}>
                <Modal.Header>
                    <Modal.Title>Keyboard shortcuts
                        <button
                            className="btn btn-xs btn-default pull-right"
                            onClick={() => dispatch(toggleHelp())}
                        ><i className="fa fa-times"/>
                        </button>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <kbd>Q</kbd> = Show/hide this menu<br />
                    <hr />
                    <kbd>L</kbd> + <kbd>I</kbd> = <b>L</b>og <b>I</b>n<br />
                    <kbd>L</kbd> + <kbd>O</kbd> = <b>L</b>og <b>O</b>ut<br />
                    <hr />
                    <kbd>G</kbd> + <kbd>E</kbd> = <b>G</b>o to <b>E</b>nvironment<br />
                    <kbd>G</kbd> + <kbd>A</kbd> = <b>G</b>o to <b>A</b>pplication<br />
                    <kbd>G</kbd> + <kbd>I</kbd> = <b>G</b>o to <b>I</b>nstances<br />
                    <kbd>G</kbd> + <kbd>R</kbd> = <b>G</b>o to <b>R</b>esources<br />
                    <kbd>G</kbd> + <kbd>N</kbd> = <b>G</b>o to <b>N</b>odes<br />
                    <kbd>G</kbd> + <kbd>G</kbd> = <b>G</b>o to Search<br />
                    <hr />
                    <kbd>N</kbd> + <kbd>A</kbd> = <b>N</b>ew <b>A</b>pplication<br />
                    <kbd>N</kbd> + <kbd>E</kbd> = <b>N</b>ew <b>E</b>nvironment<br />
                    <kbd>N</kbd> + <kbd>C</kbd> = <b>N</b>ew <b>C</b>luster<br />
                    <kbd>N</kbd> + <kbd>R</kbd> = <b>N</b>ew <b>R</b>esource<br />
                    <kbd>N</kbd> + <kbd>N</kbd> = <b>N</b>ew <b>N</b>ode<br />
                    <hr />
                    <kbd>C</kbd> = <b>C</b>opy <br />
                    <kbd>E</kbd> = <b>E</b>dit <br />
                    <kbd>D</kbd> = <b>D</b>elete<br />

                </Modal.Body>
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
