import React from "react";
import { CardInfo } from "../common/";
import FlatButton from "material-ui/FlatButton";
import { browserHistory, Link } from "react-router";
import { Card, CardActions, CardText, CardHeader } from "material-ui/Card";
import { icons, styles } from "../../commonStyles/commonInlineStyles";


export default function ApplicationCard(props) {
    const application = props.application
    const avatar = icons.application
    const additionalCardInfo = (<CardInfo lastUpdated={application.updated} lifecycle={application.lifecycle}/>)

    return (
        <div style={styles.cardPadding}>
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
                        onTouchTap={() => browserHistory.push('/applications/' + application.name)}
                        label="manage"
                        style={styles.flatButton}/>
                </CardActions>
            </Card>
        </div>
    )
}