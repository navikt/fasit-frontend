import React, { Component } from "react"
import Mousetrap from "mousetrap"
import IconButton from "material-ui/IconButton"
import { styles, icons } from "../../commonStyles/commonInlineStyles"

export default class ToolButtons extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { disabled, onEditClick, onDeleteClick, onCopyClick } = this.props
    if (!disabled) {
      Mousetrap.bind("c", onCopyClick)
      Mousetrap.bind("d", onDeleteClick)
      Mousetrap.bind("e", onEditClick)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onEditClick, onDeleteClick, onCopyClick, editMode } = this.props
    if (!nextProps.disabled) {
      Mousetrap.bind("c", onCopyClick)
      Mousetrap.bind("d", onDeleteClick)
      Mousetrap.bind("e", onEditClick)
      if (nextProps.editMode && nextProps.editMode != editMode) {
        Mousetrap.bind("esc", onEditClick)
      }
    } else if (nextProps.disabled) {
      Mousetrap.unbind(["c", "e", "d", "esc"])
    } else if (!nextProps.editMode) {
      Mousetrap.unbind("esc", onEditClick)
    }
  }

  componentWillUnmount() {
    Mousetrap.unbind(["c", "e", "d", "esc"])
  }

  render() {
    const {
      disabled,
      onEditClick,
      onDeleteClick,
      onCopyClick,
      hideCopyButton,
      hideDeleteButton
    } = this.props
    const disabledString = "Log in or make sure you have access"
    return (
      <div>
        {!hideCopyButton && (
          <IconButton
            disabled={disabled}
            touch={true}
            disableTouchRipple={true}
            onTouchTap={onCopyClick}
            iconStyle={styles.button}
            tooltip={
              disabled ? (
                disabledString
              ) : (
                <div>
                  <u>C</u>opy
                </div>
              )
            }
            tooltipPosition="bottom-center"
          >
            {icons.copy}
          </IconButton>
        )}
        <IconButton
          disabled={disabled}
          touch={true}
          disableTouchRipple={true}
          onTouchTap={onEditClick}
          iconStyle={styles.button}
          tooltip={
            disabled ? (
              disabledString
            ) : (
              <div>
                <u>E</u>dit
              </div>
            )
          }
          tooltipPosition="bottom-center"
        >
          {icons.edit}
        </IconButton>
        {!hideDeleteButton && (
          <IconButton
            disabled={disabled}
            touch={true}
            disableTouchRipple={true}
            onTouchTap={onDeleteClick}
            iconStyle={styles.button}
            tooltip={
              disabled ? (
                disabledString
              ) : (
                <div>
                  <u>D</u>elete
                </div>
              )
            }
            tooltipPosition="bottom-center"
          >
            {icons.delete}
          </IconButton>
        )}
      </div>
    )
  }
}
