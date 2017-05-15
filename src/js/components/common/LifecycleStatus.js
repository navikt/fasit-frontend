import React, {Component, PropTypes} from 'react'

export function LifecycleStatus(props) {
    const lifecycleStatus = props.status
    if (!lifecycleStatus) {
        return null
    }
    let color
    switch (lifecycleStatus) {
        case 'alerted':
            color = 'text-warning'
            break;
        case 'stopped':
            color = 'text-danger'
            break;
        case 'rescued':
            color = 'text-success'
            break;
    }

    return (
        <div className={`${color} pull-right`}>
            <i className="fa fa-recycle fa-lg"/>&nbsp;
            <strong>{`${lifecycleStatus}`}</strong>
        </div>

    )
}

