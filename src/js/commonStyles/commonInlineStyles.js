import React from "react";
import {green400, orange300, red400} from "material-ui/styles/colors";
import GroupWork from "material-ui/svg-icons/action/group-work";
import Description from "material-ui/svg-icons/action/description";
import Timeline from "material-ui/svg-icons/action/timeline";
import Link from "material-ui/svg-icons/content/link";
import NewReleases from "material-ui/svg-icons/av/new-releases";
import Error from "material-ui/svg-icons/alert/error";
import Lock from "material-ui/svg-icons/action/lock";
import Security from "material-ui/svg-icons/hardware/security";
import Build from "material-ui/svg-icons/action/build";
import Avatar from "material-ui/Avatar";
import Delete from "material-ui/svg-icons/action/delete";
import Edit from "material-ui/svg-icons/editor/mode-edit";
import Copy from "material-ui/svg-icons/content/content-copy";
import Cancel from "material-ui/svg-icons/navigation/cancel";
import Eye from "material-ui/svg-icons/image/remove-red-eye";

export const colors = {
    white: '#ffffff',
    avatarBackgroundColor: "#268bd2",
    red: red400,
    orange: orange300,
    green: green400,
    pink: '#d33682',
    lightpink: '#F84099',
    grey:  '#aaa',
    lightgrey: '#757575',
    toolbarBackground: '#515d66',
    black: 'rgba(0, 0, 0, 0.87)'
}

export const styles = {
    bold: {fontWeight: 'bold'},
    white: {color: colors.white},
    red: {color: colors.red},
    button: {color: colors.toolbarBackground},
    tabItem: {backgroundColor: colors.toolbarBackground},
    inkBar: {backgroundColor: colors.lightpink},
    flatButton: {color: colors.avatarBackgroundColor},
    raisedButton: {backgroundColor: colors.avatarBackgroundColor},
    orange: {color: colors.orange},
    green: {color: colors.green},
    marginTop25: {marginTop: '25px'},
    paddingTop5: {paddingTop: '5px'},
    paddingBottom0: {paddingBottom: '0px'},
    overflowEllipsis: {textOverflow: 'ellipsis', overflow: 'hidden'},
    cardPadding: {
        marginTop: '10px',
        marginBottom: '10px'},
    valign: {
        display: 'inline-flex',
        verticalAlign: 'middle'
    },
    tableCellPadding: {
        verticalAlign: 'top',
        paddingTop: '10px',
        paddingBottom: '5px'
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
    }
}

export const icons = {
    environment: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-sitemap"/></Avatar>,
    application: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-home fa-cube"/></Avatar>,
    instance: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-home fa-cubes"/></Avatar>,
    node: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-home fa-server"/></Avatar>,
    cluster: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><GroupWork style={styles.white}/></Avatar>,
    appconfig: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><Description style={styles.white}/></Avatar>,
    cancel: <Cancel hoverColor={colors.pink}/>,
    edit: <Edit hoverColor={colors.pink}/>,
    eye: <Eye/>,
    delete: <Delete hoverColor={colors.pink}/>,
    copy: <Copy hoverColor={colors.pink}/>,
    resource: <i className="fa fa-cogs"/>,
    historyAvatar: <Avatar  icon={<Timeline/>}/>,
    securityAvatar: <Avatar icon={<Security/>}/>,
    linkAvatar: <Avatar icon={<Link/>}/>,
    sensuStatusAvatar: <Avatar icon={<NewReleases/>}/>,
    hardwareAvatar: <Avatar icon={<Build/>}/>,
    grafanaAvatar: <Avatar icon={<i className="fa fa-area-chart"/>}/>,
    errorAvatar: <Avatar icon={<Error/>} backgroundColor={colors.red} />,
    lockAvatar: <Avatar icon={<Lock/>} color={colors.white}  backgroundColor={colors.toolbarBackground}/>
}

