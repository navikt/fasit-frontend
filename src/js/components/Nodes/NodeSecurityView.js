import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class NodeSecurityView extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {authenticated, requirements} = this.props
        if (authenticated && requirements) {
            return (
                <div className="node-information-box">
                    <div className="panel panel-default">
                        <div className="panel-body node-security-border">
                            <div className="col-md-3 node-security-icon">
                                {authenticated ? <i className="fa fa-check event-ok fa-2x"/> :
                                    <i className="fa fa-exclamation-triangle event-error fa-2x"/>}
                            </div>
                            <div className="col-md-9">
                                {authenticated ?
                                    "You have access to edit this element" :
                                    "You do not have the required permissions to edit this element"}
                            </div>
                        </div>
                        <div className="panel-body">
                            <b>Restricted to:</b><br />
                            <ul>
                                <li> Env.class: <b>{requirements.environmentclass}</b></li>
                                {requirements.adgroups.length > 0 ? requirements.adgroups.map((group, i) => <li key={i}>
                                    AD group: <b>{group}</b></li>) : ""}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        return ( <div className="node-information-box"><pre>Unable to verify sercuirty requirement</pre></div>)
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
