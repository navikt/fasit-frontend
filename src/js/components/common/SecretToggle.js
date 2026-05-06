import React from 'react'
import Button from '@mui/material/Button'
import { validAuthorization } from "../../utils"
import Chip from "@mui/material/Chip"
import Lock from "@mui/icons-material/Lock"
import { icons, styles } from "../../commonStyles/commonInlineStyles"
import { displayLogin } from "../../actionCreators/authentication";

export default function SecretToggle(props) {
    const { user, accesscontrol, toggleHandler, secretVisible, dispatch } = props
    const authorized = validAuthorization(user, accesscontrol)
    if (authorized) {
        return <Button variant="text" disableRipple={true} style={styles.flatButton} className={"pull-right"}
            startIcon={icons.eye} onClick={toggleHandler}>{secretVisible ? "Hide secret" : "View secret"}</Button>
    } else {
        return (<Chip className="pull-right chip"
            icon={<Lock />}
            label={!user.authenticated ? "Log in to view secrets" : "Secrets require superuser access"}
            onClick={() => dispatch(displayLogin(true))}
        />)
    }
}