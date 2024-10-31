import React from "react"
import {
  green400,
  orange300,
  red400,
  deepPurple400
} from "material-ui/styles/colors"
import GroupWork from "material-ui/svg-icons/action/group-work"
import Description from "material-ui/svg-icons/action/description"
import Timeline from "material-ui/svg-icons/action/timeline"
import Link from "material-ui/svg-icons/content/link"
import Error from "material-ui/svg-icons/alert/error"
import Lock from "material-ui/svg-icons/action/lock"
import Security from "material-ui/svg-icons/hardware/security"
import Build from "material-ui/svg-icons/action/build"
import Avatar from "material-ui/Avatar"
import Delete from "material-ui/svg-icons/action/delete"
import Edit from "material-ui/svg-icons/editor/mode-edit"
import Copy from "material-ui/svg-icons/content/content-copy"
import Cancel from "material-ui/svg-icons/navigation/cancel"
import Eye from "material-ui/svg-icons/image/remove-red-eye"
import FileUpload from "material-ui/svg-icons/file/file-upload"
import File from "material-ui/svg-icons/editor/insert-drive-file"
import RightArrow from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import Warning from "material-ui/svg-icons/alert/warning"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
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
      <GroupWork style={styles.white} />
    </Avatar>
  ),
  appconfig: (
    <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}>
      <Description style={styles.white} />
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
  cancel: <Cancel hoverColor={colors.pink} />,
  edit: <Edit hoverColor={colors.pink} />,
  eye: <Eye />,
  fileUpload: <FileUpload />,
  fileAvatar: (
    <Avatar
      color={colors.white}
      backgroundColor={colors.toolbarBackground}
      icon={<File />}
    />
  ),
  delete: <Delete hoverColor={colors.pink} />,
  copy: <Copy hoverColor={colors.pink} />,
  warning: <Warning color={colors.orange} />,
  resource: <FontAwesomeIcon icon="cogs" />,
  historyAvatar: <Avatar icon={<Timeline />} />,
  securityAvatar: <Avatar icon={<Security />} />,
  rightArrow: <RightArrow />,
  linkAvatar: (
    <Avatar icon={<Link />} backgroundColor={colors.avatarBackgroundColor} />
  ),
  hardwareAvatar: <Avatar icon={<Build />} />,
  errorAvatar: <Avatar icon={<Error />} backgroundColor={colors.red} />,
  lockAvatar: (
    <Avatar
      icon={<Lock />}
      color={colors.white}
      backgroundColor={colors.toolbarBackground}
    />
  )
}
