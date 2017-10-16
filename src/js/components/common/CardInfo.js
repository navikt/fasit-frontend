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
        <div className="pull-right col-md-4">
            <div className="col-md-5 text-muted pull-right" style={{paddingTop: "6px"}}>
                {lastUpdated ? `Changed ${moment(lastUpdated).fromNow()}` : ''}
            </div>
            <LifecycleChip lifecycle={lifecycle}/>
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
        <div className="col-md-4 pull-right">
            <Chip backgroundColor={colors.white} labelColor={colors.grey}>
                <Avatar backgroundColor={color} icon={<Restore/>}/>
                {capitalize(lifecycleStatus)}
            </Chip>
        </div>
    )
}