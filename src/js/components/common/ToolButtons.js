import React, { useEffect, useRef } from "react"
import Mousetrap from "mousetrap"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { styles, icons } from "../../commonStyles/commonInlineStyles"

export default function ToolButtons({ disabled, onEditClick, onDeleteClick, onCopyClick, hideCopyButton, hideDeleteButton, editMode }) {
  const prevEditModeRef = useRef(editMode)

  useEffect(() => {
    if (!disabled) {
      Mousetrap.bind("c", onCopyClick)
      Mousetrap.bind("d", onDeleteClick)
      Mousetrap.bind("e", onEditClick)
      if (editMode && editMode != prevEditModeRef.current) {
        Mousetrap.bind("esc", onEditClick)
      }
    } else {
      Mousetrap.unbind(["c", "e", "d", "esc"])
    }
    if (!editMode) {
      Mousetrap.unbind("esc", onEditClick)
    }
    prevEditModeRef.current = editMode

    return () => {
      Mousetrap.unbind(["c", "e", "d", "esc"])
    }
  })

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
