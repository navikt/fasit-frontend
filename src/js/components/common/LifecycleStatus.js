import React, {Component, PropTypes} from 'react'
import Restore from 'material-ui/svg-icons/action/restore'
import {colors, styles} from '../../commonStyles/commonInlineStyles'

export function LifecycleStatus(props) {
    const lifecycleStatus = props.status
    if (!lifecycleStatus) {
        return null
    }
    let color

    switch (lifecycleStatus) {
        case 'alerted':
            color = colors.orange
            break;
        case 'stopped':
            color = colors.red

            break;
        case 'rescued':
            color = colors.green
            break;
    }

    const stylesToApply = Object.assign(styles.valign, styles.bold, {color})

    return (
        <div className="pull-right" style={stylesToApply}>
            <Restore color={color}/> &nbsp;{`${lifecycleStatus}`}
        </div>

    )
}