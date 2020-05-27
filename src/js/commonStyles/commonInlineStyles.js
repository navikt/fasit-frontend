import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"
import deepPurple from "@material-ui/core/colors/deepPurple"

import GroupWorkIcon from "@material-ui/icons/GroupWork"
import DescriptionIcon from "@material-ui/icons/Description"
import TimelineIcon from "@material-ui/icons/Timeline"
import LinkIcon from "@material-ui/icons/Link"
//import NewReleases from "material-ui/svg-icons/av/new-releases"
import ErrorIcon from "@material-ui/icons/Error"
import LockIcon from "@material-ui/icons/Lock"
import SecurityIcon from "@material-ui/icons/Security"
import BuildIcon from "@material-ui/icons/Build"
import Avatar from "@material-ui/core/Avatar"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import CancelIcon from "@material-ui/icons/Cancel"
import VisibilityIcon from "@material-ui/icons/Visibility"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import WarningIcon from "@material-ui/icons/Warning"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const green400 = green[400]
const orange300 = orange[300]
const red400 = red[400]
const deepPurple400 = deepPurple[400]

export const colors = {
  white: "#ffffff",
  avatarBackgroundColor: "#268bd2",
  red: red400,
  orange: orange300,
  green: green400,
  purple: deepPurple400,
  pink: "#d33682",
  lightpink: "#F84099",
  grey: "#aaa",
  darkgrey: "#888",
  lightgrey: "#757575",
  toolbarBackground: "#515d66",
  black: "rgba(0, 0, 0, 0.87)",
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
  tabItem: { backgroundColor: colors.toolbarBackground },
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
    marginBottom: "10px",
  },
  valign: {
    display: "inline-flex",
    verticalAlign: "middle",
  },
  tableCellPadding: {
    verticalAlign: "top",
    paddingTop: "10px",
    paddingBottom: "5px",
  },
  textField: {
    underlineStyle: {
      borderColor: colors.avatarBackgroundColor,
    },
    floatingLabelStyle: {
      color: colors.grey,
    },
    floatingLabelFocusStyle: {
      color: colors.toolbarBackground,
    },
  },
}

export const icons = {
  environment: (
    <Avatar /*className={} backgroundColor={colors.avatarBackgroundColor} color={colors.white}*/>
      <FontAwesomeIcon icon="sitemap" />
    </Avatar>
  ),
  application: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <FontAwesomeIcon icon="cube" />
    </Avatar>
  ),
  resourceAvator: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <FontAwesomeIcon icon="cogs" />
    </Avatar>
  ),
  instance: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <FontAwesomeIcon icon="cubes" />
    </Avatar>
  ),
  node: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <FontAwesomeIcon icon="server" />
    </Avatar>
  ),
  cluster: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <GroupWorkIcon style={styles.white} />
    </Avatar>
  ),
  appconfig: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <DescriptionIcon style={styles.white} />
    </Avatar>
  ),
  new: (
    <Avatar backgroundColor={colors.backgroundColor} color={colors.white}>
      <FontAwesomeIcon icon="plus" />
    </Avatar>
  ),
  deploymentManagerAvatar: (
    <Avatar backgroundColor={colors.purple} color={colors.white}>
      <FontAwesomeIcon icon="tachometer-alt" />
    </Avatar>
  ),
  cancel: <CancelIcon hoverColor={colors.pink} />,
  edit: <EditIcon hoverColor={colors.pink} />,
  eye: <VisibilityIcon />,
  fileUpload: <AttachFileIcon />,
  fileAvatar: (
    <Avatar
      color={colors.white}
      backgroundColor={colors.toolbarBackground}
      icon={<InsertDriveFileIcon />}
    />
  ),
  delete: <DeleteIcon hoverColor={colors.pink} />,
  copy: <FileCopyIcon hoverColor={colors.pink} />,
  warning: <WarningIcon color={colors.orange} />,
  resource: <FontAwesomeIcon icon="cogs" />,
  historyAvatar: <Avatar icon={<TimelineIcon />} />,
  securityAvatar: <Avatar icon={<SecurityIcon />} />,
  rightArrow: <DoubleArrowIcon />,
  linkAvatar: <Avatar icon={<LinkIcon />} backgroundColor={colors.avatarBackgroundColor} />,
  hardwareAvatar: <Avatar icon={<BuildIcon />} />,
  errorAvatar: <Avatar icon={<ErrorIcon />} backgroundColor={colors.red} />,
  lockAvatar: (
    <Avatar icon={<LockIcon />} color={colors.white} backgroundColor={colors.toolbarBackground} />
  ),
}
