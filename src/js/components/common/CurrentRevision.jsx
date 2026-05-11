import React, {Component} from "react";
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
                    slotProps={{
                        title: {sx: {...styles.bold, fontSize: "1rem"}},
                        subheader: {sx: {fontSize: "0.85rem"}}
                    }}
                    subheader={`${dayjs(currentRevision.timestamp).format('DD.MM YYYY, H:mm:ss')} by ${currentRevision.author} (${currentRevision.authorid})`}/>
                {currentRevision.message && <CardContent>{currentRevision.message}</CardContent>}
            </Card>)
}