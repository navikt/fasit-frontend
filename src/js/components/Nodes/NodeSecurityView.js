import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'


class NodeSecurityView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-lg-4 col-lg-offset-4 col-md-6">
                <div className="information-box">
                    <div className="information-box-header">
                        <div className="information-box-title text-overflow">
                            <span><i className="fa fa-lock"></i><span className="hidden-md">&nbsp;&nbsp;Security</span></span>
                        </div>
                    </div>
                    <div className="information-box-body text-center">
                        <div className><i className="fa fa-check fa-3x event-ok"/></div>
                    </div>
                    <div className="information-box-footer">
                        You have access based on the following rules
                    </div>
                </div>
            </div>
        )
    }
}

Node.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        fasit: state.nodeData.fasit,
        user: state.user,
        secret: state.nodeData.currentNodeSecret,
    }
}

export default connect(mapStateToProps)(NodeSecurityView)
