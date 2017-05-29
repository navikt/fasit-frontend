import React, {Component, PropTypes} from 'react'
import Mousetrap from 'mousetrap'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Copy from 'material-ui/svg-icons/content/content-copy'



export default class ToolButtons extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {authorized, onEditClick, onDeleteClick, onCopyClick} = this.props
        if (authorized) {
            Mousetrap.bind('c', onCopyClick)
            Mousetrap.bind('d', onDeleteClick)
            Mousetrap.bind('e', onEditClick)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {onEditClick, onDeleteClick, onCopyClick, editMode} = this.props
            if (nextProps.authorized){
                Mousetrap.bind('c', onCopyClick)
                Mousetrap.bind('d', onDeleteClick)
                Mousetrap.bind('e', onEditClick)
            if (nextProps.editMode && nextProps.editMode != editMode) {
                Mousetrap.bind('esc', onEditClick)
            }
        } else if (!nextProps.authorized) {
            Mousetrap.unbind(['c', 'e', 'd', 'esc'])
        } else if (!nextProps.editMode){
            Mousetrap.unbind('esc', onEditClick)
        }
    }

    componentWillUnmount() {
        Mousetrap.unbind(['c', 'e', 'd', 'esc'])
    }



    render() {
        const {authorized, onEditClick, onDeleteClick, onCopyClick} = this.props
        const labelStyle = {margin:'4px'}
        return (
            <div className="col-xs-12" style={{paddingTop: '10px', paddingBottom: '50px'}}>
                <FlatButton
                    primary={true}
                    disabled={!authorized}
                    labelPosition={'before'}
                    disableTouchRipple={true}
                    onTouchTap={onCopyClick}
                    icon={<Copy/>}
                    >
                    <strong style={labelStyle}><u>C</u>OPY</strong>
                </FlatButton>
                <FlatButton primary={true}
                            disabled={!authorized}
                            labelPosition={'before'}
                            disableTouchRipple={true}
                            onTouchTap={onEditClick}
                            icon={<Edit/>}>
                    <strong style={labelStyle}><u>E</u>DIT</strong>
                </FlatButton>
                <FlatButton secondary={true}
                            disabled={!authorized}
                            disableTouchRipple={true}
                            onTouchTap={onDeleteClick}
                            labelPosition={'before'}
                            icon={<Delete/>}
                            >
                    <strong style={labelStyle}><u>D</u>ELETE</strong>
                </FlatButton>
            </div>
        )
    }
}