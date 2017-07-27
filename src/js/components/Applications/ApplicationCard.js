import React from "react";
import {LifecycleStatus} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory} from "react-router";
import {Card, CardActions, CardHeader} from "material-ui/Card";
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
                <CardHeader title={application.name}
                            titleStyle={styles.bold}
                            subtitle={(
                                <div>
                                    {`Group id ${application.groupid}`}<br/>
                                    {`Artifact id ${application.artifactid}`}<br/>
                                    {`Port offset ${application.portoffset}`}
                                </div>)}
                            avatar={avatar}
                            children={additionalCardInfo}
                />
                <CardActions>
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