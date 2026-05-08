import React from "react";
import {CollapsibleList, RevisionsView} from "../common/";
import {icons} from "../../commonStyles/commonInlineStyles";

export function History(props) {
    const {id, currentRevision, component} = props
    return (<CollapsibleList primaryText="History"
                     initiallyOpen={true}
                     leftAvatar={icons.historyAvatar}
                     nestedItems={<RevisionsView key={id} id={id} currentRevision={currentRevision} component={component}/>}/>)

}