import React from 'react'
import {CollapsibleList, RevisionsView } from "../common/"
import {icons} from '../../commonStyles/commonInlineStyles'

export function History(props) {
    const {id, revision, component} = props
    return (<CollapsibleList primaryText="History"
                     initiallyOpen={true}
                     leftAvatar={icons.historyAvatar}
                     nestedItems={<RevisionsView key={id} id={id} currentRevision={revision} component={component}/>}/>)

}