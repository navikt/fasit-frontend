import React, { Component } from "react"
import PropTypes from 'prop-types'
import Restore from "@mui/icons-material/Restore"
import { colors } from "../../commonStyles/commonInlineStyles"
import Chip from "@mui/material/Chip"
import { capitalize } from "../../utils/"
import Avatar from "@mui/material/Avatar"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function CardInfo(props) {
  const { lastUpdated, lifecycle } = props
  return (
    <div
      className="float-end"
      style={{top: "10px", marginRight: "10px", marginLeft: "10px"}}
    > 
      <div
        className="text-muted float-end"
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
    <div className="float-end" style={{ paddingTop: "6px" }}>
      <Chip
        style={{backgroundColor: colors.white, color: colors.grey}}
        avatar={<Avatar style={{backgroundColor: color}}><Restore /></Avatar>}
        label={capitalize(lifecycleStatus)}
      />
    </div>
  )
}
