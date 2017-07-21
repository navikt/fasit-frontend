import React from 'react'
import {LifecycleStatus} from '../common/'
import FlatButton from 'material-ui/FlatButton'
import {browserHistory} from "react-router";
import {Card, CardHeader, CardActions} from 'material-ui/Card'
import {styles, icons}  from '../../commonStyles/commonInlineStyles'
import moment from 'moment'

export function ApplicationsList(props) {
    const applications = props.applications
    return (
        <div>{
            applications.map((item, index)=> {
                return <ApplicationCard application={item} key={index}/>
            })
        }   </div>
    )
}

function navigateToApplication(name) {
    browserHistory.push('/applications/' + name)
}

function ApplicationCard(props) {
    moment.locale("en")
    const application =  props.application
    const avatar = icons.application
    const additionalCardInfo = (<div className="pull-right">
        <div className="text-muted">Changed {moment(application.updated).fromNow()}</div>
        <br/>
        <LifecycleStatus status={application.lifecyclestatus}/>
    </div>)

    return (
        <div style={styles.cardPadding} >
            <Card>
                <CardHeader title={application.name}
                            titleStyle={styles.bold}
                            subtitle={<div>{`Group id ${application.groupid}`}<br/>{`Artifact id ${application.artifactid}`}<br/>{`Port offset ${application.portoffset}`}</div>}
                            avatar={avatar}
                            children={additionalCardInfo}
                            onClick={() => navigateToApplication(application.name)}
                />
                <CardActions>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => navigateToApplication(application.name)}
                        label="manage"
                        style={styles.flatButton}/>
                </CardActions>
            </Card>
        </div>
    )
}