import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {validAuthorization} from '../../utils/'


class SecurityView extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {accesscontrol, user} = this.props
        const authenticated = validAuthorization(user, accesscontrol)
        return (
            <div className="node-information-box">
                    <pre style={{marginTop:5+"px", width:70+"%"}}>
                        <b>Requirements</b>
                        <ul>
                            <li>Environment class: <b>{accesscontrol.environmentclass}</b></li>
                            {accesscontrol.adgroups.length > 0 ?
                                accesscontrol.adgroups.map((g, i) => <li key={i}>AD-group: {g}</li>) : null
                            }
                        </ul>
                        </pre>
                    {!authenticated ? <i className="fa fa-fw fa-unlock text-success"/> :
                        <div ><h4><i className="fa fa-fw fa-lock text-danger"/>Not logged in, no acccess</h4></div>}
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
