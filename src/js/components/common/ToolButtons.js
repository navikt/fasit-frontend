import React, {Component, PropTypes} from 'react'

export default function ToolButtons(props) {
    const {authorized, onEditClick, onDeleteClick, onCopyClick} = props
    return (
        <div className="col-xs-12" style={{paddingTop: 10 + "px", paddingBottom: 10 + "px"}}>
            <div>
                <div className={authorized ? "btn btn-sm btn-grey" : "btn btn-sm btn-grey disabled"}
                     style={{textAlign: "left"}}
                     onClick={authorized ? onCopyClick : () => {
                         }}>
                    <i className="fa fa-fw fa-files-o"/>&nbsp;Copy
                </div>
                <div className={authorized ? "btn btn-sm btn-grey" : "btn btn-sm btn-grey disabled"}
                     style={{textAlign: "left"}}
                     onClick={authorized ? onEditClick : () => {
                         }}>
                    <i className="fa fa-fw fa-pencil-square-o"/>&nbsp;Edit
                </div>
                <div className={authorized ? "btn btn-sm btn-grey" : "btn btn-sm btn-grey disabled"}
                     style={{textAlign: "left"}}
                     onClick={authorized ? onDeleteClick : () => {
                         }}>
                    <i className="fa fa-fw fa-trash"/>&nbsp;Delete
                </div>
            </div>
        </div>
    )
}