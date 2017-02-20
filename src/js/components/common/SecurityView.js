import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {validAuthorization} from '../../utils/'


class SecurityView extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {accesscontrol, user, displayAccessControlForm} = this.props
        const authorized = validAuthorization(user, accesscontrol)
        return (
            <div className="collapsible-menu-content-container">
                {authorized ?
                    <h3 style={{marginTop: 1 + "px"}}>
                        <small>
                            <i className="fa fa-fw fa-unlock text-success" style={{marginRight:15+"px"}}/>{"You've got access"}
                        </small>
                    </h3> :
                    <h3 style={{marginTop: 1 + "px"}}>
                        <small>
                            <i className="fa fa-fw fa-lock text-danger" style={{marginRight:15+"px"}}/>{"You're not authorized"}
                        </small>
                    </h3>}
                    <pre style={{marginTop: 15 + "px", width: 80 + "%"}}>
                        <b>Requirements</b>
                        <ul>
                            <li>Environment class: <b>{accesscontrol.environmentclass}</b></li>
                            {accesscontrol.adgroups.length > 0 ?
                                accesscontrol.adgroups.map((g, i) => <li key={i}>AD-group: <b>{g}</b></li>) : null
                            }
                        </ul>
                    </pre>
                {authorized ? <button className="btn btn-sm btn-default" onClick={displayAccessControlForm}><i className="fa fa-fw fa-user" style={{marginRight:5}}/>Access control</button> : null}
            </div>
        )
    }
}

SecurityView.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SecurityView)
