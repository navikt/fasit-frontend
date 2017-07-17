import React, {Component} from 'react'
import Mousetrap from 'mousetrap'
import IconButton from 'material-ui/IconButton'
import {styles, icons} from '../../commonStyles/commonInlineStyles'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

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
        if (nextProps.authorized) {
            Mousetrap.bind('c', onCopyClick)
            Mousetrap.bind('d', onDeleteClick)
            Mousetrap.bind('e', onEditClick)
            if (nextProps.editMode && nextProps.editMode != editMode) {
                Mousetrap.bind('esc', onEditClick)
            }
        } else if (!nextProps.authorized) {
            Mousetrap.unbind(['c', 'e', 'd', 'esc'])
        } else if (!nextProps.editMode) {
            Mousetrap.unbind('esc', onEditClick)
        }
    }

    componentWillUnmount() {
        Mousetrap.unbind(['c', 'e', 'd', 'esc'])
    }


    render() {
        const {authorized, onEditClick, onDeleteClick, onCopyClick} = this.props
        const disabledString = 'Log in or make sure you have access'
        return (
            <div className="col-xs-12" style={{paddingBottom: '15px'}}>
                <Toolbar style={styles.toolbarBackground}>
                    <ToolbarGroup>
                        <IconButton
                            disabled={!authorized}
                            touch={true}
                            disableTouchRipple={true}
                            onTouchTap={onCopyClick}
                            iconStyle={styles.button}
                            tooltip= {authorized ?  <div><u>C</u>opy</div>  : disabledString}
                            tooltipPosition='top-center'
                        >
                            {icons.copy}
                        </IconButton>
                        <IconButton
                            disabled={!authorized}
                            touch={true}
                            disableTouchRipple={true}
                            onTouchTap={onEditClick}
                            iconStyle={styles.button}
                            tooltip={authorized ? <div><u>E</u>dit</div> : disabledString}
                            tooltipPosition='top-center'>
                            {icons.edit}

                        </IconButton>
                        <IconButton
                            disabled={!authorized}
                            touch={true}
                            disableTouchRipple={true}
                            onTouchTap={onDeleteClick}
                            iconStyle={styles.button}
                            tooltip={authorized ?  <div><u>D</u>elete</div>  : disabledString}
                            tooltipPosition='top-center'
                        >
                            {icons.delete}

                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
}