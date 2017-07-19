import React, {Component, PropTypes} from "react";
import moment from "moment";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {styles} from "../../commonStyles/commonInlineStyles";


export function CurrentRevision(props) {
    moment.locale("en")
    const {revisions, revisionId} = props
    const rev = revisions.data.filter(r => r.revision == revisionId)


    if (rev.length > 0) {
        const currentRevision = rev[0]
        return (
            <Card style={styles.cardPadding}>
                <CardHeader
                    title={`Revision ${currentRevision.revision} - ${currentRevision.revisiontype === 'add' ? 'Created' : 'Modified'}` }
                    titleStyle={styles.bold}
                    subtitle={`${moment(currentRevision.timestamp).format('DD.MM YYYY, H:mm:ss')} by ${currentRevision.author} (${currentRevision.authorid})`}/>
                {currentRevision.message && <CardText>{currentRevision.message}</CardText>}
            </Card>)
    }
    else{
        return null
    }
}