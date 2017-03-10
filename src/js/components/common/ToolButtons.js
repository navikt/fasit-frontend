import React, {Component, PropTypes} from 'react'
import Mousetrap from 'mousetrap'
export default class ToolButtons extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {authorized, onEditClick, onDeleteClick, onCopyClick} = this.props
        if (authorized){
            Mousetrap.bind('c', onCopyClick)
            Mousetrap.bind('d', onDeleteClick)
            Mousetrap.bind('e', onEditClick)
        }
    }
    componentWillReceiveProps(nextProps) {
        const {authorized, onEditClick, onDeleteClick, onCopyClick} = this.props
        if (nextProps.authorized){
            Mousetrap.bind('c', onCopyClick)
            Mousetrap.bind('d', onDeleteClick)
            Mousetrap.bind('e', onEditClick)
        } else if (!nextProps.authorized) {
            Mousetrap.unbind(['c', 'e', 'd'])
        }
    }
    componentWillUnmount(){
        Mousetrap.unbind(['c', 'e', 'd'])
    }

    render() {
        const {authorized, onEditClick, onDeleteClick, onCopyClick} = this.props
        return (
            <div className="col-xs-12" style={{paddingTop: 10 + "px", paddingBottom: 10 + "px"}}>
                <div>
                    <div className={authorized ? "btn btn-sm btn-grey" : "btn btn-sm btn-grey disabled"}
                         style={{textAlign: "left"}}
                         onClick={authorized ? onCopyClick : () => {
                             }}>
                        <i className="fa fa-fw fa-files-o"/>&nbsp;<u>C</u>opy
                    </div>
                    <div className={authorized ? "btn btn-sm btn-grey" : "btn btn-sm btn-grey disabled"}
                         style={{textAlign: "left"}}
                         onClick={authorized ? onEditClick : () => {
                             }}>
                        <i className="fa fa-fw fa-pencil-square-o"/>&nbsp;<u>E</u>dit
                    </div>
                    <div className={authorized ? "btn btn-sm btn-grey" : "btn btn-sm btn-grey disabled"}
                         style={{textAlign: "left"}}
                         onClick={authorized ? onDeleteClick : () => {
                             }}>
                        <i className="fa fa-fw fa-trash"/>&nbsp;<u>D</u>elete
                    </div>
                </div>
            </div>
        )
    }
}