import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { validAuthorization } from "../../utils"
import Chip from "material-ui/Chip"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { displayLogin } from "../../actionCreators/authentication";

export default function SecretToggle(props) {
    const { user, accesscontrol, toggleHandler, secretVisible, dispatch } = props
    const authorized = validAuthorization(user, accesscontrol)
    if (authorized) {
        return <FlatButton disableTouchRipple={true} style={styles.flatButton} className={"pull-right"}
            label={secretVisible ? "Hide secret" : "View secret"}
            icon={icons.eye} onTouchTap={toggleHandler} />
    } else {
        return (<Chip className="pull-right chip" onClick={() => dispatch(displayLogin(true))}>
            {icons.lockAvatar} {!user.authenticated ? "Log in to view secrets" : "Secrets require superuser access"}
        </Chip>)
    }
}