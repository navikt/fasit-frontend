import React, { Component } from "react"
import PropTypes from 'prop-types'
import Restore from "@material-ui/icons/Restore"
import { colors } from "../../commonStyles/commonInlineStyles"
import Chip from "@material-ui/core/Chip"
import { capitalize } from "../../utils/"
import Avatar from "@material-ui/core/Avatar"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function CardInfo(props) {
  const { lastUpdated, lifecycle } = props
  return (
    <div
      className="pull-right"
      style={{top: "10px", marginRight: "10px", marginLeft: "10px"}}
    > 
      <div
        className="text-muted pull-right"
        style={{ paddingTop: "6px" }}
      >
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
      <div >
        <div>
          <FontAwesomeIcon icon={["far", "calendar"]} fixedWidth />
          {momentTime.format("DD MMM YYYY")}
        </div>
        <div>
          <FontAwesomeIcon icon={["far", "clock"]} fixedWidth />
          {momentTime.format("HH:mm:ss")}
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
    case "alerted":
      color = colors.orange
      break
    case "stopped":
      color = colors.red
      break
  }

  return (
    <div className="pull-right" style={{ paddingTop: "6px" }}>
      <Chip
        style={{backgroundColor: colors.white, color: colors.grey}}
        avatar={<Avatar style={{backgroundColor: color}}><Restore /></Avatar>}
        label={capitalize(lifecycleStatus)}
      />
    </div>
  )
}
