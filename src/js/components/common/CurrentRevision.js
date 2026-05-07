import React, {Component} from "react";
import PropTypes from 'prop-types'
import dayjs from "dayjs";
import {Card, CardHeader, CardContent} from "@mui/material";
import {styles} from "../../commonStyles/commonInlineStyles";


export function CurrentRevision(props) {
    const {revisions, revisionId} = props
    const rev = revisions.data.filter(r => r.revision == revisionId)

    if(!revisionId || rev.length === 0) {
        return null
    }

        const currentRevision = rev[0]
        return (
            <Card style={styles.cardPadding}>
                <CardHeader
                    title={`Revision ${currentRevision.revision} - ${currentRevision.revisiontype === 'add' ? 'Created' : 'Modified'}` }
                    slotProps={{title: {style: styles.bold}}}
                    subheader={`${dayjs(currentRevision.timestamp).format('DD.MM YYYY, H:mm:ss')} by ${currentRevision.author} (${currentRevision.authorid})`}/>
                {currentRevision.message && <CardContent>{currentRevision.message}</CardContent>}
            </Card>)
}