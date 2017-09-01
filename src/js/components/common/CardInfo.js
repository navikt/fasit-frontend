import React, {Component, PropTypes} from "react";
import Restore from "material-ui/svg-icons/action/restore";
import {colors} from "../../commonStyles/commonInlineStyles";
import Chip from "material-ui/Chip";
import {capitalize} from "../../utils/";
import Avatar from "material-ui/Avatar";
import moment from "moment";

export function CardInfo(props) {
    moment.locale("en")
    const {lastUpdated, lifecycle} = props
    return (
        <div className="pull-right col-md-5">
            <LifecycleChip lifecycle={lifecycle}/>
            <div className="col-md-7 text-muted pull-right" style={{paddingTop: "6px"}}>
                Changed {moment(lastUpdated).fromNow()}</div>
        </div>
    )
}

function LifecycleChip(props) {

    const lifecycleStatus = props.lifecycle.status

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

    return (
        <div className="col-md-5">
            <Chip backgroundColor={colors.white} labelColor={colors.grey}>
                <Avatar backgroundColor={color} icon={<Restore />}/>
                {capitalize(lifecycleStatus)}
            </Chip>
        </div>
    )
}