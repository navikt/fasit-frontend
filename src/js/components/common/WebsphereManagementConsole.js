import React from 'react'
import {styles} from '../../commonStyles/commonInlineStyles'
import FlatButton from 'material-ui/FlatButton'

export default function WebsphereManagementConsole(props) {
    const hostname = props.hostname
    const url = `https://${hostname}:9043/ibm/console`

    return (
        <a href={url} target="new">
            <FlatButton
                disableTouchRipple={true}
                label="Admin console"
                style={styles.flatButton}
            />
        </a>
    )
}

