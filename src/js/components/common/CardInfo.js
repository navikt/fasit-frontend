import React, { Component, PropTypes } from "react";
import Restore from "material-ui/svg-icons/action/restore";
import { colors } from "../../commonStyles/commonInlineStyles";
import Chip from "material-ui/Chip";
import { capitalize } from "../../utils/";
import Avatar from "material-ui/Avatar";
import moment from "moment";

export function CardInfo(props) {
    const { lastUpdated, lifecycle } = props
    return (
        <div className="pull-right col-md-4" style={{ position: "absolute", top: "10px", right: "10px" }}>
            <div className="col-md-3 text-muted pull-right" style={{ paddingTop: "6px" }}>
                {renderLastUpdated(lastUpdated)}
            </div>
            <LifecycleChip lifecycle={lifecycle} />
        </div>
    )
}

function renderLastUpdated(lastUpdated) {
    if (lastUpdated) {
        moment.locale("en")
        const momentTime = moment(lastUpdated)
        return (
            <div>
                <div>
                    <i className="fa fa-calendar fa-fw" />{momentTime.format('DD MMM YYYY')}
                </div>
                <div>
                    <i className="fa fa-clock-o fa-fw" />{momentTime.format('HH:mm:ss')}
                </div>
            </div>
        )
    }
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
            break
        case 'stopped':
            color = colors.red
            break;
        case 'rescued':
            color = colors.green
            break;
    }

    return (
        <div className="col-md-4 pull-right" style={{ paddingTop: "6px" }}>
            <Chip backgroundColor={colors.white} labelColor={colors.grey}>
                <Avatar backgroundColor={color} icon={<Restore />} />
                {capitalize(lifecycleStatus)}
            </Chip>
        </div>
    )
}