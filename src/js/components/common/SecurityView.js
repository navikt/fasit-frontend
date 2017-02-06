import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {checkAuthentication} from '../../utils/'


class SecurityView extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {accesscontrol, user} = this.props
        console.log(accesscontrol, "access")
        console.log(user, "user")
        const authenticated = checkAuthentication(user, accesscontrol)
        return (
            <div className="node-information-box">
                <div style={{display: "inline-block", padding:10+"px"}}>
                    {authenticated ? <i className="fa fa-2x fa-lock success"/> :
                        <i className="fa fa-2x fa-unlock danger"/>}
                </div>&emsp;&emsp;
                <div style={{display: "inline-block"}}>
                    security, dudes!
                </div>
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
