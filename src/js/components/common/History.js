import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import moment from 'moment'
import {connect} from 'react-redux'
import {fetchRevisions, fetchRevision} from '../../actionCreators/common'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {CollapsibleList, RevisionsView, CurrentRevision, } from "../common/"
import {icons} from '../../commonStyles/commonInlineStyles'

export function History(props) {
    const {id, revision, component} = props
    return (<CollapsibleList primaryText="History"
                     initiallyOpen={true}
                     leftAvatar={icons.historyAvatar}
                     nestedItems={<RevisionsView key={id} id={id} currentRevision={revision} component={component}/>}/>)

}