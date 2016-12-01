import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class NodeSecurityView extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {authenticated} = this.props
        return (
                <div className="information-box">
                    <div className="information-box-header">
                        <div className="information-box-title text-overflow">
                            <span><i className="fa fa-lock"></i><span className="hidden-md">&nbsp;&nbsp;Security</span></span>
                        </div>
                    </div>
                    <div className="information-box-body text-center">
                        {authenticated ? <div className><i className="fa fa-check fa-3x event-ok"/></div> : <div className><i className="fa fa-exclamation-triangle fa-3x event-error"/></div>}
                    </div>
                    <div className="information-box-footer text-center">
                        {authenticated ? <div className>You have access to edit this element</div> : <div className>You do not have the required permissions to edit this element</div>}
                    </div>

                </div>
        )
    }
}

Node.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: ownProps.authenticated
    }
}

export default connect(mapStateToProps)(NodeSecurityView)
