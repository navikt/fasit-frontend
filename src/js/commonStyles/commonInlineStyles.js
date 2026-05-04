import React from "react"
import { green, orange, red, deepPurple } from "@material-ui/core/colors"
import Avatar from "@material-ui/core/Avatar"
import GroupWork from "@material-ui/icons/GroupWork"
import Description from "@material-ui/icons/Description"
import Timeline from "@material-ui/icons/Timeline"
import LinkIcon from "@material-ui/icons/Link"
import NewReleases from "@material-ui/icons/NewReleases"
import ErrorIcon from "@material-ui/icons/Error"
import Lock from "@material-ui/icons/Lock"
import Security from "@material-ui/icons/Security"
import Build from "@material-ui/icons/Build"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import FileCopy from "@material-ui/icons/FileCopy"
import Cancel from "@material-ui/icons/Cancel"
import RemoveRedEye from "@material-ui/icons/RemoveRedEye"
import CloudUpload from "@material-ui/icons/CloudUpload"
import InsertDriveFile from "@material-ui/icons/InsertDriveFile"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import Warning from "@material-ui/icons/Warning"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const colors = {
  white: "#ffffff",
  avatarBackgroundColor: "#268bd2",
  red: red[400],
  orange: orange[300],
  green: green[400],
  purple: deepPurple[400],
  pink: "#d33682",
  lightpink: "#F84099",
  grey: "#aaa",
  lightgrey: "#757575",
  toolbarBackground: "#515d66",
  black: "rgba(0, 0, 0, 0.87)"
}

export function styleSet(styles) {
  const styleSet = Object.assign(...styles)
  return styleSet
}

export const styles = {
  bold: { fontWeight: "bold" },
  white: { color: colors.white },
  red: { color: colors.red },
  button: { color: colors.toolbarBackground },
  tabItem: { backgroundColor: colors.toolbarBackground, color: colors.white },
  inkBar: { backgroundColor: colors.lightpink },
  flatButton: { color: colors.avatarBackgroundColor },
  raisedButton: { backgroundColor: colors.avatarBackgroundColor },
  orange: { color: colors.orange },
  green: { color: colors.green },
  tightList: { paddingTop: "0px", paddingBottom: "10px" },
  tighterList: { paddingTop: "0px", paddingBottom: "5px" },
  marginLeft5: { marginLeft: "5px" },
  marginTop25: { marginTop: "25px" },
  paddingTop5: { paddingTop: "5px" },
  paddingBottom0: { paddingBottom: "0px" },
  tableData: { textOverflow: "ellipsis", overflow: "hidden", height: "30px" },
  cardPadding: {
    marginTop: "10px",
    marginBottom: "10px"
  },
  valign: {
    display: "inline-flex",
    verticalAlign: "middle"
  },
  tableCellPadding: {
    verticalAlign: "top",
    paddingTop: "10px",
    paddingBottom: "5px"
  },
  textField: {
    underlineStyle: {
      borderColor: colors.avatarBackgroundColor
    },
    floatingLabelStyle: {
      color: colors.grey
    },
    floatingLabelFocusStyle: {
      color: colors.toolbarBackground
    }
  }
}

export const icons = {
  environment: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <FontAwesomeIcon icon="sitemap" />
    </Avatar>
  ),
  application: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <FontAwesomeIcon icon="cube" />
    </Avatar>
  ),
  resourceAvator: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <FontAwesomeIcon icon="cogs" />
    </Avatar>
  ),
  instance: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <FontAwesomeIcon icon="cubes" />
    </Avatar>
  ),
  node: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <FontAwesomeIcon icon="server" />
    </Avatar>
  ),
  cluster: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <GroupWork style={styles.white} />
    </Avatar>
  ),
  appconfig: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor, color: colors.white }}>
      <Description style={styles.white} />
    </Avatar>
  ),
  new: (
    <Avatar style={{ backgroundColor: colors.backgroundColor, color: colors.white }}>
      <FontAwesomeIcon icon="plus" />
    </Avatar>
  ),
  deploymentManagerAvatar: (
    <Avatar style={{ backgroundColor: colors.purple, color: colors.white }}>
      <FontAwesomeIcon icon="tachometer-alt" />
    </Avatar>
  ),
  cancel: <Cancel />,
  edit: <Edit />,
  eye: <RemoveRedEye />,
  fileUpload: <CloudUpload />,
  fileAvatar: (
    <Avatar style={{ color: colors.white, backgroundColor: colors.toolbarBackground }}>
      <InsertDriveFile />
    </Avatar>
  ),
  delete: <Delete />,
  copy: <FileCopy />,
  warning: <Warning style={{ color: colors.orange }} />,
  resource: <FontAwesomeIcon icon="cogs" />,
  historyAvatar: <Avatar><Timeline /></Avatar>,
  securityAvatar: <Avatar><Security /></Avatar>,
  rightArrow: <KeyboardArrowRight />,
  linkAvatar: (
    <Avatar style={{ backgroundColor: colors.avatarBackgroundColor }}><LinkIcon /></Avatar>
  ),
  hardwareAvatar: <Avatar><Build /></Avatar>,
  errorAvatar: <Avatar style={{ backgroundColor: colors.red }}><ErrorIcon /></Avatar>,
  lockAvatar: (
    <Avatar style={{ color: colors.white, backgroundColor: colors.toolbarBackground }}>
      <Lock />
    </Avatar>
  )
}
