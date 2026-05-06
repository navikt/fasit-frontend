import React from 'react'
import {styles} from '../../commonStyles/commonInlineStyles'
import Button from '@mui/material/Button'

export default function WebsphereManagementConsole(props) {
    const hostname = props.hostname
    const url = `https://${hostname}:9043/ibm/console`

    return (
        <a href={url} target="new">
            <Button
                variant="text"
                disableRipple={true}
                style={styles.flatButton}
            >Admin console</Button>
        </a>
    )
}

