import React, {Component, PropTypes} from 'react'
import moment from 'moment'

export function CurrentRevision(props) {
    moment.locale("en")
    const {revisions, revisionId} = props
    const rev = revisions.data.filter(r => r.revision == revisionId)

    if (rev.length > 0) {
        const currentRevision = rev[0]

        return (
            <div className="col-md-12" style={{paddingTop: 10, paddingBottom: 10}}>
                <div className="well well-sm col-md-5 revision-well">
                    <h4>Revision #{currentRevision.revision} </h4>
                    {currentRevision.revisiontype === 'add' ? 'Created' : 'Modified'}&nbsp;
                    {`${moment(currentRevision.timestamp).format('D.MM YYYY, H:mm:ss')} by ${currentRevision.author} (${currentRevision.authorid})`}
                    <br/>
                    {currentRevision.message ? `Comment: ${currentRevision.message}` : '' }
                </div>
            </div>
        )
    }
}