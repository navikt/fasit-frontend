import React, {Component, PropTypes} from 'react'
import {red400, green400, orange300} from 'material-ui/styles/colors'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Description from 'material-ui/svg-icons/action/description'

export const colors = {
    white: '#ffffff',
    avatarBackgroundColor: "#268bd2",
    red: red400,
    orange:  orange300,
    green: green400
}

export const styles = {
    bold: {fontWeight: 'bold'},
    white: {color: colors.white.color},
    red: {color: colors.red},
    orange: {color: colors.orange},
    green: {color: colors.green},
    marginTop25: {marginTop: '25px'},
    paddingTop5: {paddingTop: '5px'},
    valign: {
        display: 'inline-flex',
        verticalAlign: 'middle'},
    tableCellPadding: {
        verticalAlign: 'top',
        paddingTop: '10px',
        paddingBottom: '5px'
    }
}

export const icons = {
    environment: <i className="fa fa-sitemap"/>,
    application: <i className="fa fa-home fa-cube"/>,
    instance: <i className="fa fa-home fa-cubes"/>,
    node: <i className="fa fa-home fa-server"/>,
    cluster: <GroupWork style={styles.white}/>,
    appconfig: <Description style={styles.white}/>,
    resource: <i className="fa fa-cogs"/>

}
