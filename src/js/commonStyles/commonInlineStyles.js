import React from "react";
import {red400, green400, orange300} from "material-ui/styles/colors";
import GroupWork from "material-ui/svg-icons/action/group-work";
import Description from "material-ui/svg-icons/action/description";
import Timeline from "material-ui/svg-icons/action/timeline";
import Link from "material-ui/svg-icons/content/link";
import NewReleases from "material-ui/svg-icons/av/new-releases";
import Error from "material-ui/svg-icons/alert/error"
import Security from "material-ui/svg-icons/hardware/security";
import Build from "material-ui/svg-icons/action/build";
import Avatar from "material-ui/Avatar";
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Copy from 'material-ui/svg-icons/content/content-copy'

export const colors = {
    white: '#ffffff',
    avatarBackgroundColor: "#268bd2",
    red: red400,
    orange: orange300,
    green: green400,
    pink: '#d33682',
    grey:  '#aaa',
    toolbarBackground: '#515d66'
}

export const styles = {
    bold: {fontWeight: 'bold'},
    white: {color: colors.white.color},
    red: {color: colors.red},
    button: {color: colors.toolbarBackground},
    toolbarBackground: {backgroundColor: colors.toolbarBackground},
    orange: {color: colors.orange},
    green: {color: colors.green},
    marginTop25: {marginTop: '25px'},
    paddingTop5: {paddingTop: '5px'},
    valign: {
        display: 'inline-flex',
        verticalAlign: 'middle'
    },
    tableCellPadding: {
        verticalAlign: 'top',
        paddingTop: '10px',
        paddingBottom: '5px'
    }
}

export const icons = {
    environment: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-sitemap"/></Avatar>,
    application: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-home fa-cube"/></Avatar>,
    instance: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-home fa-cubes"/></Avatar>,
    node: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><i className="fa fa-home fa-server"/></Avatar>,
    cluster: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><GroupWork style={styles.white}/></Avatar>,
    appconfig: <Avatar backgroundColor={colors.avatarBackgroundColor} color={colors.white}><Description style={styles.white}/></Avatar>,
    edit: <Edit hoverColor={colors.pink}/>,
    delete: <Delete hoverColor={colors.pink}/>,
    copy: <Copy hoverColor={colors.pink}/>,
    resource: <i className="fa fa-cogs"/>,
    historyAvatar: <Avatar  icon={<Timeline/>}/>,
    securityAvatar: <Avatar icon={<Security/>}/>,
    linkAvatar: <Avatar icon={<Link/>}/>,
    sensuStatusAvatar: <Avatar icon={<NewReleases/>}/>,
    hardwareAvatar: <Avatar icon={<Build/>}/>,
    grafanaAvatar: <Avatar icon={<i className="fa fa-area-chart"/>}/>,
    errorAvatar: <Avatar icon={<Error/>} backgroundColor={colors.red} />
}

