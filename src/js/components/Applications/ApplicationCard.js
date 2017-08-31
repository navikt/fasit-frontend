import React from "react";
import {LifecycleStatus} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory, Link} from "react-router";
import {Card, CardActions, CardText, CardHeader} from "material-ui/Card";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import moment from "moment";


export default function ApplicationCard(props) {
    moment.locale("en")
    const application =  props.application
    const avatar = icons.application
    const additionalCardInfo = (<div className="pull-right">
        <div className="text-muted">Changed {moment(application.updated).fromNow()}</div>
        <br/>
        <LifecycleStatus status={application.lifecycle.status}/>
    </div>)

    return (
        <div style={styles.cardPadding} >
            <Card>
                <CardHeader
                    title={<Link to={`/applications/${application.name}`}>{application.name}</Link>}
                    actAsExpander={true}
                    avatar={avatar}
                    children={additionalCardInfo}
                />
                <CardText expandable={true}>
                    <div>
                    {`Group id ${application.groupid}`}<br/>
                    {`Artifact id ${application.artifactid}`}<br/>
                    {`Port offset ${application.portoffset}`}
        </div>
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() =>  browserHistory.push('/applications/' + application.name)}
                        label="manage"
                        style={styles.flatButton}/>
                </CardActions>
            </Card>
        </div>
    )
}