import React, { Component } from "react"
import Mousetrap from "mousetrap"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
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

  componentDidUpdate(prevProps) {
    const { onEditClick, onDeleteClick, onCopyClick, editMode, disabled } = this.props
    if (!disabled) {
      Mousetrap.bind("c", onCopyClick)
      Mousetrap.bind("d", onDeleteClick)
      Mousetrap.bind("e", onEditClick)
      if (editMode && editMode != prevProps.editMode) {
        Mousetrap.bind("esc", onEditClick)
      }
    } else if (disabled) {
      Mousetrap.unbind(["c", "e", "d", "esc"])
    } else if (!editMode) {
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
          <Tooltip title={
            disabled ? (
              disabledString
            ) : (
              <div>
                <u>C</u>opy
              </div>
            )
          } placement="bottom">
            <span>
              <IconButton
                disabled={disabled}
                disableRipple={true}
                onClick={onCopyClick}
                style={styles.button}
              >
                {icons.copy}
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Tooltip title={
          disabled ? (
            disabledString
          ) : (
            <div>
              <u>E</u>dit
            </div>
          )
        } placement="bottom">
          <span>
            <IconButton
              disabled={disabled}
              disableRipple={true}
              onClick={onEditClick}
              style={styles.button}
            >
              {icons.edit}
            </IconButton>
          </span>
        </Tooltip>
        {!hideDeleteButton && (
          <Tooltip title={
            disabled ? (
              disabledString
            ) : (
              <div>
                <u>D</u>elete
              </div>
            )
          } placement="bottom">
            <span>
              <IconButton
                disabled={disabled}
                disableRipple={true}
                onClick={onDeleteClick}
                style={styles.button}
              >
                {icons.delete}
              </IconButton>
            </span>
          </Tooltip>
        )}
      </div>
    )
  }
}
